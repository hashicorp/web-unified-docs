import * as core from '@actions/core'
import { execSync } from 'child_process'

function computeVercelPreviewUrl(projectName, branchName, scope) {
	// https://github.com/orgs/vercel/discussions/1652#discussioncomment-5158926
	const cleanedBranchName = branchName.replace(/[^a-zA-Z0-9_-]/g, '-')
	return `https://${projectName}-git-${cleanedBranchName}-${scope}.vercel.app`
}

function computeBranchName() {
	return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
}

function run() {
	try {
		const projectName = core.getInput('project-name', { required: true })
		const scope = core.getInput('scope', { required: true })

		const branchName = computeBranchName()
		const previewUrl = computeVercelPreviewUrl(projectName, branchName, scope)

		core.info(`Computed unified docs preview URL: ${previewUrl}`)
		core.setOutput('preview-url', previewUrl)
	} catch (error) {
		core.setFailed(error.message)
	}
}

run()
