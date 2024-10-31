import * as core from '@actions/core'
import fetch from 'node-fetch'

const VERCEL_TOKEN = core.getInput('vercel_token', { required: true })
const TEAM_ID = core.getInput('team_id', { required: true })
const PROJECT_ID = core.getInput('project_id', { required: true })

core.info(`Fetching Vercel preview URL for Unified Docs...`)

fetch(
	`https://api.vercel.com/v6/deployments?limit=1&projectId=${PROJECT_ID}&teamId=${TEAM_ID}`,
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
			const deploymentData = data.deployments[0]

			const createdUnixTimeStamp = deploymentData.created
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

			const previewUrl = deploymentData.url
			core.info(`Vercel preview URL for Unified Docs: ${previewUrl}`)
			core.setOutput('preview_url', previewUrl)

			const inspectorUrl = deploymentData.inspectorUrl
			core.info(`Vercel inspector URL for Unified Docs: ${inspectorUrl}`)
			core.setOutput('inspector_url', inspectorUrl)
		} else {
			throw new Error('No deployments found.')
		}
	})
	.catch((err) => {
		core.error(err)
		core.setFailed(`Failed to fetch Vercel preview URL.`)
	})
