/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 *
 * Sync GA change to RC docset
 *
 * The GA -> RC sync script helps with maintenance of long-lived release branches
 * by comparing updates since a provided cutoff in the current (GA) docset
 * against unpdates in an unreleased (RC) docset. The default cutoff date is the
 * last run date for the associated product when available and the creation date
 * of the RC release branch otherwise. The script standardizes timestamps to
 * ISO for simplicity but takes the optional override date as a local time.
 *
 * You can also use the script to sync existing docsets, but that is a seconary
 * use case.
 *
 * @param {String} product      Slug used for the root product content folder
 * @param {String} gaVersion    Folder of the current docset, typically the GA version number
 * @param {String} rcVersion    Folder of the unreleased docset, typically the non-GA version number
 * @param {String} docTag       String used to tag non-GA docsets, typically "rc" or "beta"
 * @param {String} gaBranch     Name of the GA branch, typically "main"
 * @param {String} overrideDate Optional local cutoff date and time in "YYYY-MM-DD HH:MM:SS" format
 *
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { runBashCmdAsync } from './functions/run-bash-cmd.mjs'
import { writeToFile, writeConflictList } from './functions/update-logs.mjs'
import {
	flattenArray,
	processJson,
	sameSHA,
	printHelp,
} from './functions/tools.mjs'
import { getArgs, getExclusions } from './functions/init.mjs'

// Figure out where the script lives so we can use absolute paths for things
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Define the relevant directories and data files
const outputDir = __dirname + '/' + 'output'
const helpersDir = __dirname + '/' + 'bash-helpers'
const dataDir = __dirname + '/' + 'data'
const excludeFile = `${dataDir}/exclude.json`
const logDir = `${outputDir}`
const recordDir = `${dataDir}/run-records`
const warningFile = `${dataDir}/markdown/warning.txt`
const helpFile = `${dataDir}/markdown/help.txt`

// Get the configuration flags
const flags = getArgs()

// If -help is true, print the help file and exit
if (flags['-help']) {
	printHelp(helpFile)
	process.exit()
}

// Set the remaining flags
const product = flags['-slug']
const gaVersion = flags['-ga']
const rcVersion = flags['-rc']
const docTag = flags['-tag']
const targetBranch = flags['-branch']
	? flags['-branch']
	: product + '/' + rcVersion
const gaBranch = flags['-gaBranch']
const overrideDate = flags['-date']
const rcMerged = flags['-merged']
const makePR = flags['-pr'] && !flags['-merged']
const updateFiles = flags['-update'] || flags['-pr']

// Make the script chatty so folks can track progress since the git-related
// steps may take a while
console.log('--- Syncing GA changes to RC folder under RC branch: start')

// Grab the run date so we can update the product record later
const currentDate = new Date()
const runDate = currentDate.toISOString().substring(0, 19).replace('T', ' ')

// Convert the override date to ISO
const isoOverrideDate =
	overrideDate == null
		? overrideDate
		: new Date(overrideDate).toISOString().substring(0, 19).replace('T', ' ')

// Build constants for the RC branch and the versioned folder names

// If the RC docset is merged, use the GA branch as the RC branch
const rcBranch = rcMerged ? gaBranch : targetBranch

// Ignore the doc tag if the flag value is empty
const rcTag = docTag == '' ? docTag : ' (' + docTag + ')'
const gaFolder = 'v' + gaVersion
const rcFolder = 'v' + rcVersion + rcTag

// Define the output files and bash script helpers
const gaDeltaFile = `${logDir}/ga-delta.txt`
const gaOnlyFile = `${logDir}/ga-only.txt`
const rcDeltaFile = `${logDir}/rc-delta.txt`
const safeListFile = `${logDir}/safe-list.txt`
const manualReviewFile = `${logDir}/manual-review.txt`
const productRecord = `${recordDir}/last-run-${product}.txt`
const logPrep = `${helpersDir}/log-prep.sh '${logDir}' '${recordDir}'`
const gitPrep = `${helpersDir}/git-prep.sh '${product}' '${gaBranch}' '${rcBranch}'`
const getCutoff = `${helpersDir}/get-cutoff.sh '${rcBranch}'`
const getGADelta = `${helpersDir}/get-file-delta.sh '${product}' '${gaFolder}' '<CUTOFF>'`
const getRCDelta = `${helpersDir}/get-file-delta.sh '${product}' '${rcFolder}' '<CUTOFF>'`
const getGAOnly = `${helpersDir}/only-in-ga.sh '${product}' '${gaFolder}' '${rcFolder}'`
const updateRCDocs = `${helpersDir}/update-rc-docs.sh '${product}' '${gaFolder}' '${rcFolder}' '${safeListFile}'`
const createPR = `${helpersDir}/create-pr.sh '${product}' '${rcFolder}' '${rcBranch}' '<PR_BRANCH>'`

