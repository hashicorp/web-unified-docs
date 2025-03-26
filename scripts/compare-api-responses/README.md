# Tool to compare API responses

> Note: As of March 2025, this script is set up for comparing version-metadata between endpoints

This script is a utility for comparing API responses between two endpoints, typically the UDR API and Content API. It supports multiple API types and provides options for filtering, saving output, and customizing the comparison.

## Options:

-n, --new-api-url <url>: The base URL of the new API to compare.
-o, --old-api-url <url>: The base URL of the old API to compare against.
-v, --version <version>: The version of the product to compare.
-p, --product <product>: The product name to compare.
-a, --api <api>: The API type to compare. Options: content, nav-data, version-metadata, content-versions. Default: version-metadata.
-r, --drop-keys <keys>: Comma-separated list of keys to exclude from the comparison.
-s, --save-output: Save the comparison output to a file. Disabled by default.

### Example

To compare version metadata between APIs for a specific product:

```bash
npm run compare-api-responses -- -n localhost:8080 -o https://content.hashicorp.com -p terraform-docs-agents
```

### Example output:

```bash
@@ -2,11 +2,4 @@
    {
-     "created_at": "2025-03-18T19:47:18.641Z",
-     "display": "v1.21.0",
      "isLatest": true,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.21.0",
      "releaseStage": "stable",
-     "sha": "54ed38c9bafb5c437c294a6b7238e08915188332",
-     "sk": "version-metadata/v1.21.x",
      "version": "v1.21.x"
@@ -14,11 +7,4 @@
    {
-     "created_at": "2025-03-18T19:47:18.605Z",
-     "display": "v1.20.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.20.2",
      "releaseStage": "stable",
-     "sha": "3265ff727b24d97f94e2e272ab6ea77dad2418ea",
-     "sk": "version-metadata/v1.20.x",
      "version": "v1.20.x"
@@ -26,11 +12,4 @@
    {
-     "created_at": "2025-02-06T19:43:18.538Z",
-     "display": "v1.19.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.19.0",
      "releaseStage": "stable",
-     "sha": "9d02bf677d6dd085b9a65be4d01fad77fb432f18",
-     "sk": "version-metadata/v1.19.x",
      "version": "v1.19.x"
@@ -38,11 +17,4 @@
    {
-     "created_at": "2025-02-05T22:00:28.858Z",
-     "display": "v1.18.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.18.0",
      "releaseStage": "stable",
-     "sha": "4942ebb1cd931e7a6e0e2259054c1e8389a3a8e5",
-     "sk": "version-metadata/v1.18.x",
      "version": "v1.18.x"
@@ -50,11 +22,4 @@
    {
-     "created_at": "2025-01-29T21:12:08.164Z",
-     "display": "v1.17.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.17.6",
      "releaseStage": "stable",
-     "sha": "f0c5b93087310a9a7a12889502af1bfab1c993ad",
-     "sk": "version-metadata/v1.17.x",
      "version": "v1.17.x"
@@ -62,11 +27,4 @@
    {
-     "created_at": "2024-10-30T16:30:46.593Z",
-     "display": "v1.16.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.16.0",
      "releaseStage": "stable",
-     "sha": "dbb7940356646d601c99e9e8948248e9e33cf9c8",
-     "sk": "version-metadata/v1.16.x",
      "version": "v1.16.x"
@@ -74,11 +32,4 @@
    {
-     "created_at": "2024-10-02T22:12:01.626Z",
-     "display": "v1.15.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.15.5",
      "releaseStage": "stable",
-     "sha": "b769d6a97887ef4b80e3960c10696865c04b3484",
-     "sk": "version-metadata/v1.15.x",
      "version": "v1.15.x"
@@ -86,11 +37,4 @@
    {
-     "created_at": "2024-03-13T23:02:57.057Z",
-     "display": "v1.14.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.14.5",
      "releaseStage": "stable",
-     "sha": "b9eabad236ba4cc8054e3addd262b597654c44b1",
-     "sk": "version-metadata/v1.14.x",
      "version": "v1.14.x"
@@ -98,11 +42,4 @@
    {
-     "created_at": "2023-11-09T22:33:57.325Z",
-     "display": "v1.13.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.13.1",
      "releaseStage": "stable",
-     "sha": "7d5d48cae15b6b1bf840cabff0ce19dfe68204cf",
-     "sk": "version-metadata/v1.13.x",
      "version": "v1.13.x"
@@ -110,11 +47,4 @@
    {
-     "created_at": "2023-09-28T18:47:10.933Z",
-     "display": "v1.12.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.12.1",
      "releaseStage": "stable",
-     "sha": "0a742ad934ed7de22487fadcafde6c3363a134f5",
-     "sk": "version-metadata/v1.12.x",
      "version": "v1.12.x"
@@ -122,11 +52,4 @@
    {
-     "created_at": "2023-07-26T21:28:58.478Z",
-     "display": "v1.11.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.11.0",
      "releaseStage": "stable",
-     "sha": "9348221ded1edcce0b4e3d39a026262ea4bce439",
-     "sk": "version-metadata/v1.11.x",
      "version": "v1.11.x"
@@ -134,11 +57,4 @@
    {
-     "created_at": "2023-07-24T15:52:56.786Z",
-     "display": "v1.10.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.10.1",
      "releaseStage": "stable",
-     "sha": "ebb223ea6ed2d732805b1fa2ade3832f11f7097a",
-     "sk": "version-metadata/v1.10.x",
      "version": "v1.10.x"
@@ -146,11 +62,4 @@
    {
-     "created_at": "2023-06-09T18:05:22.217Z",
-     "display": "v1.9.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.9.0",
      "releaseStage": "stable",
-     "sha": "489f89391a5ac0c13fda07d149291c970d7e22ed",
-     "sk": "version-metadata/v1.9.x",
      "version": "v1.9.x"
@@ -158,11 +67,4 @@
    {
-     "created_at": "2023-05-04T19:28:15.890Z",
-     "display": "v1.8.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.8.0",
      "releaseStage": "stable",
-     "sha": "d4f90d4d3ea1ae1c049cd13dbbc93b75f43d846e",
-     "sk": "version-metadata/v1.8.x",
      "version": "v1.8.x"
@@ -170,11 +72,4 @@
    {
-     "created_at": "2023-04-19T18:39:28.873Z",
-     "display": "v1.7.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.7.1",
      "releaseStage": "stable",
-     "sha": "5b9d3fbefa48b778a62109029080a4dfd62a3c9b",
-     "sk": "version-metadata/v1.7.x",
      "version": "v1.7.x"
@@ -182,11 +77,4 @@
    {
-     "created_at": "2023-03-02T19:55:23.974Z",
-     "display": "v1.6.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.6.1",
      "releaseStage": "stable",
-     "sha": "f30be9cfc170e87628d1b781ef0e495056eac68f",
-     "sk": "version-metadata/v1.6.x",
      "version": "v1.6.x"
@@ -194,11 +82,4 @@
    {
-     "created_at": "2022-12-20T19:15:19.433Z",
-     "display": "v1.5.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.5.0",
      "releaseStage": "stable",
-     "sha": "891e2fcd94f0f11c284e6a76cf213173c9ee6349",
-     "sk": "version-metadata/v1.5.x",
      "version": "v1.5.x"
@@ -206,11 +87,4 @@
    {
-     "created_at": "2022-12-14T21:26:37.395Z",
-     "display": "v1.4.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.4.0",
      "releaseStage": "stable",
-     "sha": "f43efce2bb6e69797aeaf39964adcef1de62152c",
-     "sk": "version-metadata/v1.4.x",
      "version": "v1.4.x"
@@ -218,11 +92,4 @@
    {
-     "created_at": "2022-10-07T13:43:33.436Z",
-     "display": "v1.3.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.3.1",
      "releaseStage": "stable",
-     "sha": "0ececfe1b2647e861018488072f6b9e5ad90e46d",
-     "sk": "version-metadata/v1.3.x",
      "version": "v1.3.x"
@@ -230,11 +97,4 @@
    {
-     "created_at": "2022-08-05T17:39:34.922Z",
-     "display": "v1.2.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.2.7",
      "releaseStage": "stable",
-     "sha": "ca7f01d769c2f4ec0c955ef5d5ac9ef24b106eb2",
-     "sk": "version-metadata/v1.2.x",
      "version": "v1.2.x"
```
