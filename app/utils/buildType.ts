/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { BUILD_TYPE, getBuildType } from '#scriptUtils/get-type-of-build.mjs'

export { BUILD_TYPE }
export const buildType = getBuildType()
