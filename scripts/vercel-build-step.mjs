#!/usr/bin/env node
import { execSync } from 'child_process'

const EXIT_CODES = {
	BUILD: 1,
	SKIP: 0,
}

const REPO_TO_CLONE = 'hashicorp/dev-portal'
const VERCEL_PROJECT_NAME = 'unified-docs-dev-portal-preview' // we also use this as the working directory

async function main() {
	try {
		const unifiedDocsPreviewUrl = readEnvVar('VERCEL_BRANCH_URL')
		const vercelToken = readEnvVar('VERCEL_TOKEN')
		const vercelGlobalArgs = `--scope=hashicorp --token=${vercelToken}`

		await cloneDevPortal(VERCEL_PROJECT_NAME)
		process.chdir(VERCEL_PROJECT_NAME)

		await runCommand('npm install')
		await ensureVercelIsInstalled()

		await runCommand(
			`vercel pull --yes --environment=preview ${vercelGlobalArgs} --name=${VERCEL_PROJECT_NAME}`
		)

		// override the env vars that are needed for the dev portal preview to work
		process.env.IS_CONTENT_PREVIEW = 'true'
		process.env.UNIFIED_DOCS_API = `https://${unifiedDocsPreviewUrl}/`

		await runCommand(`vercel build ${vercelGlobalArgs}`)

		const previewUrl = await deployToVercel(
			vercelGlobalArgs,
			VERCEL_PROJECT_NAME
		)

		console.log('Successfully built dev-portal preview')
		const results = {
			UNIFIED_DOCS_PREVIEW_URL: unifiedDocsPreviewUrl,
			DEV_PORTAL_PREVIEW_URL: previewUrl,
		}
		console.log(JSON.stringify(results, null, 2))

		process.exit(EXIT_CODES.BUILD)
	} catch (error) {
		console.error('Error deploying dev-portal preview:', error)
		process.exit(EXIT_CODES.BUILD)
	}
}

main().catch((error) => {
	console.error('Unhandled error:', error)
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

async function deployToVercel(args, projectName) {
	const vercelCommand = `vercel deploy --prebuilt ${args} --name=${projectName}`
	return runCommand(vercelCommand, { stdio: 'pipe' })
}

async function runCommand(command, options = {}) {
	try {
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
