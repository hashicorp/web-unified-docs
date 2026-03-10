/**
 * Minimal HTTP receiver for the lychee header-leak PoC.
 *
 * Usage:
 *   node scripts/security-poc/capture-headers.mjs [port] [output-file]
 *
 * Example:
 *   node scripts/security-poc/capture-headers.mjs 8787 /tmp/lychee-capture.jsonl
 */

import fs from 'node:fs'
import http from 'node:http'

const port = Number(process.argv[2] || process.env.PORT || 8787)
const outputFile = process.argv[3] || process.env.OUTPUT_FILE || ''
const host = process.env.HOST || '127.0.0.1'

const appendLine = (line) => {
	if (!outputFile) {
		return
	}

	fs.appendFileSync(outputFile, `${line}\n`)
}

const server = http.createServer((req, res) => {
	const event = {
		timestamp: new Date().toISOString(),
		method: req.method,
		url: req.url,
		headers: req.headers,
	}

	const line = JSON.stringify(event)
	console.log(line)
	appendLine(line)

	res.writeHead(200, { 'content-type': 'text/plain' })
	res.end('ok\n')
})

server.listen(port, host, () => {
	console.log(
		JSON.stringify({
			listening: true,
			host,
			port,
			outputFile: outputFile || null,
		}),
	)
})
