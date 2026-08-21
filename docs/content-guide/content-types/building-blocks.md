# Building blocks

Assemble pages using a combination of introductory blocks and body blocks.

Use discretion when placing introductory content into separate blocks. You may be
able to merge background and overview information into a single introduction
block, rather than segmenting the information into single-sentence blocks, if you
can integrate the information without making the content cumbersome.

This page collects examples of each block. For guidance on which blocks a given
page needs and in what order, refer to the relevant page in
[content-types/](.).

## Introductory blocks

There are several types of introductory blocks that you can place at the
beginning of your topic. Introductory blocks provide contextual information so
that readers can decide if the topic is applicable.

There are several types of introductory blocks that you can place at the beginning of your topic. Introductory blocks provide contextual information so that readers can decide if the topic is applicable. Use one or more of the following introductory blocks:

  * [Description](#description)
  * [Introduction](#introduction)

### Description

The first section is the description block. It introduces the topic or topic area that the page is about and clearly states the purpose of the page. **The description block is required for all page types**.

**Aim for approximately 60 words to meet best practices for SEO and GEO**. If you need additional space to introduce the topic, add background information, or provide an overview of the procedures that the topic contains, add an introduction section.

We recommend using overt language that states the purpose, for example:

> This topic describes how to register a service with Consul.

Explicitly stating the purpose helps readers and AIs determine if they have found the correct topic. If the purpose is implied, you can exclude language that explicitly states the purpose and describe the topic directly.

Add links in the description to connect closely related topics such as usage and configuration reference pages associated with a single functionality.

The contents of the description block should align with the meta description field for the markdown file. The meta descriptions are optimized for search and contain keywords, phrases, acronyms, and alternate spellings that are not always suitable for displaying on the page. Description blocks take the page title as the heading.

#### Examples

The following description explicitly states the purpose of the topic of a usage topic and links to an overview of the topic area:

```mdx
# Services

This topic describes how to define services so that they can be discovered by other services.
Refer to [Services Overview](/consul/docs/services/services) for additional information.

```
Some topic descriptions do not require an overt statement. The following example describes the component, as opposed to the topic, because the topic is implicit:

```mdx
# Consul Dataplane CLI Reference

The `consul-dataplane` command interacts with the binary for [simplified service mesh with
Consul Dataplane](/consul/docs/k8s/dataplane). Use this command to install Consul Dataplane,
configure its Envoy proxies, and secure Dataplane deployments.

```
The following example shows a combined description-introduction:

```mdx
# Manage cluster peering connections

This topic describes how to manage cluster peering connections using the CLI, the HTTP API,
and the UI.

After you establish a cluster peering connection, you can get a list of all active peering
connections, read a specific peering connection's information, and delete peering connections.

For Kubernetes-specific guidance for managing cluster peering connections, refer to [Manage
cluster peering connections on
Kubernetes](/consul/docs/k8s/connect/cluster-peering/usage/manage-peering).

```
### Introduction

The introduction block serves one or more of the following purposes:

  1. To provide additional context or background about the topic.

  2. To summarize main points described on the page.

  3. To help users understand how the topic helps them achieve their goals.

Introductions have H2 (##) headings and immediately follow the description. You can omit the introduction section when the page description clearly describes the topic. Follow the hierarchical style guidance for formatting nested content blocks.

Use one of the following heading types for the introduction section:

| **Heading** | **Description** | **Example** |
| --- | --- | --- |
| Introduction | The general introduction provides additional context to help readers understand why the topic is important. For general-purpose introductions, use an "Introduction" heading. | [Introduction](https://developer.hashicorp.com/hcp/docs/packer/manage/audit-logs#introduction) to enabling audit log streaming in HCP Packer |
| Background | For topics that require significant background knowledge, use the "Background" heading for the introduction. Background-oriented introductions focus on how the topic relates to other processes or concepts, as opposed to highlighting its importance. As the group of related topics evolve, information from the background section may be ported to an overview page. | [Background](https://developer.hashicorp.com/consul/docs/deploy/server/vm/bootstrap) for bootstrapping a Consul server |
| Overview | Use an "Overview" heading to orient users to the process the page describes. Overviews focus on summarizing the contents of the topic, as opposed to highlighting its importance or providing background information. | [Overview](https://developer.hashicorp.com/terraform/mcp-server/deploy/local#overview) of deploying a local MCP server |

#### Examples

In the following example, the introduction describes why the topic is important:

```mdx
## Introduction

The Consul DNS is the primary interface for querying records when Consul service mesh is disabled
and your network runs in a non-Kubernetes environment. The DNS enables you to look up services and
nodes registered with Consul using terminal commands instead of making HTTP API requests to Consul.
Refer to the [Discover Consul Nodes and Services Overview](/consul/docs/services/discovery/dns-overview)
for additional information.

```
In the following example, the introduction is has "Background" as the heading text because it includes additional background information, such as why the prerequisite may be difficult to meet:

```mdx
## Background

When setting up a multi-datacenter Consul cluster, operators must ensure that all Consul servers in
every datacenter can connect directly to each other over their WAN-advertised network address. The
following image shows the required connections traditionally required to deploy a multi-datacenter
cluster:

![WAN federation without mesh gateways]()

Operators that set up the virtual machines or containers hosting the servers perform additional tasks
to ensure the necessary routing and firewall rules are in place to allow the servers to speak to each
other over the WAN.

This prerequisite can be difficult or undesirable to meet. For example, the datacenters may exist in
multiple Kubernetes clusters that have overlapping pod IP subnets or may exist in different cloud
provider VPCs that have overlapping subnets. Additionally, network security teams may not approve of
granting so many firewall rules. When using platform autoscaling, keeping rules up to date becomes
untenable.

Operators can simplify their WAN deployment and minimize the exposed security surface area by joining
datacenters using mesh gateways. The following image shows the connections in a multi-datacenter cluster
federated with a mesh gateway:

![WAN federation with mesh gateways]()

```
Because the following example summarizes the topic, the author used an "Overview" heading for the introduction:

```mdx
## Overview

The following procedure describes the general workflow:

1. Create Terraform configuration files for the necessary components:
   - ECS task definition: Use the HashiCorp Terraform modules to create the ECS task definition.
   - ECS service: Use the aws_ecs_service resource to create an ECS service that schedules service mesh
   tasks to run on ECS.
1. Run Terraform to deploy the resources in AWS

If you want to operate Consul in production environments, follow the instructions in the Secure Configuration
documentation. The instructions describe how to enable ACLs and TLS and gossip encryption, which provide
network security for production-grade deployments.

```

## Body blocks

You can use one or more body blocks to create the main body of your topics. Body blocks deliver the instructions or describe the concepts or reference material. In most cases, you should use only one type of body block to create your content. This is to ensure that the topic is focused in terms of content and form. Use the following body blocks:

  * [Requirements](#requirements)
  * [Instructions](#instructions)
  * [Configuration model](#configuration-model)
  * [Complete configuration](#complete-configuration)
  * [Specification](#specification)
  * [Examples](#examples)
  * [Next steps](#next-steps)
  * [Workflow](#workflow)
  * [General subtopic](#general-subtopic)
  * [Guidance](#guidance)
  * [Table](#table)

### Requirements

Add a **requirements** or **prerequisites** block to describe systems, software, permissions, or other entities practitioners must implement to complete the task as described in the topic. Describe prerequisites, constraints, or any other conditions or operating parameters in this block.

By organizing the requirements necessary to perform the operations or sub-operations into a single location, you help reader prepare their environments to perform the tasks described in the topic.

  * Add requirements to usage pages.

  * Place requirements between the overview and instructions.

  * **Requirements** is the general category, but you can use **Prerequisites** for the heading when it is more appropriate for the context. Requirements describe conditions that are required to proceed, whereas prerequisites describe steps you must take prior to proceeding.

  * Group related requirements into H3 (###) headings under the main **Requirements** H2 (##) heading.

#### Examples

```mdx
## Requirements

You must meet the following requirements to use cluster peering:

- Consul v1.14.1 or higher
- Services hosted in admin partitions on separate datacenters

If you need to make services available to an admin partition in the same datacenter, do not use cluster peering. Instead, use the `exported-services` configuration entry to make service upstreams available to other admin partitions in a single datacenter.

## Prerequisites

- Linking a self-managed cluster is supported in Consul v1.14.7, v1.15.3, and later.
- The `consul-k8s` CLI supports linking clusters to HCP in v1.0.7, v1.1.2, and later.

## Requirements

- `consul-k8s` v1.2.0 or newer.
- Consul service mesh must be enabled. Refer to [How does Consul Service Mesh Work on Kubernetes]() for instructions.
- Proxies must be configured to run in transparent proxy mode.
- To query virtual DNS names, you must use Consul DNS.
- To query the discovery chain using KubeDNS, the service resolver must be in the same partition as the running service.

```
### Instructions

Instructions describe the actions practitioners must take to complete a discrete task. Place the instructions after the requirements section.

Some topics provide instructions as a single list of steps, while some topics describe multiple sub-procedures, each with their own list of steps. Logically group related steps into sub-procedures.

  * Use ordered lists. It is easier to consume step-by-step information, as well as reference previous steps, when it is formatted into numbered lists.

  * When doing so improves clarity, explicitly introduce the purpose of the steps. Add a results or outcome statement at the end of the procedure as necessary.

  * Place elements, such as example commands or additional explanation about a step, on new lines in the same step.

  * Link to the relevant reference documentation associated with a step in the procedure.

  * Describe a sequence of actions that result in a discrete output. The output may be a configuration end-state, artifact, or input for another action.

  * Use examples to show how to perform a step, such as running commands and calling API endpoints. Do not include example configurations, which should be placed in configuration reference pages.

#### Examples

```mdx
## Configure global Envoy passthrough settings

To define global passthrough settings for all Envoy proxies, create a proxy defaults configuration entry and specify default settings, such as access log configuration.
Service defaults configuration entries override proxy defaults and individual service configurations override both configuration entries.

1. Create a proxy defaults configuration entry and specify the following parameters:
    - `Kind`: Must be set to proxy-defaults
    - `Name`: Must be set to global
1. Configure any additional settings you want to apply to all proxies. Refer to Proxy defaults configuration entry reference for details about all settings available in the configuraiton entry.
1. Apply the configuration by either calling the `/config` API endpoint or running the `consul config write` CLI command. The following example writes a proxy defaults configuration entry from a local HCL file using the CLI:

   ```shell-session
   $ consul config write proxy-defaults.hcl
   ```

## Configure dynamic traffic between peers

To configure L7 traffic management behavior in deployments with cluster peering connections, complete the following steps in order:

1. Define the peer cluster as a failover target in the service resolver configuration.

  The following examples update the [`service-resolver` configuration entry](/consul/docs/connect/config-entries/service-resolver) in `cluster-01` so that Consul redirects traffic intended for the `frontend` service to a backup instance in peer `cluster-02` when it detects multiple connection failures.

  <CodeTabs tabs={[ "HCL", "JSON", "YAML" ]}>

  ```hcl
  Kind           = "service-resolver"
  Name           = "frontend"
  ConnectTimeout = "15s"
  Failover = {
    "*" = {
      Targets = [
        {Peer = "cluster-02"}
      ]
    }
  }
  ```

  ```json
  {
      "ConnectTimeout": "15s",
      "Kind": "service-resolver",
      "Name": "frontend",
      "Failover": {
          "*": {
              "Targets": [
                  {
                      "Peer": "cluster-02"
                  }
              ]
          }
      },
      "CreateIndex": 250,
      "ModifyIndex": 250
  }
  ```

  ```yaml
  apiVersion: consul.hashicorp.com/v1alpha1
  kind: ServiceResolver
  metadata:
    name: frontend
  spec:
    connectTimeout: 15s
    failover:
      '*':
        targets:
          - peer: 'cluster-02'
            service: 'frontend'
            namespace: 'default'
  ```

  </CodeTabs>

1. Define the desired behavior in `service-splitter` or `service-router` configuration entries.

  The following example splits traffic evenly between `frontend` services hosted on peers by defining the desired behavior locally:

  <CodeTabs tabs={[ "HCL", "JSON", "YAML" ]}>

  ```hcl
  Kind = "service-splitter"
  Name = "frontend"
  Splits = [
    {
      Weight  = 50
      ## defaults to service with same name as configuration entry ("frontend")
    },
    {
      Weight  = 50
      Service = "frontend-peer"
    },
  ]
  ```

  ```json
  {
    "Kind": "service-splitter",
    "Name": "frontend",
    "Splits": [
      {
        "Weight": 50
      },
      {
        "Weight": 50,
        "Service": "frontend-peer"
    }
  ]
  }
  ```

  ```yaml
  apiVersion: consul.hashicorp.com/v1alpha1
  kind: ServiceSplitter
  metadata:
    name: frontend
  spec:
    splits:
      - weight: 50
        ## defaults to service with same name as configuration entry ("frontend")
      - weight: 50
        service: frontend-peer
  ```

  </CodeTabs>

1. Create a local `service-resolver` configuration entry named `frontend-peer` and define a redirect targeting the peer and its service:

  <CodeTabs tabs={[ "HCL", "JSON", "YAML" ]}>

  ```hcl
  Kind           = "service-resolver"
  Name           = "frontend-peer"
  Redirect {
    Service = frontend
    Peer = "cluster-02"
  }
  ```

  ```json
  {
    "Kind": "service-resolver",
    "Name": "frontend-peer",
    "Redirect": {
      "Service": "frontend",
      "Peer": "cluster-02"
    }
  }
  ```

  ```yaml
  apiVersion: consul.hashicorp.com/v1alpha1
  kind: ServiceResolver
  metadata:
    name: frontend-peer
  spec:
    redirect:
      peer: 'cluster-02'
      service: 'frontend'
  ```

  </CodeTabs>

## Start the proxy

Envoy requires a bootstrap configuration file before it can start. Use the `consul connect envoy` command to create the Envoy bootstrap configuration and start the proxy service. Specify the ID of the proxy you want to start with the -proxy-id option.

The following example command starts an Envoy proxy for the web-proxy service:

```shell-session
$ consul connect envoy -proxy-id=web-proxy
```

For details about operating an Envoy proxy in Consul, refer to the [Envoy proxy reference](/connect/proxies/envoy).

```
### Configuration model

The configuration model is a table of contents that lists constructs available in
the configuration artifact. It links to detailed descriptions in the
specification and communicates hierarchical information.

Refer to
[Configuration model](structured-configuration-reference.md#configuration-model)
for full formatting guidance, including the HCL, JSON, YAML, and infrastructure
model templates.

### Complete configuration

The complete configuration block contains a single, fully-configured code block for a configuration item. It is intended to provide the information communicated in the configuration model in a form that readers can copy, paste, and update with values for their environments.

  * The complete configuration is for demonstrative purposes only and does not communicate real world scenarios or logical patterns for more complicated configurations. Those configuration examples should be implemented in the “Example configurations” section under clearly labeled headings.

  * This configuration communicates hierarchy and data types implicitly and uses comments to bring key information about required fields and mutually exclusive configuration items into the code editor when copied and pasted.

### Specification

The specification is a flattened list of the elements described in the
configuration model. It contains the details of how to configure each element.

Refer to
[Specification](structured-configuration-reference.md#specification) for full
formatting guidance, including dot-notation headings, values, descriptions, and
tables.

### Examples

The examples section contain example configurations that enable you to achieve a specific use case.

  * Add examples to reference topics where a user would need to produce their own artifact or perform an operation, such as configuration and CLI references.

  * The Examples section is an H2 level block, but each example is an H3 level. Use a descriptive heading for each use case that adheres to the style guide.

  * Preface each example with a detailed and descriptive sentence or paragraph that states what the example does. Callout configuration elements to help users understand which fields drive the behaviors.

  * Examples aren’t exhaustive. When additional conditions are necessary, describe them when introducing the example and link to appropriate topics as necessary.

#### Examples

The following example shows and examples block for a structured configuration reference page:

```mdx
## Examples

The following examples demonstrate common service router configuration patterns for specific use cases.

### Path prefix matching

The following example routes HTTP requests for the `web` service to a service named `admin` when they have `/admin` at the start of their path.

<Tabs>
<Tab heading="HCL" group="hcl">

```hcl
Kind = "service-router"
Name = "web"
Routes = [
  {
    Match {
      HTTP {
        PathPrefix = "/admin"
      }
    }

    Destination {
      Service = "admin"
    }
  },
]
```

</Tab>

<Tab heading="YAML" group="yaml">

```yaml
apiVersion: consul.hashicorp.com/v1alpha1
kind: ServiceRouter
metadata:
  name: web
spec:
  routes:
    - match:
        http:
          pathPrefix: /admin
      destination:
        service: admin
```

</Tab>

<Tab heading="JSON" group="json">

```json
{
  "Kind": "service-router",
  "Name": "web",
  "Routes": [
    {
      "Match": {
        "HTTP": {
          "PathPrefix": "/admin"
        }
      },
      "Destination": {
        "Service": "admin"
      }
    }
  ]
}
```

</Tab>
</Tabs>

```
The following example shows an examples block for tabular reference information. The example demonstrates a part of a hierarchical configuration item, but the specific part of the configuration that the example shows contains elements in the same hierarchical plane:

```mdx
### Set the default protocol

In the following example, protocol for the `web` service in the `default` namespace is set to `http`:

<CodeTabs tabs={[ "HCL", "Kubernetes YAML", "JSON" ]}>

```hcl
Kind      = "service-defaults"
Name      = "web"
Namespace = "default"
Protocol  = "http"
```

```yaml
apiVersion: consul.hashicorp.com/v1alpha1
kind: ServiceDefaults
metadata:
  name: web
spec:
  protocol: http
```

```json
{
  "Kind": "service-defaults",
  "Name": "web",
  "Namespace": "default",
  "Protocol": "http"
}
```

</CodeTabs>

```
### Next steps

The next steps block is a collection of resources at the end of a usage page that directs users to related topics. By itself, the instructions in a usage page may not be the end result that the practitioner wants. Link to additional content in the next steps block to help practitioners achieve their broader goals. You can either format next steps as blocks of prose or as an ordered or unordered list.

The next steps block is optional, so if you believe that the related tasks are obvious based on the audience profile, context of the page, or the page’s position in the navigation, omit the next steps block. This is to reduce the maintenance burden if topics move or if processes become consolidated in later versions of the product.

#### Examples

```mdx
## Next steps

After establishing a cluster peering connection, you can further secure your deployment by [configuring an IP allowlist](/hcp/docs/consul/secure/ip-allowlist) to limit cluster access.
HCP Consul's cluster peering allowlist supports three IP address ranges on the allowlist at one time.

You can also view active cluster peering connections with [HCP Consul Central](/hcp/docs/consul/monitor/consul-central).

 ## Next steps

 After applying traffic permissions and validating service-to-service communication within your service mesh, you can manage traffic between multi-port services, filter traffic between ports based on L7 header information, or direct match HTTP query parameters to a specific port.

 Refer to the following pages for more information:

 - [Split traffic between services](/consul/docs/k8s/multiport/traffic-split)
 - [gRPC route example: route traffic by matching header](/consul/docs/k8s/multiport/reference/httproute#route-traffic-by-matching-header)
 - [HTTP route example: route traffic by matching header](/consul/docs/k8s/multiport/reference/httproute#route-traffic-by-matching-header)
 - [HTTP route example: route traffic by matching header and query parameter](/consul/docs/k8s/multiport/reference/httproute#route-traffic-by-matching-header-and-query-parameter)

```
### Workflow

Add a **workflow** or **workflows** section to overview pages to summarize the actions a practitioners must perform to achieve the goal described in the overview. Workflows are core sections that explain how the information in the related usage and reference topics connect.

When creating an overview page in the well-architected framework (WAF), a workflow block may not be necessary or even feasible. This is because high-level procedures may not be linear in WAF as they are in product documentation.

  * It may not always be possible, but describe workflows in three phases according to the [_Rule of three_ writing principle](https://github.com/hashicorp/consul/blob/main/website/content/docs/connect/config-entries/service-router.mdx) when possible. The rule of three principle is a known device for helping learners digest information.****

  * Don’t reproduce details from the relevant usage topics. Instead, provide a reason for the task and link to the topic.

#### Examples

```mdx
## Workflow

For service discovery, the core Consul workflow for services consists of three stages:

1. **Define services and health checks**: A service definition lets you define various aspects of the service, including how it is discovered by other services in the network. You can define health checks in the service definitions to verify the health of the service. Refer to [Define Services](/consul/docs/services/usage/define-services) and [Define Health Checks](/consul/docs/services/usage/checks) for additional information.

1. **Register services and health checks**: After defining your services and health checks, you must register them with a Consul agent. Refer to [Register Services and Health Checks](/consul/docs/services/usage/register-services-checks) for additional information.

1. **Query for services**: After registering your services and health checks, other services in your network can use the DNS to perform static or dynamic lookups to access your service. Refer to [DNS Usage Overview](/consul/docs/services/discovery/dns-overview) for additional information about the different ways to discover services in your datacenters.

## Workflow

To get started with HashiCorp-managed clusters, complete the following tasks in order:

1. Create an HVN and connect it to your cloud environment. This task prepares your network so that you can establish communication between the Consul servers, which are hosted in a HashiCorp-managed environment, and your services, which are hosted in a user-managed environment. Refer to [Create and Manage an HVN](/hcp/docs/hcp/network/hvn-aws/hvn-aws) for more information.
1. Use HCP Consul to [create a HashiCorp-managed cluster](/hcp/docs/consul/hcp-managed/create). You can choose between using a guided UI workflow or generating an end-to-end Terraform configuration.
1. Get credentials and URLs to [access the cluster](/hcp/docs/consul/hcp-managed/access). HCP generates an admin token that you can use to view the Consul UI or make calls to the Consul HTTP API.
1. Depending on whether you use VMs or Kubernetes, [deploy Consul clients](/hcp/docs/consul/hcp-managed/clients) or [deploy Consul dataplanes](/hcp/docs/consul/hcp-managed/dataplanes) and register your services with the cluster.
1. Create and apply service intentions to secure communication in the service mesh. For additional guidance, refer to [Create and manage intentions](/consul/docs/connect/intentions/create-manage-intentions) in the Consul documentation.

```
### General subtopic

Place information about a concept, feature, or subject into general subtopics. General blocks glue pieces of the documentation together and provide space to describe how processes and concepts relate to other sections in the topic. You can embed visual elements and format content as lists, tables, tabs, or any other form so long as it is consistent with our writing styles and following principles:

  * **Content type** : Overview, concept

  * **Modular subtopics that tell a story:** Write subtopics so that they are comprehensible to practitioners that scan the page and practitioners that read the pate from top to bottom. Each general block supports a single aspect of the main topic. Arrange the blocks in a logical order on the page. Group and nest subtopics in a manner that is consistent with our style guidance.

  * **Headings:** Use headings that clearly signal to readers what the subtopic is about.

#### Examples

The following example shows general subtopics logically grouped, nested, and arranged on the page:

```mdx
 ## Datacenters

The Consul control plane contains one or more _datacenters_. A datacenter is the smallest unit of Consul infrastructure that can perform basic Consul operations. A datacenter contains at least one [Consul server agent](#consul-server-agent), but a real-world deployment contains three or five server agents and several [Consul client agents](#consul-client-agents). You can create multiple datacenters and allow nodes in different datacenters to interact with each other. Refer to [Bootstrap a Datacenter](/consul/docs/install/bootstrapping) for information about how to create a datacenter.

### Clusters

A collection of Consul agents that are aware of each other is called a _cluster_. The terms _datacenter_ and _cluster_ are often used interchangeably. In some cases, however, _cluster_ refers only to Consul server agents, such as in [HCP Consul](https://cloud.hashicorp.com/products/consul). In other contexts, such as the [_admin partitions_](/consul/docs/enterprise/admin-partitions) feature included with Consul Enterprise, a cluster may refer to collection of client agents.

## Agents

You can run the Consul binary to start Consul _agents_, which are daemons that implement Consul control plane functionality. You can start agents as servers or clients. Refer to [Consul Agent](/consul/docs/agent) for additional information.

### Server agents

Consul server agents store all state information, including service and node IP addresses, health checks, and configuration. We recommend deploying three or five servers in a cluster. The more servers you deploy, the greater the resilience and availability in the event of a failure. More servers, however, slow down [consensus](#consensus), which is a critical server function that enables Consul to efficiently and effectively process information.

```
The following example describes the benefits of functionality:

```mdx
## Benefits

**Fewer networking requirements**: Without client agents, Consul does not require bidirectional network connectivity across multiple protocols to enable gossip communication. Instead, it requires a single gRPC connection to the Consul servers, which significantly simplifies requirements for the operator.

**Simplified set up**: Because there are no client agents to engage in gossip, you do not have to generate and distribute a gossip encryption key to agents during the initial bootstrapping process. Securing agent communication also becomes simpler, with fewer tokens to track, distribute, and rotate.

**Additional environment and runtime support**: Consul on Kubernetes versions _prior_ to v1.0 (Consul v1.14) require the use of hostPorts and DaemonSets for client agents, which limits Consul’s ability to be deployed in environments where those features are not supported.
As of Consul on Kubernetes version 1.0 (Consul 1.14) with the new Consul Dataplane, `hostPorts` are no longer required and Consul now supports AWS Fargate and GKE Autopilot.

**Easier upgrades**: With Consul Dataplane, updating Consul to a new version no longer requires upgrading client agents. Consul Dataplane also has better compatibility across Consul server versions, so the process to upgrade Consul servers becomes easier.

```
The following example describes limitations associated with a functionality:

```mdx
### Technical Constraints

- Consul Dataplane is not supported on Windows.
- Consul Dataplane requires the `NET_BIND_SERVICE` capability. Refer to [Set capabilities for a Container](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-capabilities-for-a-container) in the Kubernetes Documentation for more information.

```
### Guidance

The guidance block contains links to additional information associated with the topic area. They are optional sections intended to guide practitioners to actionable content after reading about an overview or concept page.

  * **Be opinionated about the content you link to** : Link to the additional concepts, usage pages, reference, and tutorials that you believe would best facilitate the target user journey.

  * **Be concise:** Use lists to format links as opposed to blocks of prose.

  * **Be organized:** Group information into types. For instance, add a heading for tutorials related to the topic and add a list of links to the section.

  * **Adapt** : Adapt headings to the purpose of the page. For instance, you may call the guidance block _Best practices_ in an article in the well-architected framework (WAF) because the context for WAF is to list best practices. You may need to adapt heading labels and other features, but the purpose of the section should remain consistent.

#### Examples

In the following example, the tutorial guidance is organized into specific use cases:

```mdx
## Guidance

The following resources are available to help you use HashiCorp-managed clusters.

### Concepts and reference

- [Cluster management](/hcp/docs/consul/concepts/cluster-management) explains the difference between HashiCorp-managed clusters and self-managed clusters.
- [Cluster tiers](/hcp/docs/consul/concepts/cluster-tiers) explains how the tier you select when creating a HashiCorp-managed cluster determines its multi-cloud functionality.
- [Cluster configuration reference](/hcp/docs/consul/hcp-managed/reference) provides reference information about cluster properties, including the [ports HashiCorp-managed clusters listen on](/hcp/docs/consul/hcp-managed/reference#cluster-server-ports).

### Tutorials

- [Deploy HCP Consul](/consul/tutorials/get-started-hcp/hcp-gs-deploy) demonstrates the end-to-end deployment for a development tier cluster using the automated Terraform workflow.
- The following tutorials demonstrate the process to create an HVN and connect it to your cloud environment:
  - [Hashicorp Virtual Network on Amazon Web Services](/hcp/docs/hcp/network/hvn-aws/hvn-aws)
  - [Hashicorp Virtual Network on Microsoft Azure](/hcp/docs/hcp/network/hvn-azure/hvn-azure)
- The following tutorials demonstrate the process to deploy clients for services running on virtual machines:
  - [Connect a Consul client to AWS VM](/hcp/tutorials/consul-cloud/consul-client-aws-ec2)
  - [Connect a Consul client to Azure VM](/hcp/tutorials/consul-cloud/consul-client-azure-virtual-machines)
- The following tutorials demonstrate the process to deploy dataplanes for services running on Kubernetes using Terraform:
  - [Create HCP Consul cluster for an existing EKS runtime](/consul/tutorials/cloud-deploy-automation/consul-end-to-end-existing-eks)
  - [Deploy HCP Consul with EKS using Terraform](/consul/tutorials/cloud-deploy-automation/consul-end-to-end-eks)
  - [Deploy HCP Consul with AKS using Terraform](/consul/tutorials/cloud-deploy-automation/consul-end-to-end-aks)
- The following tutorials demonstrate the process to connect to services running in a Kubernetes using Helm:
  - [Connect an Elastic Kubernetes Service Cluster to HCP Consul](/consul/tutorials/cloud-production/consul-client-eks)
  - [Connect an Azure Kubernetes Service Cluster to HCP Consul](/hcp/tutorials/consul-cloud/consul-client-aks)

### Usage documentation

- [Create a HashiCorp-managed cluster](/hcp/docs/consul/hcp-managed/create)
- [Access a HashiCorp-managed cluster](/hcp/docs/consul/hcp-managed/access)
- [Delete a HashiCorp-managed cluster](/hcp/docs/consul/hcp-managed/delete)
- [Deploy Consul clients](/hcp/docs/consul/hcp-managed/clients)
- [Deploy Consul dataplanes](/hcp/docs/consul/hcp-managed/)

```
The following example is less verbose, but it includes links to examples on GitHub:

```mdx
## Guidance

Refer to the following documentation and tutorials for additional guidance.

### Tutorials

- [Integrate your AWS ECS services into Consul service mesh](/consul/tutorials/cloud-integrations/consul-ecs): Shows how to use Terraform to run Consul service mesh applications on ECS with self-managed Consul or HCP-managed Consul.

You can also refer to the following example configurations:

- [Examples on GitHub](https://github.com/hashicorp/terraform-aws-consul-ecs/tree/main/examples)
- [Consul with dev server on ECS using the Fargate launch type](https://registry.terraform.io/modules/hashicorp/consul-ecs/aws/latest/examples/dev-server-fargate)
- [Consul with dev server onn ECS using the EC2 launch type](https://registry.terraform.io/modules/hashicorp/consul-ecs/aws/latest/examples/dev-server-ec2)

### Documentation

- [Install Consul on ECS with Terraform](/consul/docs/ecs/deploy/terraform)
- [Configure routes between ECS tasks](/consul/docs/ecs/deploy/configure-routes)
- [Configure the ECS task bind address](/consul/docs/ecs/deploy/bind-addresses)
- [Install Consul on ECS manually](/consul/docs/ecs/deploy/manual)

### Reference

- [Architecture](/consul/docs/ecs/architecture)
- [Technical specifications](/consul/docs/ecs/tech-specs)
- [Task configuration reference](/consul/docs/ecs/reference/configuration-reference)
- [Cross-compatibility reference](/consul/docs/ecs/reference/compatibility)
- [Consul server JSON schema reference](/consul/docs/ecs/reference/consul-server-json)

```
In the following example, an overview page in the well-architected framework (WAF) links to documentation that supports the WAF best practice. Note that instead of _Guidance_ as the heading, the information is referred to as _Best practices:_

```mdx
## Best practices

Refer to the following resources for instructions on how to implement best practices with Vault transit and Vault transform secrets engines.

### Data encryption

- [Encrypt data with Vault transit secrets engine]()
- [Encrypt data with Vault transform secrets engine]()
- [Vault transit secrets engine configuration reference]()
- [Vault transform secrets engine configuration reference]()
- [Vault transit secrets engine data encryption tutorial]()
- [Vault transform secrets engine data encryption tutorial]()

### Tokenization

- [Tokenize secrets with Vault transit secrets engine]()
- [Tokenize secrets with Vault transform secrets engine]()
- [Vault transit secrets engine configuration reference]()
- [Vault transform secrets engine configuration reference]()
- [Vault transit secrets engine tokenization tutorial]()
- [Vault transform secrets engine tokenization tutorial]()

### Format preserving encryption

- [Encrypt data with Vault transit secrets engine]()
- [Encrypt data with Vault transform secrets engine]()
- [Vault transit secrets engine configuration reference]()
- [Vault transform secrets engine configuration reference]()
- [Vault transit secrets engine data encryption tutorial]()
- [Vault transform secrets engine data encryption tutorial]()

### Data masking

- [Mask data with Vault transit secrets engine]()
- [Mask data with Vault transform secrets engine]()
- [Vault transit secrets engine configuration reference]()
- [Vault transform secrets engine configuration reference]()
- [Vault transit secrets engine data masking tutorial]()
- [Vault transform secrets engine data masking tutorial]()

```
### Table

The table block describes a group of related components that have common qualities, such as command line options and flat configuration parameters. Table blocks have two to five columns and describe non-hierarchical information or information that is in the sam hierarchical plane.

Tables are more efficient than blocks of prose, bulleted lists, or other formats when describing a large set of related or similar information. If the reference artifact you are documenting contains structured elements, such as HCL or the contents of a JSON or YAML file, use the [Structured configuration reference](structured-configuration-reference.md) type.

#### Examples

The following example shows reference information on a tabular reference page:

```mdx
### Transaction timing

| Metric Name | Description | Unit | Type |
| --- | --- | --- | --- |
| `consul.kvs.apply` | Measures the time it takes to complete an update to the KV store. | ms | timer   |
| `consul.txn.apply` | Measures the time spent applying a transaction operation. | ms | timer |
| `consul.raft.apply` | Counts the number of Raft transactions applied during the interval. This metric is only reported on the leader. | raft transactions / interval | counter |
| `consul.raft.commitTime` | Measures the time it takes to commit a new entry to the Raft log on the leader. | ms | timer |

```
The following example shows reference information on an overview page:

```mdx
| | `Failover` stanza | Prepared<br/> query | Sameness groups |
| --- | :---:           | :---:            | :---:             |
| <nobr>**Supports WAN federation**</nobr> | &#9989;  | &#9989;  | &#10060; |
| **Supports cluster peering** | &#9989;  | &#10060;  | &#9989; |
| **Supports locality-aware routing** | &#9989;  | &#10060;  | &#9989; |
| **Multi-datacenter failover strength** | &#9989;  | &#10060;  | &#9989; |
| **Multi-datacenter usage scenario** | Enables more granular logic for failover targeting. | Central policies that can automatically target the nearest datacenter. | Group size changes without edits to existing member configurations. |
| **Multi-datacenter usage scenario** | Configuring failover for a single service or service subset, especially for testing or debugging purposes | WAN-federated deployments where a primary datacenter is configured. Prepared queries are not replicated over peer connections. | Cluster peering deployments with consistently named services and namespaces. |

```
