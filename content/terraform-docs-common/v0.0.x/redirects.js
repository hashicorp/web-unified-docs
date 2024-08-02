/**
 * Redirects in this file are intended to be for documentation content only. The redirects will be applied to developer.hashicorp.com.
 */
module.exports = [
  // Redirects for Terraform Plugin Framework data handling expansion
  // - https://github.com/hashicorp/terraform-plugin-framework/pull/822
  {
    source: "/terraform/plugin/framework/handling-data/conversion-rules",
    destination: "/terraform/plugin/framework/handling-data/types",
    permanent: true,
  },
  {
    source: "/terraform/plugin/framework/handling-data/custom-types",
    destination: "/terraform/plugin/framework/handling-data/types/custom",
    permanent: true,
  },
  // Redirects for restructured Terraform Plugin Framework docs for GA release of the Framework
  // - https://github.com/hashicorp/terraform-plugin-framework/pull/554
  // - https://github.com/hashicorp/terraform-docs-common/pull/252
  {
    source: "/terraform/plugin/which-sdk",
    destination: "/terraform/plugin/framework-benefits",
    permanent: true,
  },
  {
    source: "/terraform/plugin/framework/schemas",
    destination: "/terraform/plugin/framework/handling-data/schemas",
    permanent: true,
  },
  {
    source: "/terraform/plugin/framework/types",
    destination: "/terraform/plugin/framework/handling-data/attributes",
    permanent: true,
  },
  {
    source: "/terraform/plugin/framework/paths",
    destination: "/terraform/plugin/framework/handling-data/paths",
    permanent: true,
  },
  {
    source: "/terraform/plugin/framework/path-expressions",
    destination: "/terraform/plugin/framework/handling-data/path-expressions",
    permanent: true,
  },
  {
    source: "/terraform/plugin/framework/accessing-values",
    destination: "/terraform/plugin/framework/handling-data/accessing-values",
    permanent: true,
  },
  {
    source: "/terraform/plugin/framework/writing-state",
    destination: "/terraform/plugin/framework/handling-data/writing-state",
    permanent: true,
  },
  {
    source: "/terraform/cloud-docs/workspaces/naming",
    destination: "/terraform/cloud-docs/workspaces/creating",
    permanent: true,
  },
  // Moving TF Plugin Development best practice info
  // - https://github.com/hashicorp/terraform-plugin-sdk/issues/1151
  {
    source: "/terraform/plugin/sdkv2/best-practices/other-languages",
    destination: "/terraform/plugin/best-practices/provider-code",
    permanent: true,
  },
  {
    source: "/terraform/plugin/sdkv2/best-practices/testing",
    destination: "/terraform/plugin/testing/testing-patterns",
    permanent: true,
  },
  {
    source: "/terraform/plugin/sdkv2/best-practices/versioning",
    destination: "/terraform/plugin/best-practices/versioning",
    permanent: true,
  },
  {
    source: "/terraform/plugin/sdkv2/best-practices/sensitive-state",
    destination: "/terraform/plugin/best-practices/sensitive-state",
    permanent: true,
  },
  {
    source: "/terraform/plugin/sdkv2/best-practices/depending-on-providers",
    destination: "/terraform/plugin/best-practices/interacting-with-providers",
    permanent: true,
  },
  {
    source: "/terraform/plugin/sdkv2/best-practices/naming",
    destination: "/terraform/plugin/best-practices/naming",
    permanent: true,
  },
  {
    source: "/terraform/plugin/hashicorp-provider-design-principles",
    destination:
      "/terraform/plugin/best-practices/hashicorp-provider-design-principles",
    permanent: true,
  },
  // Redirects for the ServiceNow Service Catalog for Terraform
  // - https://github.com/hashicorp/terraform-docs-common/pull/375
  {
    source: "/terraform/cloud-docs/integrations/service-now",
    destination:
      "/terraform/cloud-docs/integrations/service-now/service-catalog-terraform",
    permanent: true,
  },
  {
    source:
      "/terraform/cloud-docs/integrations/service-now/service-catalog-config",
    destination:
      "/terraform/cloud-docs/integrations/service-now/service-catalog-terraform/service-catalog-config",
    permanent: true,
  },
  {
    source: "/terraform/cloud-docs/integrations/service-now/admin-guide",
    destination:
      "/terraform/cloud-docs/integrations/service-now/service-catalog-terraform/admin-guide",
    permanent: true,
  },
  {
    source:
      "/terraform/cloud-docs/integrations/service-now/developer-reference",
    destination:
      "/terraform/cloud-docs/integrations/service-now/service-catalog-terraform/developer-reference",
    permanent: true,
  },
  {
    source:
      "/terraform/cloud-docs/integrations/service-now/example-customizations",
    destination:
      "/terraform/cloud-docs/integrations/service-now/service-catalog-terraform/example-customizations",
    permanent: true,
  },
  {
    source: "/terraform/cloud-docs/integrations/service-now/service-now-v1",
    destination:
      "/terraform/cloud-docs/integrations/service-now/service-catalog-terraform/service-now-v1",
    permanent: true,
  },
  // Redirect to integrate both Flex and PAYG TFC documentation
  // - https://github.com/hashicorp/terraform-docs-common/pull/399
  {
    source: "/terraform/cloud-docs/overview/change-plan",
    destination: "/terraform/cloud-docs/overview/activate-payg",
    permanent: true,
  },
  // Fix K8s file format to match style guide
  // https://github.com/hashicorp/terraform-docs-common/pull/420/files
  {
    source:
      "/terraform/cloud-docs/integrations/kubernetes/k8s-ops-v2-migration",
    destination:
      "/terraform/cloud-docs/integrations/kubernetes/ops-v2-migration",
    permanent: true,
  },
];
