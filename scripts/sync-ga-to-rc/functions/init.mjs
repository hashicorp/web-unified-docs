/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { readFileSync } from 'node:fs'

/**
 * @method getExclusions
 *
 * The getExclusions function loads a JSON file of comparison exclusions and
 * returns an array of file keys that the script should exclude from the GA to
 * RC sync. For example, the "Important changes" doc in Vault will always be
 * different between versions and does not need to be synced.
 *
 * @param {String} excludeFile Local, absolute path to the exclusion
 * @param {String} product     Product slug
 */
export function getExclusions(excludeFile, product) {
	var excludeList = []
	var jsonData = ''

	try {
		jsonData = JSON.parse(readFileSync(excludeFile, 'utf8'))
	} catch (err) {
		console.log('!!! Error :: Opening exclude file failed')
		console.log('    - Details: ' + err)
	}

	// If the file is empty, return
	if (jsonData == null) {
		return excludeList
	}

	// Filter out the exclusions specific to the product slug
	Object.values(jsonData).forEach((jsonObj) => {
		if (Object.keys(jsonObj).includes(product)) {
			excludeList = jsonObj[product]
		}
	})
	return excludeList
}

/**
 * @method getArgs
 *
 * The getArgs function parses the arguments from argv and returns an array of
 * expected flag values based on the information passed by the user
 *
 */
export function getArgs() {
	var argName, argValue, arg

	// Create the list of expected flags and assign defaults where appropriate
	var flags = {
		'-slug': null,
		'-ga': null,
		'-rc': null,
		'-tag': '',
		'-branch': null,
		'-gaBranch': 'main',
		'-date': null,
		'-pr': false,
		'-update': false,
		'-merged': false,
		'-help': false,
	}

	// Grab the command line arguments provided
	Object.entries(process.argv).forEach(([key, str]) => {
		// Replace '--' with '-' in the flag name in case folks used '--flag'
		// notation instead of '-flag' notation
		arg = str.replace('--', '-')

		// Split the argument on '=' if folks used '-flag=value' notation instead of
		// the expected '-flag value' notation
		if (arg.includes('=')) {
			argName = arg.split('=')[0]
			argValue = arg.split('=')[1]
		} else if (['-pr', '-help', '-update', '-merged'].includes(arg)) {
			// If we see the help flag, immediately print the help text and exit
			if (arg == '-help') {
				flags[arg] = true
				return flags
			} else {
				flags[arg] = true
			}
		} else {
			argName = arg
			argValue = process.argv[parseInt(key) + 1]
		}
		// Save the argument value
		if (Object.keys(flags).includes(argName)) {
			flags[argName] = argValue
		}
	})

	return flags
}

export function getFileNames() {
	var outputFiles = {
		gaDelta: 'ga-delta.txt',
		gaOnly: 'ga-only.txt',
		rcDelta: 'rc-delta.txt',
		safeList: 'safe-list.txt',
		deleteList: 'delete-list.txt',
		conflictList: 'manual-review.txt',
	}

	var dataFiles = {
		lastRun: 'last-run-<PRODUCT>.txt',
	}

	var markdownFiles = {
		help: 'help.txt',
		warning: 'warning.txt',
	}

	return {
		output: outputFiles,
		data: dataFiles,
		markdown: markdownFiles,
	}
}
