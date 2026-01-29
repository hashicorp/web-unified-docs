/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { redirect } from 'next/navigation'

// Redirect to the web-unified-docs repository
// eslint-disable-next-line no-restricted-exports
export default function Home() {
	redirect('https://github.com/hashicorp/web-unified-docs')
}
