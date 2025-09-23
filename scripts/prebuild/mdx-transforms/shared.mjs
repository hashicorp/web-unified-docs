/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * List of product codes that are supported in content exclusion directives
 * This array defines which products can have content inclusion/exclusion blocks
 *
 * To add content inclusions/exclusions for a new product:
 * 1. Add the product code to this array (e.g., 'CONSUL', 'NOMAD')
 * 2. Create a corresponding plugin in the content-exclusion directory
 * 3. Register the plugin in the dispatcher
 *
 * @type {string[]} Array of supported product codes
 */
export const DIRECTIVE_PRODUCTS = ['Vault', 'TFC', 'TFEnterprise']
