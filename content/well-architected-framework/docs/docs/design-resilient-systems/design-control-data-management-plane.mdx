---
page_title: Design control, management, and data planes for resilient infrastructure
description: Learn how to design infrastructure that prevents downtime, isolates failures, and scales reliably. Implement architectural patterns for control, data, and management layers.
# START AUTO GENERATED METADATA, DO NOT EDIT
created_at: 2025-12-10T15:14:10-05:00
last_modified: 2026-01-29T10:31:53-06:00
# END AUTO GENERATED METADATA
---

# Design control, management, and data planes for resilient infrastructure

Properly designing your infrastructure helps ensure you have a reliable, secure
platform to run your workloads and store your data. Most infrastructure designs 
use different planes that define how:

- Your systems make decisions.
- Operators interact with the infrastructure and services.
- Workloads execute, and data flows.

Poor design in these planes leads to downtime, security
vulnerabilities, and scaling challenges that impact your ability to
deliver services to your customers.

## What are infrastructure planes

Modern infrastructure operates across three distinct architectural layers, each
serving a specific purpose in your overall system design:

<VideoEmbed url="https://www.youtube.com/watch?v=Ep1QW-wOmgc">
Learn control, management, and data planes with visual explanation of how each layer operates and interacts
</VideoEmbed>

- **Control plane:** Makes decisions about workload placement, routing, service
  health, and system state. Examples include container schedulers and network
  routing services.
- **Management plane:** Provides interfaces for operators and automation to
  configure, monitor, and administer infrastructure. Examples include
  infrastructure-as-code tools, configuration management
  tools, and observability platforms.
- **Data plane:** Executes decisions the control plane makes and moves actual
  application data and traffic. Examples include container runtimes, service
  mesh proxies, and application workloads.
