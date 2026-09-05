# HashiCorp Validated Designs

HashiCorp Validated Designs (HVDs) provide practitioners with opinionated, prescriptive guidance for deploying and operating HashiCorp products in production. We build this guidance from the field experience of Solutions Engineers and Solutions Architects working with enterprise customers across a wide range of environments.

Value Engineering in R&D manages all HVD content. For questions, reach out in **#proj-hvd** on Slack.

## Guide types

Each product has up to three guides, organized by what you are trying to do:

| Guide | Audience | What it covers |
|---|---|---|
| **Installation Guide** | Platform team | Reference architecture, design decisions, and deployment — everything needed to stand up the system correctly the first time |
| **Administration Guide** | Platform or operations team | Ongoing operation of a running deployment — tasks performed after go-live to keep the system healthy, secure, and up to date |
| **User Guide** | Teams consuming the platform | Working with the system day-to-day — the workflows and use cases for teams using the platform to do their jobs |

## Products covered

| Product | Validated Designs |
|---|---|
| Boundary Enterprise | [developer.hashicorp.com/validated-designs/boundary](https://developer.hashicorp.com/validated-designs/boundary) |
| Consul Enterprise | [developer.hashicorp.com/validated-designs/consul](https://developer.hashicorp.com/validated-designs/consul) |
| Nomad Enterprise | [developer.hashicorp.com/validated-designs/nomad](https://developer.hashicorp.com/validated-designs/nomad) |
| Terraform Enterprise | [developer.hashicorp.com/validated-designs/terraform](https://developer.hashicorp.com/validated-designs/terraform) |
| Vault Enterprise | [developer.hashicorp.com/validated-designs/vault](https://developer.hashicorp.com/validated-designs/vault) |
| Vault Radar | [developer.hashicorp.com/validated-designs/vault-radar](https://developer.hashicorp.com/validated-designs/vault-radar) |

## Validated Patterns

HashiCorp Validated Patterns are concise, outcome-focused guides that explain how to achieve a specific result with HashiCorp products — for example, how to use Vault secrets in Terraform runs, or how to integrate a partner product. Unlike HVD guides, patterns are single-page and assume the reader already knows the products involved.

Published patterns are available at [developer.hashicorp.com/validated-patterns](https://developer.hashicorp.com/validated-patterns).

Contributors submit patterns through the [VE Tech Catalog](https://github.ibm.com/ve-tech-catalog/library). The HVD core team triages submissions and promotes them into the appropriate Administration or User Guide in this repo. See [CONTRIBUTING.md](CONTRIBUTING.md) for the submission process.

## HVD Modules

HVD Modules are Terraform modules that codify the reference architectures defined in the HVD Installation Guides. They deploy HashiCorp products into cloud environments in a repeatable, reliable, and production-grade way. Modules are published in the [Terraform Registry](https://registry.terraform.io) under the `hashicorp` namespace.

Changes to HVD Modules are made in their own repositories and do not typically require a content update in this repo. For questions about modules, use **#talk-hvd-modules** on Slack.

### Module coverage

| Product | AWS | Azure | GCP |
|---|---|---|---|
| Terraform Enterprise (virtual machines) | [aws](https://registry.terraform.io/modules/hashicorp/terraform-enterprise-hvd/aws/latest) | [azurerm](https://registry.terraform.io/modules/hashicorp/terraform-enterprise-hvd/azurerm/latest) | [google](https://registry.terraform.io/modules/hashicorp/terraform-enterprise-hvd/google/latest) |
| Terraform Enterprise (EKS / AKS / GKE) | [aws](https://registry.terraform.io/modules/hashicorp/terraform-enterprise-eks-hvd/aws/latest) | [azurerm](https://registry.terraform.io/modules/hashicorp/terraform-enterprise-aks-hvd/azurerm/latest) | [google](https://registry.terraform.io/modules/hashicorp/terraform-enterprise-gke-hvd/google/latest) |
| Vault Enterprise | [aws](https://registry.terraform.io/modules/hashicorp/vault-enterprise-hvd/aws/latest) | [azurerm](https://registry.terraform.io/modules/hashicorp/vault-enterprise-hvd/azurerm/latest) | [google](https://registry.terraform.io/modules/hashicorp/vault-enterprise-hvd/google/latest) |
| Consul Enterprise | [aws](https://registry.terraform.io/modules/hashicorp/consul-enterprise-hvd/aws/latest) | [azurerm](https://registry.terraform.io/modules/hashicorp/consul-enterprise-hvd/azurerm/latest) | [google](https://registry.terraform.io/modules/hashicorp/consul-enterprise-hvd/google/latest) |
| Boundary Enterprise Controller | [aws](https://registry.terraform.io/modules/hashicorp/boundary-enterprise-controller-hvd/aws/latest) | [azurerm](https://registry.terraform.io/modules/hashicorp/boundary-enterprise-controller-hvd/azurerm/latest) | [google](https://registry.terraform.io/modules/hashicorp/boundary-enterprise-controller-hvd/google/latest) |
| Boundary Enterprise Worker | [aws](https://registry.terraform.io/modules/hashicorp/boundary-enterprise-worker-hvd/aws/latest) | [azurerm](https://registry.terraform.io/modules/hashicorp/boundary-enterprise-worker-hvd/azurerm/latest) | [google](https://registry.terraform.io/modules/hashicorp/boundary-enterprise-worker-hvd/google/latest) |
| Nomad Enterprise | [aws](https://registry.terraform.io/modules/hashicorp/nomad-enterprise-hvd/aws/latest) | [azurerm](https://registry.terraform.io/modules/hashicorp/nomad-enterprise-hvd/azurerm/latest) | — |

## Repository structure

```txt
content/validated-designs/
├── data/
│   └── docs-nav-data.json      # Sidebar navigation for all HVD content
├── docs/
│   ├── docs/                   # All routed MDX content pages
│   │   ├── <product>/
│   │   │   ├── installation-guide/
│   │   │   ├── administration-guide/
│   │   │   └── user-guide/
│   │   ├── index.mdx           # Landing page placeholder
│   │   ├── hvd-2.0-release.mdx # Release notes for HVD 2.0 restructure
│   │   ├── hvd-pdf-guides.mdx  # PDF download links for offline use
│   │   └── validated-patterns.mdx
│   └── partials/               # Shared MDX fragments included across guides
├── img/                        # Diagram image assets organized by product
└── pdf/                        # Pre-built PDF versions of every guide
```

## How content is published

Content in this directory is built and served as part of [web-unified-docs](https://github.com/hashicorp/web-unified-docs) and rendered at [developer.hashicorp.com/validated-designs](https://developer.hashicorp.com/validated-designs).

## Feedback

To report an issue with HVD content or suggest an improvement, open a GitHub issue using the [HVD feedback template](https://github.com/hashicorp/web-unified-docs/issues/new?template=hvd-feedback.yml).
