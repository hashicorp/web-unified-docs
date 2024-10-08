#!/usr/bin/env node
import { execSync } from 'child_process'

const EXIT_CODES = {
	BUILD: 1,
	SKIP: 0,
}

const REPO_TO_CLONE = 'hashicorp/dev-portal'
const WORKING_DIRECTORY = 'unified-docs-dev-portal-preview'

async function main() {
	const unifiedDocsPreviewUrl = readEnvVar('VERCEL_BRANCH_URL')
	const vercelToken = readEnvVar('VERCEL_TOKEN')
	const vercelGlobalArgs = `--scope=hashicorp --token=${vercelToken}`

	await cloneDevPortal(WORKING_DIRECTORY)
	process.chdir(WORKING_DIRECTORY)

	await runCommand('npm install')
	await ensureVercelIsInstalled()

	await runCommand(
		`vercel pull --yes --environment=preview ${vercelGlobalArgs}`
	)

	// override the env vars that are needed for the dev portal preview to work
	process.env.IS_CONTENT_PREVIEW = 'true'
	process.env.UNIFIED_DOCS_API = `https://${unifiedDocsPreviewUrl}/`

	await runCommand(`vercel build ${vercelGlobalArgs}`)
	const previewUrl = await deployToVercel(vercelGlobalArgs)

	console.log('Successfully built dev-portal preview')
	const results = {
		UNIFIED_DOCS_PREVIEW_URL: unifiedDocsPreviewUrl,
		DEV_PORTAL_PREVIEW_URL: previewUrl,
	}
	console.log(JSON.stringify(results, null, 2))
	process.exit(EXIT_CODES.BUILD)
}

main().catch((error) => {
	console.error('Could not deploy dev-portal preview')
	console.error('Unhandled error:\n', error)
	console.error(
		'See `scripts/vercel-build-step.mjs` for more details on what went wrong.'
	)
	process.exit(EXIT_CODES.BUILD)
})

// <-------------- Helper Functions --------------->
async function cloneDevPortal(directory) {
	console.log(`⏳ Cloning ${REPO_TO_CLONE}, this may take a while...`)
	await runCommand(
		`git clone --depth=1 "https://github.com/${REPO_TO_CLONE}.git" "${directory}"`
	)
	console.log(`✅ Cloned ${REPO_TO_CLONE}`)
}

async function ensureVercelIsInstalled() {
	try {
		await runCommand('vercel --version', { stdio: 'ignore' })
	} catch (error) {
		console.log('Vercel CLI not found, installing...')
		await runCommand('npm install -g vercel')
	}
}

async function deployToVercel(args) {
	const vercelCommand = `vercel deploy --prebuilt ${args}`
	return runCommand(vercelCommand, { stdio: 'pipe' })
}

async function runCommand(command, options = {}) {
	try {
		console.log(`Running command: ${command}`)
		const output = execSync(command, { ...options, encoding: 'utf8' })
		return output.trim()
	} catch (error) {
		console.error(`Error running command: ${command}`)
		throw error
	}
}

function readEnvVar(key) {
	const value = process.env[key]
	if (!value) {
		throw new Error(`Environment variable ${key} not set.`)
	}
	return value
}
