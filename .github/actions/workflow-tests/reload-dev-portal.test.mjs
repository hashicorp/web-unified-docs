import { ActRunner, ActExecStatus } from '@pshevche/act-test-runner'
import { describe, test, expect } from 'vitest'

import mockttp from 'mockttp'

const runCICDTests = process.env.RUN_CI_CD_Tests === 'true'

let mockServer
if (runCICDTests) {
	mockServer = mockttp.getLocal()
	await mockServer.start(8080)
}

describe.skipIf(!runCICDTests)('prod only test suite', () => {
	test('custom workflow', { timeout: 120_000 }, async () => {
		const deployEndpointMock = await mockServer
			.forPost('/deploy')
			.thenReply(200, 'OK')

		const result = await new ActRunner()
			.withWorkflowFile('.github/workflows/reload-dev-portal.yml')
			// .withAdditionalArgs(["-P", "ubuntu-latest=catthehacker/ubuntu:act-latest"])
			.withVariablesValues(['base_sha', '^HEAD'], ['head_sha', 'HEAD'])
			.withSecretsValues(
				['dev-portal-deploy-hook-prod', `${mockServer.url}/deploy`],
				['revalidate-token', 'dummy_value'],
				['bot-bypass-token', 'dummy_value'],
			)
			.withEnvValues(['http_proxy', 'http://host.docker.internal:8080'])
			.withEvent('workflow_call')
			.forwardOutput()
			.run()

		console.log(result)

		expect(result.status).toBe(ActExecStatus.SUCCESS)

		const requests = await deployEndpointMock.getSeenRequests()
		expect(requests.length).to.equal(1)
	})
})