![Diagram showing the relationship between control, management, and data
planes](/img/well-architected-framework/diagram-infrastructure-planes-intro-dark.png#dark-theme-only)
![Diagram showing the relationship between control, management, and data
planes](/img/well-architected-framework/diagram-infrastructure-planes-intro-light.png#light-theme-only)

Logically separating these planes also helps ensure you can follow the principle of
least privilege and separation of duties. When set up properly, separate planes allow you to manage
access to each plane, limiting access to the teams and services that require
access to the resources. Separation of duties and least privilege are foundational practices to
build a [zero trust
infrastructure](/well-architected-framework/secure-systems/infrastructure/zero-trust-security).

## Plan your infrastructure architecture with conceptual design

Designing infrastructure planes requires careful consideration of architecture
patterns, scalability requirements, and organizational constraints. Poor design
in any single plane can cascade failures across your infrastructure,
resulting in downtime, security vulnerabilities, or operational inefficiencies.

The following considerations will help you make informed decisions about your
infrastructure design. When starting your design, focus on conceptual requirements.
Conceptual design decisions focus on your needs, and how it should work, rather
than specific tools or vendors.

- **Identify team responsibilities:** Understand which teams are responsible for
  managing each plane, and the services within each plane. Define clear
  ownership boundaries to avoid confusion during incidents and clearly document
  each teams expertise and experience.
- **Define scaling and reliability requirements:** Consider and test for the
  baseline, average, and peak loads for each service.
- **Establish geographical distribution requirements:** Determine if your
  application requires fault domains within a specific region, multi-region
  scaling, dedicated local instances in each region, and the impact of data
  residency requirements such as GDPR or CPPA.
- **Plan for separation of duties:** Define roles and responsibilities for teams
  managing each plane, and application or service within the plane.
- **Design for high availability:** Ensure each plane, and each service operates
  independently and that you can perform a failover without impacting availability.
- **Identify network segmentation needs:** Logically isolate traffic between
  planes, and services within each plane. Open ports between planes and services
  only as necessary. Ensure services can connect to only the required resources
  to operate.

Document each of the considerations for your infrastructure planes. Having a
well-documented conceptual design helps you make informed decisions during
the logical design phase. Here is an example of how you might document
conceptual requirements and constraints.
![Example requirements and constraints for a conceptual design](/img/well-architected-framework/example-conceptual-design.png)

## Choose the right service types and deployment models

Once you have created a conceptual design, and documented requirements for each
plane, you can consider logical requirements such as the type of services
needed. This stage is slightly deeper than the conceptual design, and focuses on
the capabilities you need to meet your requirements. Do not focus on specific vendors, 
but rather the type of tool or service you need, like whether you need a service mesh, 
load balancer, infrastructure-as-code, configuration management, or a specific type of storage.

Examples of logical design decisions include:

- **Service deployment models:** Consider whether to use managed services,
  self-managed services, or a hybrid approach. For example, do you want to use a
  hyper-scale public cloud provider, a specialized cloud provider,
  software-as-a-service (SaaS), or self-managed platform.

   Managed services improve resilience by reducing operational overhead, but
   require careful consideration to ensure each service meets your availability,
   data locality, security, and disaster recovery requirements.

   - **Data plane:** Hyper-scale public cloud provider with multiple availability
     zones, and self-hosted infrastructure.
   - **Control plane:** Managed container services and virtual machine services.
   - **Management plane:** Software-as-a-Service (SaaS) by default, fallback to
     self-managed services on a hyper-scale public cloud provider as needed.

- **Redundancy and failover:** Determine if you need to deploy services within each 
     plane in active-active or active-passive configuration, how
     many instances of each service you need, and whether the services are
     stateful or stateless.

- **Distribution strategy:** Do you need to deploy services in a single region,
  or multiple regions? If you require services spread across multiple regions,
  consider how services synchronize data, the effect on latency, and data
  locality considerations such as GDPR or CPPA.

- **Service integration:** How will you run and manage individual services? How
  will you ensure services can communicate securely and reliably while building
  a network segmentation strategy? How will you deploy, update, and manage each
  service and its configuration?

- **Observability:** Define the type of monitoring, logging, and tracing needed to
  ensure visibility into each plane and service.

Map each logical design decision back to a conceptual requirement or
constraint. Documenting your logical design helps you when making vendor or
feature based design considerations during the physical design phase.
Here is an example of how you might document logical requirements and constraints.
![Example requirements and constraints for a logical design](/img/well-architected-framework/example-logical-design.png)

## Select specific tools and vendors for implementation

Physical design builds off the conceptual and logical design requirements and
constraints. When writing the physical design, you select specific services,
tools, and vendors to implement your infrastructure planes. Ensure that each
selected service meets your documented requirements and constraints. For example:

- **Service Deployment Model Implementation:**

   - **Data plane:** Amazon Web Services, Azure, Google Cloud, or IBM Cloud for
     compute and storage services, and KVM-based virtualization for
     specialized self-hosted infrastructure.
   - **Control plane:** Managed Kubernetes services (EKS, GKE, AKS) for hyper-scale
     platforms and OpenShift for self-hosted container orchestration.
   - **Management plane:** GitHub for version control and CI/CD, HCP Terraform for
     infrastructure-as-code automation, and Datadog for observability.
   
- **Redundancy and Failover Architecture:** Determine the number of nodes for
  each service, what features you will enable, and define what
  roles have access to each service. For example, deploy a 5-node Vault cluster
  in the management plane, managed by Nomad, each in a unique availability zone
  with auto-unseal through a KMS, and Vault Agent nodes deployed in the
  data plane as a side car for each containerized application.

- **Geographic distribution strategy:** Designate the us-east availability zone
  as the primary region for US-based customers with an active-active deployment
  pattern, while eu-west serves as a dedicated region for GDPR-compliant
  workloads requiring local data storage and processing.

- **Service integration and communication patterns:** Deploy Consul service mesh
  with Envoy proxies to handle all container-to-container communication,
  enforcing mutual TLS (mTLS) for all inter-service traffic. Enforce network 
  segmentation through VPCs with dedicated public, private, and data
  subnets, with security groups allowing only specific ports like 8500 for
  Consul HTTP API, 8200 for Vault access, and application-specific ports.

- **Observability and monitoring capabilities:** Implement Datadog APM for
  application performance monitoring while running self-hosted Prometheus for
  infrastructure metrics with 15-day retention. Datadog Log Management handles 
  centralized logging with structured JSON format and 30-day
  retention, enabling log-based alerting for error conditions. Integrate
  PagerDuty with team-specific on-call schedules and escalation policies, while
  using Slack for non-critical alert notifications. Service Level Objectives
  (SLOs) target 99.9% uptime for production services and 99% for staging
  environments, with automated SLO tracking configured in Datadog dashboards.

Each physical design decision directly supports your logical design
requirements and constraints, providing specific vendor selections,
configuration details, and deployment parameters that your teams can implement.
Here is an example of how you might document physical requirements and constraints.
![Example requirements and constraints for a physical
design](/img/well-architected-framework/example-physical-design.png)

## Implement infrastructure planes with HashiCorp tools

HashiCorp provides several tools and services that you can use across the
control, management, and data planes.

### Control plane implementation

Consul and Nomad are the primary tools in the control plane.

Consul handles service networking, service discovery, health checks, and service mesh control.

- Run Consul servers in clusters of 3, 5, or 7 nodes using Raft consensus for strong consistency.
- Maintain service catalog and health status for automatic failure detection.
- Define service-to-service communication policies through intentions.
- Support multi-datacenter federation enabling global service discovery across regions.

Nomad provides orchestration, cluster state, and scheduling decisions.

- Deploy 3 or 5 server clusters for high availability with automatic leader election.
- Evaluate job constraints and bin-pack workloads across available resources.
- Detect task failures and automatically reschedule to healthy nodes.
- Support multi-region deployments with job federation and locality-aware scheduling.

## HashiCorp resources

- [Get started with Consul on Kubernetes](/consul/tutorials/get-started-kubernetes)
- [Get started with Nomad](/nomad/tutorials/get-started)
- [Migrate services to a service mesh](/consul/tutorials/secure-services/permissive-mtls)
- [Migrate monolithic applications to microservices with Nomad and Consul](/nomad/tutorials/migrate-monolith/monolith-migration-overview)

### Management plane implementation

Terraform, Vault, and Boundary are the primary tools in the management plane.

Terraform provisions infrastructure across control and data planes:

- Define infrastructure as declarative code, eliminating manual configuration drift.
- Deploy consistently across AWS, Azure, GCP, and on-premises platforms from a single workflow.
- Enforce organizational policies with Sentinel before infrastructure changes reach production.
- Track all changes through version control with automated plan approval workflows.

<VideoEmbed url="https://www.youtube.com/watch?v=_45W3Z8XWL4">
Learn how Terraform provisions and manages cloud resources across AWS, Azure, and GCP with infrastructure as code.
</VideoEmbed>

Vault eliminates static credentials through centralized secrets management:

- Generate dynamic, time-bound credentials for databases and cloud platforms on-demand.
- Automatically revoke access when applications or users no longer need it.
- Provide encryption-as-a-service without exposing keys to applications.

Boundary provides secure infrastructure access without VPNs or bastion hosts:

- Grant identity-based access to specific resources without exposing network topology.
- Broker credentials from Vault so users never handle long-lived secrets.
- Record all sessions for compliance audits and incident investigation.
- Support SSH, RDP, Kubernetes, databases without managing certificates or keys.

You can choose to run both Vault and Boundary in highly available clusters using
the [HashiCorp Cloud Platform (HCP)](https://portal.cloud.hashicorp.com/sign-in)
to reduce operational overhead.

Additional HashiCorp tools that also operate in the management plane include:

- HCP Vault Radar to scan for secrets in your version control system and
  communication tools like Slack and Confluence.
- HCP Waypoint for developer self-service deployment workflows, enabling
  consistent deployments while masking infrastructure complexity.
- Packer for automated machine image creation and HCP Packer to manage
  artifacts and track metadata.

## HashiCorp resources

- [Get started with Boundary](/boundary/tutorials/get-started-hcp)
- [Connect to Kubernetes using Boundary](/boundary/tutorials/kubernetes-connect)
- [Get started with Terraform](/terraform/tutorials/cloud-get-started)
- [Build a GitOps pipeline with Terraform](/terraform/tutorials/applications/gitops)
- [Get started with Vault](/vault/tutorials/get-started)
- [Encrypt data with Vault](/vault/tutorials/encryption-as-a-service)
- [Get started with HCP Vault Radar](/hcp/tutorials/get-started-hcp-vault-radar)
- [Get started with HCP Waypoint](/waypoint/tutorials/hcp-waypoint)
- [Build a self-service developer platform with HCP Waypoint](/waypoint/tutorials/self-service/build-self-service-idp)

### Data plane implementation

The primary tools used in the data plane are Consul agents, Vault agent,
Nomad clients, and Boundary workers. These extensions run in the data plane, and
connect back, and execute instructions from the control and management planes.

Consul agents run on each data plane node to enable service connectivity:

- Automatically register services and perform local health checks without application changes.
- Provide DNS-based service discovery so applications use names instead of IP addresses.
- Proxy traffic through Envoy sidecars with automatic mTLS encryption between all services.

<VideoEmbed url="https://www.youtube.com/watch?v=rcX5lCUKO9w">
Learn how Consul service mesh enables secure service communication with automatic mTLS encryption and service discovery.
</VideoEmbed>

Nomad clients execute workloads assigned by the control plane:

- Run containerized, virtualized, or binary workloads using pluggable task drivers.
- Report node capacity and health enabling intelligent workload placement.
- Automatically register running services with Consul for immediate discovery.

Vault agent and the Vault Secrets operator (VSO) run in the data plane. You can also
configure the Vault agent to handle authentication, eliminating the need for
each service to authenticate with Vault.

- Retrieve and cache secrets from Vault with Vault agent and VSO.
- Handle dynamic secret renewal and rotation.
- Offload authentication complexity from application code with Vault agent.

<VideoEmbed url="https://www.youtube.com/watch?v=G7Fvo4UBaHI">
Learn how the Vault Secrets Operator (VSO) automates secure secrets in Red Hat OpenShift, both static and dynamic rotating credentials, natively in the OpenShift UI and without changing your workflows.
</VideoEmbed>

Boundary workers, managed by the Boundary controller, run in the data plane to
facilitate secure access to services.

- Establish secure tunnels for user access to target resources.
- Handle session management and recording.
- Retrieve dynamic credentials from Vault for just-in-time access.

## HashiCorp resources

- [Manage Boundary workers](/boundary/tutorials/hcp-administration/hcp-manage-workers)
- [Retrieve secrets for Kubernetes workloads with Vault agent](/vault/tutorials/vault-agent/agent-kubernetes)
- [Create Kubernetes native secrets with the Vault Secrets Operator](/vault/tutorials/integrate-kubernetes-hcp-vault-dedicated/kubernetes-vso-hcp-vault)
- [Scale your Nomad cluster with horizontal autoscaling](/nomad/tutorials/autoscaler/horizontal-cluster-scaling)

## Next steps

In this guide you learned about why it is important to properly design your
control, management, and data planes. Following the conceptual, logical, and
physical design process helps ensure that your infrastructure meets your
organization's requirements, and helps you focus on requirements rather than
vendor tools or features. Design control, management, and data planes is part of
the [Design resilient
systems](/well-architected-framework/design-resilient-systems) pillar.

After you have completed your design, review the Secure control, management, and
data planes guide to ensure that your design meets security best practices.
