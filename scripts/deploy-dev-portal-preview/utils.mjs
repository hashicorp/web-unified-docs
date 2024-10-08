import { execSync } from 'node:child_process'

// abstracted out so that we can run commands in a subprocess
// also allows for more verbose output

export function cloneRepo(repo, workingDirectory) {
	console.log(`⏳ Cloning ${repo}, this may take a while...`)
	runCommand(
		`git clone --depth=1 "https://github.com/${repo}.git" "${workingDirectory}"`
	)
	console.log(`✅ Cloned ${repo}`)
}

export function runCommand(command, options = {}) {
	try {
		console.log(`Running command: ${command}`)
		const output = execSync(command, { ...options, encoding: 'utf8' })
		return output.trim()
	} catch (error) {
		console.error(`Error running command: ${command}`)
		throw error
	}
}

export function readEnvVar(key) {
	const value = process.env[key]
	if (!value) {
		throw new Error(`Environment variable ${key} not set.`)
	}
	return value
}