// Initialize some variables
var bashOutput = '' // Reusable variable used to catch the output from bash helpers
var lastRunDate = '' // Last run date in the product record file
var rcCutoffDate = '' // Cutoff date for comparing file updates, either the RC branch creation or the provided override date
var gaOnly = [] // Set of docs that only exist in the GA folder
var gaDelta = [] // GA docs with a last commit date after the cutoff
var rcDelta = [] // RC docs with a last commit date after the cutoff
var noDelta, noNewFiles
const dateIndex = 0
const fileIndex = 1

/*** INITIALIZATION ***********************************************************/

// Prep: Initialize the output files
console.log('\n    Prepping output directories/files')
await runBashCmdAsync(logPrep)

// Prep: Sync the GA and RC branches and create the PR branch
const prBranch = await runBashCmdAsync(gitPrep)

// Let folks know what information the script is working with
console.log(
	'\n    Syncing git data for GA and RC branches and creating PR branch',
)
if (updateFiles && makePR) {
	console.log('      - Updating local files and creating PR')
} else if (updateFiles) {
	console.log('      - Updating local files')
} else {
	console.log('      - Data gathering only')
}

console.log('      - Product:     ' + product)
console.log('      - GA branch:   ' + gaBranch)
console.log('      - GA version:  ' + gaVersion)
console.log('      - RC branch:   ' + rcBranch)
console.log('      - RC version:  ' + rcVersion)
//console.log('      - Work branch: ' + prBranch)

// Prep: Get the exclusion list
console.log('\n    Loading exclusions for ' + product)
const excludeList = getExclusions(excludeFile, product)
if (excludeList.length > 0) {
	console.log('    Excluding:')
	excludeList.forEach((key) => {
		console.log('      - ' + key)
	})
} else {
	console.log('    No exclusions found')
}

/*** GET CUTOFF ***************************************************************/
console.log('\n    Determining cutoff date')

/*
 Check for a last run date, calculate the branch creation date and set the
 cutoff. We always calculate the creation date so folks can compare the date
 used during comparison with the age of the branch as a check that the date
 makes sense
*/

// Grab the last run date for the product, if it exists
try {
	console.log('      Reading ' + productRecord)
	lastRunDate = readFileSync(productRecord, 'utf8')
} catch (err) {
	console.log('      Error reading last run date: ' + err)
	lastRunDate = null
}

// Pull the creation date of the release branch; if the last run date is older
// than the branch date, use the branch date as the default. Otherwise, use
// the last script run date from the product record
console.log('      Fetching creation date for ' + rcBranch)
bashOutput = flattenArray(await runBashCmdAsync(getCutoff))
if (bashOutput.length == 0) {
	console.log('!!! ERROR: Could not fetch the branch creation date')
	process.exit()
}

if (isoOverrideDate != null) {
	console.log('      - Override date (local) = ' + overrideDate)
	console.log('      - Override date (ISO)   = ' + isoOverrideDate)
}
console.log('      - Branch creation date  = ' + bashOutput[0])
console.log('      - Last run date         = ' + lastRunDate)

// If the last run date is unset or before branch creation, prefer the branch
// creation date
if (lastRunDate == null || lastRunDate < bashOutput[0]) {
	lastRunDate = bashOutput[0]
}

// Let folks know which date we selected as the cutoff
rcCutoffDate = isoOverrideDate == null ? lastRunDate : isoOverrideDate
console.log('      - Using cutoff date     = ' + rcCutoffDate)

/*** GET FILE SETS: GAΔ *******************************************************/
process.stdout.write('\n    Building GAΔ     ')

// Call helpers/get-file-delta.sh with the cutoff date and GA info to build GAΔ
const gaDeltaRaw = flattenArray(
	await runBashCmdAsync(getGADelta.replace('<CUTOFF>', rcCutoffDate)),
)
gaDelta = processJson(gaDeltaRaw)
noDelta = Object.keys(gaDelta).length == 0
console.log(
	'[' +
		Object.keys(gaDelta).length.toString().padStart(2, 0) +
		'] ' +
		gaDeltaFile,
)
writeToFile(
	gaDeltaFile,
	noDelta ? 'No GA changes since ' + rcCutoffDate : gaDelta,
)

/*** GET FILE SETS: RCΔ *******************************************************/
process.stdout.write('    Building RCΔ     ')

