// import path from 'path';
import puppeteer from 'puppeteer'

import fs from 'fs'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

	; (async () => {
		const browser = await puppeteer.launch({ width: 1080, height: 1080 })
		const page = await browser.newPage()

		// First URL
		await page.goto(
			'https://developer.hashicorp.com/consul/docs/consul-vs-other/service-mesh-compare',
		)

		// Accept cookies
		await page.waitForSelector('[data-testid="accept"]')
		await page.evaluate(async () => {
			const acceptButton = document.querySelector('[data-testid="accept"]')
			if (acceptButton) {
				console.log('clicking accept ', acceptButton)
				acceptButton.click()
			}
		})

		const oldAPIImageData = await page.screenshot({
			path: 'currentScreenshot.png',
			// fullPage: true,
		})

		const oldScreenshotPNG = new PNG().parse(
			oldAPIImageData,
			function (error, data) {
				if (error) {
					console.log(error)
				}
			},
		)

		// Second URL
		await page.goto(
			'http://localhost:3001/consul/docs/consul-vs-other/service-mesh-compare',
		)
		const newAPIImageData = await page.screenshot({
			path: 'currentScreenshot2.png',
			// fullPage: true,
		})

		const width = oldScreenshotPNG.width
		const height = oldScreenshotPNG.height
		const diff = new PNG({ width, height })

		const newScreenshotPNG = new PNG({ width, height }).parse(
			newAPIImageData,
			function (error, data) {
				if (error) {
					console.log(error)
				}
			},
		)

		newScreenshotPNG.height = height

		console.log('width ', oldScreenshotPNG.width, ' height ', oldScreenshotPNG.height)
		console.log('width ', newScreenshotPNG.width, ' height ', newScreenshotPNG.height)

		pixelmatch(
			oldScreenshotPNG.data,
			newScreenshotPNG.data,
			diff.data,
			width,
			height,
			{ threshold: 0.4 },
		)

		fs.writeFileSync('diff.png', PNG.sync.write(diff))

		await browser.close()
	})()
