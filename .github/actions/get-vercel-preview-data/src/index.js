import * as core from '@actions/core'
import fetch from 'node-fetch'

const DEPLOYMENT_TYPE = core.getInput('deployment_type', { required: true })
const TEAM_ID = core.getInput('team_id', { required: true })
const VERCEL_TOKEN = core.getInput('vercel_token', { required: true })

// required by DEVELOPMENT_TYPE="url"
const DEVELOPMENT_URL = core.getInput('deployment_url')

// required by DEVELOPMENT_TYPE="id"
const PROJECT_ID = core.getInput('project_id')
const GITHUB_SHA = core.getInput('github_sha')

const processDeploymentData = (deploymentData) => {
	const createdUnixTimeStamp =
		DEPLOYMENT_TYPE === 'id' ? deploymentData.created : deploymentData.createdAt
	const createdDate = new Date(createdUnixTimeStamp)

	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}
	const formattedDate = createdDate.toLocaleString('en-US', options)

	core.info(`Deployment created at (UTC): ${formattedDate}`)
	core.setOutput('created_utc', formattedDate)

	const previewUrl = `https://${deploymentData.url}`
	core.info(`Vercel preview URL for ${DEPLOYMENT_TYPE}: ${previewUrl}`)
	core.setOutput('preview_url', previewUrl)

	const inspectorUrl = deploymentData.inspectorUrl
	core.info(`Vercel inspector URL for ${DEPLOYMENT_TYPE}: ${inspectorUrl}`)
	core.setOutput('inspector_url', inspectorUrl)
}

if (DEPLOYMENT_TYPE === 'url') {
	core.info(`Fetching Vercel data for deployment url ${DEVELOPMENT_URL}...`)

	let deploymentUrl = DEVELOPMENT_URL
	if (DEVELOPMENT_URL.startsWith('https://')) {
		deploymentUrl = DEVELOPMENT_URL.replace('https://', '')
	}

	fetch(
		`https://api.vercel.com/v13/deployments/${deploymentUrl}?teamId=${TEAM_ID}`,
		{
			headers: {
				Authorization: `Bearer ${VERCEL_TOKEN}`,
			},
		},
	)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`)
			}
			return res.json()
		})
		.then((deploymentData) => {
			core.info(`Fetching Vercel preview URL for Unified Docs...`)

			if (!deploymentData) {
				throw new Error(`No deployment found for the url: ${DEVELOPMENT_URL}`)
			}

			processDeploymentData(deploymentData)
		})
		.catch((err) => {
			core.error(err)
			core.setFailed(`Failed to fetch Vercel preview URL.`)
		})
} else if (DEPLOYMENT_TYPE === 'id') {
	core.info(`Fetching Vercel preview URL for Unified Docs...`)

	// In the future should we also filter by until?
	fetch(
		`https://api.vercel.com/v6/deployments?limit=10&projectId=${PROJECT_ID}&teamId=${TEAM_ID}`,
		{
			headers: {
				Authorization: `Bearer ${VERCEL_TOKEN}`,
			},
		},
	)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`)
			}
			return res.json()
		})
		.then((data) => {
			if (data.deployments && data.deployments.length > 0) {
				// Double check if the deployment is for the current sha
				const deploymentData = data.deployments.find((deployment) => {
					return deployment.meta.githubCommitSha === GITHUB_SHA
				})

				if (!deploymentData) {
					throw new Error(`No deployment found for the sha: ${GITHUB_SHA}`)
				}

				processDeploymentData(deploymentData)
			} else {
				throw new Error('No deployments found.')
			}
		})
		.catch((err) => {
			core.error(err)
			core.setFailed(`Failed to fetch Vercel preview URL.`)
		})
}
