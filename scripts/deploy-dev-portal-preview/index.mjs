import { cloneRepo, runCommand, readEnvVar } from './utils.mjs'

/* 
	Deploy an a new dev portal preview that fetches content from 
	this branch of unified-docs.

	We do this here instead of CI because it requires access to the Vercel System Environment Variables,
	which are only available during the build step of a Vercel deployment.
	See here for more detail: https://vercel.com/docs/projects/environment-variables/system-environment-variables

	This gets is configured to be invoked on the vercel project dashboard
*/

const REPO_TO_CLONE = 'hashicorp/dev-portal'
const WORKING_DIRECTORY = 'unified-docs-dev-portal-preview'

export async function main() {
	const unifiedDocsPreviewUrl = readEnvVar('VERCEL_BRANCH_URL')
	const vercelToken = readEnvVar('VERCEL_TOKEN')
	const vercelEnvironment = readEnvVar('VERCEL_ENV')

	if (vercelEnvironment === 'production') {
		console.log('Production Build, skipping dev portal preview')
		return
	}

	const vercelGlobalArgs = `--scope=hashicorp --token=${vercelToken}`

	cloneRepo(REPO_TO_CLONE, WORKING_DIRECTORY)
	process.chdir(WORKING_DIRECTORY)

	runCommand('npm install')

	// ensure vercel is installed
	try {
		runCommand('vercel --version', { stdio: 'ignore' })
	} catch (error) {
		console.log('Vercel CLI not found, installing...')
		runCommand('npm install -g vercel')
	}

	runCommand(`vercel pull --yes --environment=preview ${vercelGlobalArgs}`)
	runCommand(
		`vercel link --yes ${vercelGlobalArgs} --project ${WORKING_DIRECTORY}`
	)

	// override the env vars that are needed for the dev portal preview to work
	process.env.IS_CONTENT_PREVIEW = 'true'
	process.env.UNIFIED_DOCS_API = `https://${unifiedDocsPreviewUrl}/`

	runCommand(`vercel build ${vercelGlobalArgs}`)
	const previewUrl = runCommand(`vercel deploy --prebuilt ${vercelGlobalArgs}`)

	console.log('Successfully built dev-portal preview')
	const results = {
		UNIFIED_DOCS_PREVIEW_URL: unifiedDocsPreviewUrl,
		DEV_PORTAL_PREVIEW_URL: previewUrl,
	}
	console.log(JSON.stringify(results, null, 2))

	console.log('Cleaning up...')
	process.chdir('..')
	runCommand(`rm -rf ${WORKING_DIRECTORY}`)
}

main().catch((error) => {
	console.error('Could not deploy dev-portal preview')
	console.error('Unhandled error:\n', error)
})
