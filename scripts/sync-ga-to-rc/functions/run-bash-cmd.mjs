import { spawn } from 'node:child_process'

/**
 * @method runBashCmdAsync
 *
 * The runBashCmdAsync function takes a bash command, spawns a new bash process
 * to run the command, and pushes the results from stdout to an array.
 *
 * @param {Object} cmdString bash command or path to a bash script
 */

export async function runBashCmdAsync(cmdString) {
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
