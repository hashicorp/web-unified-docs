/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

/*
 * To add content inclusions/exclusions for a certain product, it has to be
 * included in the array named DIRECTIVE_PRODUCTS so that the relevant code
 * in `transformExcludeTerraformContent` and `transformExcludeVaultContent`
 * know to look out for and account for these products.
 *
 * e.g. const DIRECTIVE_PRODUCTS = ['Vault', 'TFC', 'TFEnterprise', 'CONSUL', 'NOMAD']
 */
export const DIRECTIVE_PRODUCTS = ['Vault', 'TFC', 'TFEnterprise']
