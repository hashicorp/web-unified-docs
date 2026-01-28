/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import { PRODUCT_CONFIG } from '#productConfig.mjs'

export async function GET() {
	return Response.json({
		result: Object.keys(PRODUCT_CONFIG),
	})
}
