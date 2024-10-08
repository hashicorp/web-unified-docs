#!/usr/bin/env node
import { execSync } from 'child_process'

// this file is executed by vercel
// https://vercel.com/hashicorp/unified-docs-frontend-preview/settings/git

const EXIT_CODES = {
	BUILD: 1,
	SKIP: 0,
}

// TODO: move this to a .env file
const vercelToken = 'Oq1fRHagxUo1tAxc0GeCcDet'
const vercelGlobalArgs = `--scope=hashicorp --token=${vercelToken}`

const REPO_TO_CLONE = 'hashicorp/dev-portal'
const PREVIEW_DIR = 'dev-portal-preview'

const unifiedDocsPreviewUrl = process.env.VERCEL_BRANCH_URL
if (!unifiedDocsPreviewUrl) {
	console.error('VERCEL_BRANCH_URL environment variable not set.')
	process.exit(EXIT_CODES.SKIP)
}
try {
	cloneDevPortal()
	process.chdir(PREVIEW_DIR)

	process.env.IS_CONTENT_PREVIEW = 'true'
	process.env.UNIFIED_DOCS_API = `https://${unifiedDocsPreviewUrl}/`

	execSync('npm install')

	ensureVercelIsInstalled()

	execSync(`vercel pull --yes --environment=preview ${vercelGlobalArgs}`)
	execSync(`vercel build ${vercelGlobalArgs}`)

	const vercelCommand = `vercel deploy --prebuilt ${vercelGlobalArgs}`

	const previewUrl = execSync(vercelCommand, { stdio: 'pipe' }).toString()
	console.log(`Deploy Result: ${previewUrl}`)

	console.log(
		`Vercel Preview URL for branch "${unifiedDocsPreviewUrl}": ${previewUrl}`
	)
	process.exit(EXIT_CODES.BUILD)
} catch (error) {
	console.error('Error deploying dev-portal preview:', error)
	process.exit(EXIT_CODES.BUILD)
}

// helper functions
function cloneDevPortal() {
	try {
		console.log(`⏳ Cloning ${REPO_TO_CLONE}, this may take a while...`)
		execSync(
			`git clone --depth=1 "https://github.com/${REPO_TO_CLONE}.git" "${PREVIEW_DIR}"`
		)
		console.log(`✅ Cloned ${REPO_TO_CLONE}`)
	} catch (error) {
		console.error('Error cloning dev-portal repo:', error)
		process.exit(EXIT_CODES.BUILD)
	}
}

function ensureVercelIsInstalled() {
	try {
		execSync('vercel --version', { stdio: 'ignore' })
	} catch (error) {
		console.log('Vercel CLI not found, installing...')
		execSync('npm install -g vercel')
	}
}
