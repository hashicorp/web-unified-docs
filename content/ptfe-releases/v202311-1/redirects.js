/**
 * Redirects in this file are intended to be for documentation content only. The redirects will be applied to developer.hashicorp.com.
 */

module.exports = [
  // FDO/Replicated Rework
  // Redirect from the beta to the GA docs
  // versioned redirect (keeping this generic because anything going to the beta should be redirected to the GA)
  {
    source:
      "/terraform/enterprise/:version(v\\d{6}-\\d)/flexible-deployments-beta/:slug*",
    destination: "/terraform/enterprise/flexible-deployments/",
    permanent: true,
  },
  // for those who saved the page directly
  {
    source: "/terraform/enterprise/flexible-deployments-beta/admin/support",
    destination: "/terraform/enterprise/support",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/flexible-deployments-beta",
    destination: "/terraform/enterprise/flexible-deployments",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/install/requirements/docker",
    destination:
      "/terraform/enterprise/flexible-deployments/install/docker/requirements",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/install/requirements/kubernetes",
    destination:
      "/terraform/enterprise/flexible-deployments/install/kubernetes/requirements",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/replicated-migration",
    destination: "/terraform/enterprise/replicated/replicated-migration",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/install/requirements/docker",
    destination:
      "/terraform/enterprise/flexible-deployments/install/docker/requirements",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/install/requirements/kubernetes",
    destination:
      "/terraform/enterprise/flexible-deployments/install/kubernetes/requirements",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/install/requirements/license",
    destination:
      "/terraform/enterprise/flexible-deployments/install/requirements/license",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/flexible-deployments-beta/install/docker",
    destination:
      "/terraform/enterprise/flexible-deployments/install/docker/install",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/install/kubernetes",
    destination:
      "/terraform/enterprise/flexible-deployments/install/kubernetes/install",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/install/initial-admin-user",
    destination:
      "/terraform/enterprise/flexible-deployments/install/initial-admin-user",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/flexible-deployments-beta/install/scaling",
    destination:
      "/terraform/enterprise/flexible-deployments/scaling/kubernetes",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/install/configuration",
    destination:
      "/terraform/enterprise/flexible-deployments/install/configuration",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/monitoring/observability/logs",
    destination:
      "/terraform/enterprise/flexible-deployments/monitoring/observability/logs",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/monitoring/observability/metrics",
    destination:
      "/terraform/enterprise/flexible-deployments/monitoring/observability/metrics",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/monitoring/startup-checks",
    destination:
      "/terraform/enterprise/flexible-deployments/monitoring/startup-checks",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/flexible-deployments-beta/admin",
    destination: "/terraform/enterprise/flexible-deployments/admin",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/admin/admin-cli/admin-cli",
    destination:
      "/terraform/enterprise/flexible-deployments/admin/admin-cli/admin-cli",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/admin/admin-cli/backup-restore",
    destination:
      "/terraform/enterprise/flexible-deployments/admin/admin-cli/backup-restore",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/flexible-deployments-beta/requirements/network",
    destination:
      "/terraform/enterprise/flexible-deployments/install/requirements/network",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/flexible-deployments-beta/troubleshooting",
    destination: "/terraform/enterprise/flexible-deployments/troubleshooting",
    permanent: true,
  },
  // REPLICATED DOCS
  // Requirements
  // If the version is anything in 2018-2022, or 2023 *before* 09-01 (when FDO went live) then we want to omit "replicated" from the URL
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/requirements/docker_engine",
    destination: "/terraform/enterprise/:version/requirements/docker",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/requirements/:slug*",
    destination: "/terraform/enterprise/:version/requirements/:slug*",
    permanent: true,
  },
  // for those who saved the page directly
  {
    source: "/terraform/enterprise/requirements/credentials",
    destination: "/terraform/enterprise/replicated/requirements/credentials",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/requirements/hardware",
    destination: "/terraform/enterprise/replicated/requirements/hardware",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/requirements/os-specific/supported-os",
    destination:
      "/terraform/enterprise/replicated/requirements/os-specific/supported-os",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/requirements/os-specific/rhel-requirements",
    destination:
      "/terraform/enterprise/replicated/requirements/os-specific/rhel-requirements",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/requirements/os-specific/centos-requirements",
    destination:
      "/terraform/enterprise/replicated/requirements/os-specific/centos-requirements",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/requirements/data-storage/operational-mode-requirements",
    destination:
      "/terraform/enterprise/replicated/requirements/data-storage/operational-mode-requirements",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/requirements/data-storage/postgres-requirements",
    destination:
      "/terraform/enterprise/replicated/requirements/data-storage/postgres-requirements",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/requirements/data-storage/minio-setup-guide",
    destination:
      "/terraform/enterprise/replicated/requirements/data-storage/minio-setup-guide",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/requirements/network",
    destination: "/terraform/enterprise/replicated/requirements/network",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/requirements/docker",
    destination: "/terraform/enterprise/replicated/requirements/docker_engine",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/requirements/data-storage/vault",
    destination:
      "/terraform/enterprise/flexible-deployments/install/requirements/vault",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/operational-modes",
    destination: "/terraform/enterprise/replicated/install/operation-modes",
    permanent: true,
  },
  // Installation
  // versioned redirects
  // If the version is anything in 2018-2022, or 2023 *before* 09-01 (when FDO went live) then we want to omit "replicated" from the URL
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/install/:slug*",
    destination: "/terraform/enterprise/:version/install/:slug*",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/install/operation-modes",
    destination: "/terraform/enterprise/:version/operational-modes",
    permanent: true,
  },
  // those who saved the page directly
  {
    source: "/terraform/enterprise/install/pre-install-checklist",
    destination:
      "/terraform/enterprise/replicated/install/pre-install-checklist",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/install/interactive/installer",
    destination:
      "/terraform/enterprise/replicated/install/interactive/installer",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/install/interactive/config",
    destination: "/terraform/enterprise/replicated/install/interactive/config",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/install/automated/automating-the-installer",
    destination:
      "/terraform/enterprise/replicated/install/automated/automating-the-installer",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/install/automated/active-active",
    destination:
      "/terraform/enterprise/replicated/install/automated/active-active",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/install/automated/automating-initial-user",
    destination:
      "/terraform/enterprise/replicated/install/automated/automating-initial-user",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/install/automated/encryption-password",
    destination:
      "/terraform/enterprise/replicated/install/automated/encryption-password",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/install/uninstall",
    destination: "/terraform/enterprise/replicated/install/uninstall",
    permanent: true,
  },
  // Administration
  // versioned redirects for administration and application administration
  // versioned redirect for license
  // If the version is anything in 2018-2022, or 2023 *before* 09-01 (when FDO went live) then we want to omit "replicated" from the URL
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/administration/license/:slug*",
    destination: "/terraform/enterprise/:version/admin/application/:slug*",
    permanent: true,
  },
  // version redirect for all infrastructure pages from replicated
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/administration/infrastructure/:slug*",
    destination: "/terraform/enterprise/:version/admin/infrastructure/:slug*",
    permanent: true,
  },
  // version redirect for all administration application pages from replicated
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/application-administration/:slug*",
    destination: "/terraform/enterprise/:version/admin/application/:slug*",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/administration/:slug*",
    destination: "/terraform/enterprise/:version/admin/:slug*",
    permanent: true,
  },
  // those who saved the page directly
  {
    source: "/terraform/enterprise/admin",
    destination: "/terraform/enterprise/replicated/administration",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/agents-on-tfe",
    destination:
      "/terraform/enterprise/application-administration/agents-on-tfe",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/infrastructure/automated-recovery",
    destination:
      "/terraform/enterprise/replicated/administration/infrastructure/automated-recovery",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/infrastructure/upgrades",
    destination:
      "/terraform/enterprise/replicated/administration/infrastructure/upgrades",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/infrastructure/backup-restore",
    destination:
      "/terraform/enterprise/replicated/administration/infrastructure/backup-restore",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/infrastructure/admin-cli",
    destination:
      "/terraform/enterprise/replicated/administration/infrastructure/admin-cli",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/admin/infrastructure/worker-to-agent-migration",
    destination:
      "/terraform/enterprise/replicated/administration/infrastructure/worker-to-agent-migration",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/infrastructure/consolidated-services",
    destination:
      "/terraform/enterprise/replicated/administration/infrastructure/consolidated-services",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/admin-access",
    destination:
      "/terraform/enterprise/application-administration/admin-access",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/general",
    destination: "/terraform/enterprise/application-administration/general",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/customization",
    destination:
      "/terraform/enterprise/application-administration/customization",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/integration",
    destination: "/terraform/enterprise/application-administration/integration",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/opa-tool-versions",
    destination:
      "/terraform/enterprise/application-administration/opa-tool-versions",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/github-app-integration",
    destination:
      "/terraform/enterprise/application-administration/github-app-integration",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/resources",
    destination: "/terraform/enterprise/application-administration/resources",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/registry-sharing",
    destination:
      "/terraform/enterprise/application-administration/registry-sharing",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/application/update-tfe-license",
    destination:
      "/terraform/enterprise/replicated/administration/license/update-tfe-license",
    permanent: true,
  },
  {
    source:
      "/terraform/enterprise/admin/application/automated-license-utilization-reporting",
    destination:
      "/terraform/enterprise/replicated/administration/license/automated-license-utilization-reporting",
    permanent: true,
  },
  // Architecture
  // versioned redirects
  // If the version is anything in 2018-2022, or 2023 *before* 09-01 (when FDO went live) then we want to omit "replicated" from the URL
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/architecture/reference-architecture/:slug*",
    destination: "/terraform/enterprise/:version/reference-architecture/:slug*",
    permanent: true,
  },
  // for those who saved the page directly
  {
    source: "/terraform/enterprise/reference-architecture",
    destination:
      "/terraform/enterprise/replicated/architecture/reference-architecture",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/reference-architecture/aws",
    destination:
      "/terraform/enterprise/replicated/architecture/reference-architecture/aws",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/reference-architecture/azure",
    destination:
      "/terraform/enterprise/replicated/architecture/reference-architecture/azure",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/reference-architecture/gcp",
    destination:
      "/terraform/enterprise/replicated/architecture/reference-architecture/gcp",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/reference-architecture/vmware",
    destination:
      "/terraform/enterprise/replicated/architecture/reference-architecture/vmware",
    permanent: true,
  },
  // System Overview
  // versioned redirects
  // If the version is anything in 2018-2022, or 2023 *before* 09-01 (when FDO went live) then we want to omit "replicated" from the URL
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/architecture/system-overview/:slug*",
    destination: "/terraform/enterprise/:version/system-overview/:slug*",
    permanent: true,
  },
  // for those who saved the page directly
  {
    source: "/terraform/enterprise/system-overview",
    destination:
      "/terraform/enterprise/replicated/architecture/system-overview",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/system-overview/reliability-availability",
    destination:
      "/terraform/enterprise/replicated/architecture/system-overview/reliability-availability",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/system-overview/capacity",
    destination:
      "/terraform/enterprise/replicated/architecture/system-overview/capacity",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/system-overview/security-model",
    destination:
      "/terraform/enterprise/replicated/architecture/system-overview/security-model",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/system-overview/data-security",
    destination:
      "/terraform/enterprise/replicated/architecture/system-overview/data-security",
    permanent: true,
  },
  // Monitoring
  // versioned redirects
  // If the version is anything in 2018-2022, or 2023 *before* 09-01 (when FDO went live) then we want to omit "replicated" from the URL
  {
    source:
      "/terraform/enterprise/:version(v201[8-9]\\d{2}-\\d{1}|v202[0-2]\\d{2}-\\d{1}|v20230[1-8](?:-(?!09-01)\\d{1})?)/replicated/monitoring/:slug*",
    destination: "/terraform/enterprise/:version/admin/infrastructure/:slug*",
    permanent: true,
  },
  // for those who saved the page directly
  {
    source: "/terraform/enterprise/admin/infrastructure/logging",
    destination: "/terraform/enterprise/replicated/monitoring/logging",
    permanent: true,
  },
  {
    source: "/terraform/enterprise/admin/infrastructure/monitoring",
    destination: "/terraform/enterprise/replicated/monitoring/monitoring",
    permanent: true,
  },
];