// Call helpers/get-file-delta.sh with the cutoff date and RC info to build RCΔ
const rcDeltaRaw = flattenArray(
	await runBashCmdAsync(getRCDelta.replace('<CUTOFF>', rcCutoffDate)),
)
rcDelta = processJson(rcDeltaRaw)
noDelta = Object.keys(rcDelta).length == 0
console.log(
	'[' +
		Object.keys(rcDelta).length.toString().padStart(2, 0) +
		'] ' +
		rcDeltaFile,
)
writeToFile(
	rcDeltaFile,
	noDelta ? 'No RC changes since ' + rcCutoffDate : rcDelta,
)

/*** GET FILE SETS: GA-only ***************************************************/
process.stdout.write('    Building GA-only ')

// Call helpers/only-in-ga.sh to build GA-only
const gaOnlyRaw = flattenArray(await runBashCmdAsync(getGAOnly))
gaOnly = processJson(gaOnlyRaw)
noNewFiles = Object.keys(gaOnly).length == 0
console.log(
	'[' +
		Object.keys(gaOnly).length.toString().padStart(2, 0) +
		'] ' +
		gaOnlyFile,
)
writeToFile(
	gaOnlyFile,
	noNewFiles ? 'No new GA files since ' + rcCutoffDate : gaOnly,
)

/*** GET FILE SETS: Safe and conflict lists ***********************************/
console.log('    Comparing GAΔ and RCΔ')

/*
 * Create the set of files we can safely slam and the list of files we need to
 * manually review:
 * push to RC    = file ∈ { !RCΔ ∧ GAΔ } or { GA-only }
 * manual review = file ∈ { RCΔ ∧ GAΔ }
 */

var pushtoRC = []
var manualReview = []
var noUpdates, noConflicts, canSkip

for (const key in gaOnly) {
	if (excludeList.includes(key)) {
		// If the key is on the exclusion list, ignore it
		console.log('      - Excluding ' + key)
	} else {
		// Add the file to the safe list
		pushtoRC[key] = gaOnly[key]
	}
}

for (const key in gaDelta) {
	if (excludeList.includes(key)) {
		// If the key is on the exclusion list, ignore it
		console.log('      - Excluding ' + key)
	} else if (!Object.keys(rcDelta).includes(key)) {
		// If the key only exists in GAΔ, add it to the safe list
		pushtoRC[key] = gaDelta[key]
	} else {
		// If the key exists in GAΔ and RCΔ, check the SHA.
		canSkip = await sameSHA(gaDelta[key][fileIndex], rcDelta[key][fileIndex])

		// If the SHAs are the same, it means we already synced the changes or
		// someone synced them manually
		if (canSkip) {
			continue
		}

		// If the SHAs are different, add the file details for GA and RC to the
		// conflict list with the lates commit date of each file for manual review
		manualReview[key] =
			key +
			':\n   GA: ' +
			'[' +
			gaDelta[key][dateIndex] +
			'] ' +
			gaDelta[key][fileIndex] +
			'\n   RC: ' +
			'[' +
			rcDelta[key][dateIndex] +
			'] ' +
			rcDelta[key][fileIndex]
	}
}

noUpdates = Object.keys(pushtoRC).length == 0
noConflicts = Object.keys(manualReview).length == 0

console.log(
	'      - Files to update in RC:   [' +
		Object.keys(pushtoRC).length.toString().padStart(2, 0) +
		'] ' +
		safeListFile,
)
writeToFile(safeListFile, noUpdates ? 'No safe files found.' : pushtoRC)

console.log(
	'      - Files for manual review: [' +
		Object.keys(manualReview).length.toString().padStart(2, 0) +
		'] ' +
		manualReviewFile,
)
writeConflictList(
	manualReviewFile,
	noConflicts ? 'No conflicts found.' : manualReview,
)

// Only update things locally if the user provided the update or pr flag
if (updateFiles) {
	console.log('    Updating RC files')
	bashOutput = await runBashCmdAsync(updateRCDocs, true)

	if (Object.keys(manualReview).length > 0) {
		console.log(
			'    To make additional changes, review potential conflicts in: ' +
				manualReviewFile,
		)
	}

	// The automatic PR generation is currently buggy so the helper just exits
	// immediately for now.
	if (makePR) {
		console.log('    Creating draft PR --- !!! CURRENTLY DISABLED !!!')
		bashOutput = await runBashCmdAsync(
			createPR.replace('<PR_BRANCH>', prBranch),
		)
		bashOutput.forEach((line) => {
			console.log(line)
		})

		try {
			var warningText = readFileSync(warningFile, 'utf8')
			console.log('\n' + warningText)
		} catch (err) {
			console.error('!!! ERROR!' + err)
			console.error('    ' + err)
		}
	}

	// Update the product record with the new run date and print the reminder to
	// review changes for false positives
	writeFileSync(productRecord, runDate)
}

console.log('')
console.log('--- Syncing GA changes to RC folder under RC branch: end')

process.exit()
