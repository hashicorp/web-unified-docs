/**
 * Sync GA change to RC docset
 *
 * The GA -> RC sync script helps with maintenance of long-lived release branches
 * by comparing updates since a provided cutoff in the current (GA) docset
 * against unpdates in an unreleased (RC) docset. The default cutoff date is the
 * creation date of the RC release branch. The script standardizes timestamps to
 * ISO for simplicity but takes the optional override date as a local time.
 *
 * @param {String} product      Slug used for the root product content folder
 * @param {String} gaVersion    Folder of the current docset, typically the GA version number
 * @param {String} rcVersion    Folder of the unreleased docset, typically the non-GA version number
 * @param {String} docTag       String used to tag non-GA docsets, typically "rc" or "beta"
 * @param {String} gaBranch     Name of the GA branch, typically "main"
 * @param {String} overrideDate Optional local cutoff date and time in "YYYY-MM-DD HH:MM:SS" format
 *
 * Expected use:
 *   node sync-ga-to-rc.mjs product gaVersion rcVersion docTag gaBranch [overrideDate]
 *
 * Example:
 *   node sync-ga-to-rc.mjs vault 1.20.x 1.21.x rc main
 *
 * Example with override date:
 *   node sync-ga-to-rc.mjs vault 1.20.x 1.21.x rc main '2025-07-31 17:10:27'
 */

