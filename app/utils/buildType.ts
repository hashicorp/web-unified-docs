/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { BUILD_TYPE, getBuildType } from '#scriptUtils/get-type-of-build.mjs'

// a small rule break so that other files don't import from #scriptUtils
// eslint-disable-next-line no-barrel-files/no-barrel-files
export { BUILD_TYPE }
export const buildType = getBuildType()
