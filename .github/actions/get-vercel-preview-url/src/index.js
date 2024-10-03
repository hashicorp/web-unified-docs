import * as core from '@actions/core';
import fetch from 'node-fetch';

const VERCEL_TOKEN = core.getInput('vercel_token') || core.getInput('VERCEL_TOKEN', { required: true });
const TEAM_ID = core.getInput('team_id') || core.getInput('TEAM_ID', { required: true });
const PROJECT_ID = core.getInput('project_id') || core.getInput('PROJECT_ID', { required: true })


core.info(`Fetching Vercel preview URL for Unified Docs...`);

fetch(`https://api.vercel.com/v6/deployments?limit=1&projectId=${PROJECT_ID}&teamId=${TEAM_ID}`, {
    headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`
    },
})
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        if (data.deployments && data.deployments.length > 0) {
            const previewUrl = data.deployments[0].url;
            core.info(`Vercel preview URL for Unified Docs: ${previewUrl}`);
            core.setOutput('preview_url', previewUrl);
        } else {
            throw new Error('No deployments found.');
        }
    })
    .catch(err => {
        core.error(err);
        core.setFailed(`Failed to fetch Vercel preview URL.`);
    });