import { readFileSync, writeFileSync, appendFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// Make the script chatty so folks can track progress since the git-related
// steps may take a while
console.log('--- Syncing GA changes to RC folder under RC branch: start')

// Figure out where the script lives so we can use absolute paths for things
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Grab the run date so we can update the product record later
const currentDate = new Date()
const runDate = currentDate.toISOString().substring(0, 19).replace('T', ' ')

// Grab the command line arguments
const product = process.argv[2]
const gaVersion = process.argv[3]
const rcVersion = process.argv[4]
const docTag = process.argv[5]
const gaBranch = process.argv[6]
const overrideDate = process.argv[7]

// Convert the override date to ISO
const isoOverrideDate =
	overrideDate == null
		? overrideDate
		: new Date(overrideDate).toISOString().substring(0, 19).replace('T', ' ')

// Build constants for the RC branch and the versioned folder names
const rcBranch = product + '/' + rcVersion
const rcTag = ' (' + docTag + ')'
const gaFolder = 'v' + gaVersion
const rcFolder = 'v' + rcVersion + rcTag

// Define the output files and bash script helpers
const outputDir = __dirname + '/' + 'output'
const helpersDir = __dirname + '/' + 'helpers'
const logDir = outputDir + '/logs'
const recordDir = outputDir + '/product-records'
const gaDeltaFile = `${logDir}/ga-delta.txt`
const gaOnlyFile = `${logDir}/ga-only.txt`
const rcDeltaFile = `${logDir}/rc-delta.txt`
const safeListFile = `${logDir}/safe-list.txt`
const manualReviewFile = `${logDir}/manual-review.txt`
const productRecord = `${recordDir}/last-run-${product}.txt`
const warningFile = `${helpersDir}/warning.txt`
const logPrep = `${helpersDir}/log-prep.sh '${logDir}' '${recordDir}'`
const gitPrep = `${helpersDir}/git-prep.sh '${product}' '${gaBranch}' '${rcBranch}'`
const getCutoff = `${helpersDir}/get-cutoff.sh '${rcBranch}'`
const getGADelta = `${helpersDir}/get-file-delta.sh '${product}' '${gaFolder}' '<CUTOFF>'`
const getRCDelta = `${helpersDir}/get-file-delta.sh '${product}' '${rcFolder}' '<CUTOFF>'`
const getGAOnly = `${helpersDir}/only-in-ga.sh '${product}' '${gaFolder}' '${rcFolder}'`
const updateRCDocs = `${helpersDir}/update-rc-docs.sh '${product}' '${gaFolder}' '${rcFolder}' '${safeListFile}'`
const createPR = `${helpersDir}/create-pr.sh '${product}' '${rcFolder}' '${rcBranch}'`

// Initialize some variables
var bashOutput = '' // Reusable variable used to catch the output from bash helpers
var lastRunDate = '' // Last run date in the product record file
var rcCutoffDate = '' // Cutoff date for comparing file updates, either the RC branch creation or the provided override date
var gaOnly = [] // Set of docs that only exist in the GA folder
var gaDelta = [] // GA docs with a last commit date after the cutoff
var rcDelta = [] // RC docs with a last commit date after the cutoff

// Initialize the output files
console.log('    Prepping output directories/files')
await runBashCmdAsync(logPrep)

// Let folks know what information the script is working with
console.log(
	'    Syncing git data for GA and RC branches and creating PR branch',
)
console.log('      - Product:    ' + product)
console.log('      - GA branch:  ' + gaBranch)
console.log('      - GA version: ' + gaVersion)
console.log('      - RC branch:  ' + rcBranch)
console.log('      - RC version: ' + rcVersion)
console.log('      - PR branch:  ' + 'bot/' + product + '-ga-to-rc-sync')

// Sync the GA and RC branches and create the PR branch
await runBashCmdAsync(gitPrep)

// Check for a last run date, calculate the branch creation date and set the
// cutoff. We always calculate the creation date so folks can compare the date
// used during comparison with the age of the branch as a check that the date
// makes sense

console.log('    Determining cutoff date')

// Grab the last run date for the product, if it exists
readFileSync(productRecord, 'utf8', (err, data) => {
	if (err) {
		lastRunDate = ''
	}
	lastRunDate = data
})

// Pull the creation date of the release branch; if the last run date is older
// than the branch date, use the branch date as the default. Otherwise, use
// the last script run date from the product record
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

var noDelta, noNewFiles

// Call helpers/get-file-delta.sh with the cutoff date and GA info to build GAΔ
process.stdout.write('    Building GAΔ     ')
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

// Call helpers/get-file-delta.sh with the cutoff date and RC info to build RCΔ
process.stdout.write('    Building RCΔ     ')
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

// Call helpers/only-in-ga.sh to build GA-only
process.stdout.write('    Building GA-only ')
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

/*
 * Create the set of files we can safely slam and the list of files we need to
 * manually review:
 * push to RC    = file ∈ { !RCΔ ∧ GAΔ } or { GA-only }
 * manual review = file ∈ { RCΔ ∧ GAΔ }
 */

var pushtoRC = gaOnly
var manualReview = []
var noUpdates, noConflicts

console.log('    Comparing GAΔ and RCΔ')
for (const key in gaDelta) {
	if (!rcDelta.includes(key)) {
		// If the key only exists in GAΔ, add it to the safe list
		pushtoRC[key] = gaDelta[key]
	} else {
		// If the key exists in GAΔ and RCΔ, add the file details for GA and RC to
		// the conflict list with the commit dates
		manualReview[key] =
			key +
			':\n   GA: ' +
			'[' +
			gaDelta[key][1] +
			'] ' +
			gaDelta[key][0] +
			'\n   RC: ' +
			'[' +
			rcDelta[key][1] +
			'] ' +
			rcDelta[key][0]
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
console.log(
	'      - Files for manual review: [' +
		Object.keys(manualReview).length.toString().padStart(2, 0) +
		'] ' +
		manualReviewFile,
)

writeToFile(safeListFile, noUpdates ? 'No safe files found.' : pushtoRC)
writeConflictList(
	manualReviewFile,
	noConflicts ? 'No conflicts found.' : manualReview,
)

console.log('    Updating RC files')
bashOutput = await runBashCmdAsync(updateRCDocs)

console.log('    Creating draft PR')
bashOutput = await runBashCmdAsync(createPR)
bashOutput.forEach((line) => {
	console.log(line)
})
console.log(bashOutput)

if (Object.keys(manualReview).length > 0) {
	console.log(
		'    To make additional changes, review potential conflicts in: ' +
			manualReviewFile,
	)
}

// Update the product record with the new run date and print the reminder to
// review changes for false positives
writeFileSync(productRecord, runDate)

try {
	var warningText = readFileSync(warningFile, 'utf8')
	console.log(warningText)
} catch (err) {
	console.error('!!! ERROR!' + err)
	console.error('    ' + err)
}

console.log('')
console.log('--- Syncing GA changes to RC folder under RC branch: end')

process.exit()

/*******************************************************************************
 * FUNCTIONS
 ******************************************************************************/

/**
 * @method writeToFile
 *
 * The writeToFile function takes a string or assocative array of JSON objects
 * and writes the data to a file with one entry per line.
 *
 * Expected schema for JSON array:
 * [
 *   "key_1": ["commit_date", "absolute_path_to_file"],
 *   "key_2": ["commit_date", "absolute_path_to_file"],
 *   ...
 *   "key_N": ["commit_date", "absolute_path_to_file"],
 * ]
 *
 * @param {String} filePath  Absolute file path to target file
 * @param {Object} data      Associative array/map of arrays
 */
function writeToFile(filePath, data) {
	if (filePath == null) {
		return
	}
	if (data == null) {
		return
	}

	const dateIndex = 0
	const fileIndex = 1

	var listEntry = ''

	if (Array.isArray(data)) {
		Object.values(data).forEach((entry) => {
			listEntry = '[' + entry[dateIndex] + '] ' + entry[fileIndex]
			appendFileSync(filePath, listEntry + '\n')
		})
	} else {
		appendFileSync(filePath, data + '\n')
	}
}

/**
 * @method writeConflictList
 *
 * The writeConflictList function takes an assocative array of strings with path
 * and commit info of potential conflicts for manual review and writes the data
 * to a file.
 *
 * Expected schema:
 * [
 *   "key_1": "multi_line string_1",
 *   "key_2": "multi_line string_2",
 *   ...
 *   "key_N": "multi_line string_N",
 * ]
 *
 * Expected entry string format:
 *
 * {short_file_path}:
 *   GA: [{ga_commit_date}] {full_ga_path}
 *   RC: [{rc_commit_date}] {full_rc_path}
 *
 * For example:
 *
 * /content/partials/tips/change-tracker.mdx:
 *   GA: [2025-08-15 16:38:58] /local/repo/path/web-unified-docs/content/vault/v1.20.x/content/docs/sync/gcpsm.mdx
 *   RC: [2025-08-23 10:52:06] /local/repo/path/web-unified-docs/content/vault/v1.21.x (rc)/content/docs/sync/gcpsm.mdx
 *
 * @param {String} filePath  Absolute file path to target file
 * @param {Object} data      Associative array/map of string
 */
function writeConflictList(filePath, data) {
	if (filePath == null) {
		return
	}
	if (data == null) {
		return
	}

	if (Array.isArray(data)) {
		Object.values(data).forEach((entry) => {
			appendFileSync(filePath, entry + '\n')
			console.log('  - Writing: ' + entry)
		})
	} else {
		appendFileSync(filePath, data + '\n')
	}
}

/**
 * @method processJson
 *
 * The processJson function takes an array of JSON objects and converts it to an
 * assocative array of arrays so we can eventually compare keys across arrays.
 *
 * Expected schema:
 * [
 *   '{"file": "filename_1", "shortname": "shortname_1", "commit": "last_commit_date_1"}',
 *   '{"file": "filename_2", "shortname": "shortname_2", "commit": "last_commit_date_2"}',
 *   ...
 *   '{"file": "filename_N", "shortname": "shortname_N", "commit": "last_commit_date_N"}',
 * ]
 *
 * @param {Object} rawResults Array of JSON objects
 */
function processJson(rawResults) {
	var results = []
	var jsonData

	rawResults.forEach((outputLine) => {
		jsonData = JSON.parse(outputLine)
		results[jsonData.shortname] = [jsonData.commit, jsonData.file]
	})

	return results
}

/**
 * @method flattenArray
 *
 * The flattenArray function takes an array of JSON objects, flattens it, and
 * removes any blank lines to ensure that each array entry corresponds to exactly
 * one JSON object. The helper scripts may write data faster than runBashCmdAsync
 * pushes to the result array, so we flatten any results before trying to process
 * anything.
 *
 * @param {Object} rawResults Array of JSON objects, may have multiple objects
 *                            per entry
 */
function flattenArray(rawResults) {
	var results = []

	if (rawResults == null) {
		return results
	}

	if (!Array.isArray(rawResults)) {
		return results.push(rawResults)
	}

	rawResults.forEach((outputLine) => {
		if (Array.isArray(outputLine)) {
			results.push(...flattenArray(outputLine))
		} else if (outputLine.includes('\n')) {
			results.push(...flattenArray(outputLine.split('\n')))
		} else if (outputLine.length > 0) {
			results.push(outputLine)
		}
	})

	return results
}

/**
 * @method runBashCmdAsync
 *
 * The runBashCmdAsync function takes a bash command, spawns a new bash process
 * to run the command, and pushes the results from stdout to an array.
 *
 * @param {Object} cmdString bash command or path to a bash script
 */
async function runBashCmdAsync(cmdString) {
	var bashOutput = []
	const bash = spawn(`bash`)
	bash.stdin.setDefaultEncoding('utf-8')

	// Wait for the process to spawn
	await new Promise((resolve) => {
		bash.once(`spawn`, resolve)
	})

	// Push info from stdout to an array
	bash.stdout.on(`data`, (data) => {
		bashOutput.push(data.toString())
	})

	// Print any information from stderr to the console
	bash.stderr.on(`data`, (data) => {
		console.log(data.toString())
	})

	// Wait for the command string to execute
	await new Promise((resolve) => {
		bash.stdin.write(`${cmdString}\n`, () => {
			resolve()
		})
	})

	bash.stdin.end()

	// Wait for the stdout and stderr streams to end, and for the bash process to
	// close
	await Promise.all([
		new Promise((resolve) => {
			bash.stdout.on('end', resolve)
		}),
		new Promise((resolve) => {
			bash.stderr.on('end', resolve)
		}),
		new Promise((resolve) => {
			bash.once(`close`, resolve)
		}),
	])

	// Return the stdout results as an array
	return bashOutput
}
