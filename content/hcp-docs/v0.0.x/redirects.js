/**
 * Redirects in this file are intended to be for documentation content only. The redirects will be applied to developer.hashicorp.com.
 */
module.exports = [
  // {
  //   source: '/hcp/docs/path',
  //   destination: '/hcp/docs/new/path',
  //   permanent: true,
  // },
  {
    source: '/hcp/docs/packer/store-image-metadata/template-configuration',
    destination:
      '/hcp/docs/packer/store-image-metadata/packer-template-configuration',
    permanent: true,
  },
  {
    source: '/hcp/docs/hcp/admin/users',
    destination: '/hcp/docs/hcp/admin/iam/users',
    permanent: true,
  },
  {
    source: '/hcp/docs/hcp/security/mfa',
    destination: '/hcp/docs/hcp/admin/iam/mfa',
    permanent: true,
  },
  {
    source: '/hcp/docs/hcp/security/service-principals',
    destination: '/hcp/docs/hcp/admin/iam/service-principals',
    permanent: true,
  },
  {
    source: '/hcp/docs/hcp/security/sso',
    destination: '/hcp/docs/hcp/admin/iam/sso',
    permanent: true,
  },
  {
    source: '/hcp/docs/hcp/security/sso/sso-okta',
    destination: '/hcp/docs/hcp/admin/iam/sso/sso-okta',
    permanent: true,
  },
  {
    source: '/hcp/docs/hcp/security/sso/sso-okta-oidc',
    destination: '/hcp/docs/hcp/admin/iam/sso/sso-okta-oidc',
    permanent: true,
  },
  {
    source: '/hcp/docs/hcp/security/sso/sso-aad',
    destination: '/hcp/docs/hcp/admin/iam/sso/sso-aad',
    permanent: true,
  },
  {
    source: '/hcp/docs/hcp/security/sso/sso-aad-oidc',
    destination: '/hcp/docs/hcp/admin/iam/sso/sso-aad-oidc',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/specifications',
    destination: '/hcp/docs/consul',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/tiers',
    destination: '/hcp/docs/consul/concepts/cluster-tiers',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/constraints',
    destination: '/hcp/docs/consul',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage',
    destination: '/hcp/docs/consul/hcp-managed',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/clusters',
    destination: '/hcp/docs/consul/hcp-managed/create',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/cluster-peering',
    destination: '/hcp/docs/consul/extend/cluster-peering',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/cluster-peering/topologies',
    destination: '/hcp/docs/consul/concepts/network-topologies',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/cluster-peering/create-connections',
    destination: '/hcp/docs/consul/extend/cluster-peering/establish',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/clients',
    destination: '/hcp/docs/consul/hcp-managed/clients',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/dataplanes',
    destination: '/hcp/docs/consul/hcp-managed/dataplanes',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/federation',
    destination: '/hcp/docs/consul/extend/federation',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/management-plane',
    destination: '/hcp/docs/consul/monitor/management-plane',
    permanent: true,
  },
  {
    source:
      '/hcp/docs/consul/usage/management-plane/linking-self-managed-clusters',
    destination: '/hcp/docs/consul/self-managed',
    permanent: true,
  },
  {
    source:
      '/hcp/docs/consul/usage/management-plane/linking-self-managed-clusters/link-new-self-managed-clusters',
    destination: '/hcp/docs/consul/self-managed/new',
    permanent: true,
  },
  {
    source:
      '/hcp/docs/consul/usage/management-plane/linking-self-managed-clusters/link-existing-self-managed-clusters',
    destination: '/hcp/docs/consul/self-managed/existing',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/management-plane/observability',
    destination: '/hcp/docs/consul/monitor/management-plane/observability',
    permanent: true,
  },
  {
    source:
      '/hcp/docs/consul/usage/management-plane/observability/deploy-metrics-collector',
    destination:
      '/hcp/docs/consul/monitor/management-plane/observability/telemetry-collector',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/upgrades',
    destination: '/hcp/docs/consul/upgrade',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/audit-logging',
    destination: '/hcp/docs/consul/monitor/audit-logs',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/server-logs',
    destination: '/hcp/docs/consul/monitor/server-logs',
    permanent: true,
  },
  {
    source: '/hcp/docs/consul/usage/snapshots',
    destination: '/hcp/docs/consul/upgrade/snapshots',
    permanent: true,
  },
  {
    source: '/hcp/docs/vault/audit-log',
    destination: '/hcp/docs/vault/integrations',
    permanent: true,
  },

  {
    source: '/hcp/docs/vault/constraints-and-known-issues',
    destination: '/hcp/docs/vault/constraints-and-limitations',
    permanent: true,
  },

  {
    source: '/hcp/docs/consul/concepts/management-plane',
    destination: '/hcp/docs/consul/concepts/consul-central',
    permanent: true,
  },

  {
    source: '/hcp/docs/consul/monitor/management-plane/:slug*',
    destination: '/hcp/docs/consul/monitor/consul-central/:slug',
    permanent: true,
  },
  // HCP Packer v1->v2 Nomenclature redirects
  {
    source: '/hcp/docs/packer/audit-logs/streaming',
    destination: '/hcp/docs/packer/manage/audit-logs',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/audit-logs/messages-and-metadata',
    destination: '/hcp/docs/packer/reference/audit-log',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/webhooks',
    destination: '/hcp/docs/packer/reference/webhook',
    permanent: true,
  },
  {
    source:
      '/hcp/docs/packer/store-image-metadata/packer-template-configuration',
    destination: '/hcp/docs/packer/store/push-metadata',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/store-image-metadata/image-metadata',
    destination: '/hcp/docs/packer/store',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/store-image-metadata/image-buckets',
    destination: '/hcp/docs/packer/store/create-bucket',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/manage-image-use/terraform-cloud-run-tasks',
    destination: '/hcp/docs/packer/store/validate-version',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/manage-image-use/image-channels',
    destination: '/hcp/docs/packer/manage/channel',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/manage-image-use/revoke-images',
    destination: '/hcp/docs/packer/manage/revoke-restore',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/reference-image-metadata',
    destination: '/hcp/docs/packer/store/reference',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/manage-image-use/ancestry',
    destination: '/hcp/docs/packer/manage/ancestry',
    permanent: true,
  },
  {
    source: '/hcp/docs/packer/manage-image-use/image-channels-revocation',
    destination: '/hcp/docs/manage/channel',
    permanent: true,
  },
  {
    source: '/hcp/docs/boundary/self-managed-workers/support-considerations',
    destination: 'hcp/docs/boundary/support-policy',
    permanent: true,
  },
]
