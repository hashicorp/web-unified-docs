# Appendix

The following sections provide more robust guidance on screenshots, alerts, and other topics associated with producing educational content.

## Guidelines for screenshots in tutorials

RFC [EDU-032 Image Organization for Learn Tutorials](https://docs.google.com/document/u/0/d/1E97AW5WzFJpOlR7k4kxwURZ2DWFhXW3l4guUEa3Usxc/edit_) describes standards for adding screenshots to tutorials. The RFC includes the following guidelines:

- Use Chrome’s Developer Tools to take screenshots. The tool generates file names that only require minor modifications. Refer to the [instructions for taking screenshots](https://hashicorp.atlassian.net/wiki/spaces/ED/pages/499712179/Screenshots+for+Documentation) on the Education wiki for details.
- Take screenshots at the iPad Pro dimensions. Crop screenshot height as necessary, but do not modify the width.
- Use Snagit to edit and annotate images.
- Use color hex value `#F92672` for annotations. Use color hex value `#0D44CC` as an alternative if more contrast is needed. 
- Use shared HCP organizations so that we only need to update the screenshots relevant to feature releases.
- Create screenshots that you can share and reuse in other tutorials.
- Store tutorial images in the top-level product directory.
- Use clear and descriptive names for screenshot image files. 
- Separate words with underscores. 
- Do not append file names with numbers as a way to differentiate similar images.
- Prefix diagram images with diagram_. 
- Use descriptive alt text when embedding images.
- Do not use "image of" or "graphic of" in alt text descriptions. Refer to the [Write the Docs page](https://www.writethedocs.org/blog/newsletter-march-2017/#resources-and-best-practices-for-alt-text) for additional alt text guidance and best practices. 
- Present images using inline links instead of using [reference style links](https://www.markdownguide.org/basic-syntax/#reference-style-links).  

### Terraform 

When taking screenshots of HCP Terraform interfaces, replace "app.terraform.io_app" with "hcp_tf" in the generated file name and remove "(iPad)". 

### Vault

Use the following convention to name files when taking screenshots of the Vault UI:

`(platform|diagram|ui)_(section|topic)(-subsection|subtopic)*_(operation|action|element)`

- First-level: (platform | diagram | ui)
- Second-level: (section | topic)-(subsection | subtopic)* 
   - Use "-" as a separator between the (section | topic) and  (subsection | subtopic)
   - The (subsection | subtopic) is NOT required. Use them as needed. 
   - There can be multiple  (subsection | subtopic)
   - Third-level: (operation | action | element)

Use underscore ("_") as a separator between the levels. Use hyphen ("-") as a separator between (section | topic) and  (subsection | subtopic).

#### Examples

```
/img/vault/ui_login-method-username_selected.png
/img/vault/azure_vault-agent_config.png
/img/vault/diagram_reference-architecture_prod.png
/img/boundary/desktop_sessions_cancelled.png
```

### Consul and Nomad

- Root level specifies whether the image is unique or shared:
   - \<common>
   - <collection_name>-
- Second level specifies product or diagram:
   - \<diagram>
   - \<nomad>
   - \<terminal>
   - \<app_name>
- Third level provides the description of the screenshot content:
   - \<name_of_the_tab>-<content>
   - \<command>-<content>

#### Examples

```
common-diagram-service_mesh_reference-architecture.png
developer_mesh-consul-intentions-l7_intention_frontent_api.png
```

## Guidelines for alerts boxes

Alerts have more visual weight than other elements. As a result, practitioners that scan the page potentially miss other important information. Additionally, research suggests that alerts draw regular reader's attention away from surrounding text. Too many alerts give the impression that the prose is not as important, which is not true. 

Use alerts to flag beta, enterprise, or paid tier features, but do not use them to inject information as a replacement for a standalone paragraph or a subsection. 

### Alerts in tutorials

- Write concise messages under 270 characters that are clear and descriptive enough to explain what is happening. They should guide users on how to prevent or fix the issue.
- The alert component supports Markdown syntax, such as inline links, bold, italic, and lists, but use them sparingly to ensure consistency.
- Do not use images or code blocks within the alerts. Render them below or above the alert instead.
- Be stingy with Note and Warning alerts. They lose their effectiveness when used too frequently.
- If you add an alert, remove an alert. Avoid increasing the number of alerts.
- Do not put alerts next to each other.
- Remove outdated alerts.

### Alert types

Use `<Tip/>` to describe best practices or optional settings and workflow. Information in a tip alert is not required for users to complete the tutorial.

```
<Tip>
  If you do not have access to IAM user credentials, use another authentication method described in the [AWS provider documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables).
</Tip>
```

Use `<Note/>` for information that the user may need to take action on.

```
<Note>
  When you change a configuration's backend, you must re-initialize your Terraform configuration.
</Note>
```

Use `<Warning/>` for information that the user must take action on. Warnings only call out a breaking change or security vulnerability.

```
<Warning>
  This configuration enables public SSH traffic to the example instance for tutorial purposes. Lock down access to your services in production environments. 
</Warning>
```

### Alerts in documentation

- Use partials for feature maturity and pricing and packaging notes.
- Avoid notes and tips in documentation. Instead, integrate supplemental information into content.
- Use warnings as needed to alert users to critical compatibility, upgrade, and security situations.
- Provide alternatives when warning users against actions or explain why the action is dangerous.
- Link to additional information when applicable.
- Use proper grammar and punctuation and follow style guidelines.
- Never use consecutive alert boxes.
- Never begin a topic with a content alert.
- Place warnings immediately before or after the documentation they apply to, but consider how the alert box would affect a user who performs each step as they read it.
   - When documenting a procedure, placing a warning before the steps ensures that users are aware of potentially catastrophic consequences. 
   - When documenting a set of configurations, placing alerts immediately after a configuration item may be more appropriate because a user is unlikely to apply configurations one at a time.
- Use Markdown blockquotes to call out links to tutorials. Place blockquotes in the Overview or Introduction section or in the most relevant section in the body of the page. 

### Types

Use the following type of alerts in documentation.


#### `<Warning> Content </Warning>`

You should always document products as they currently function, but you can use this callout to help users understand circumstances that apply when upgrading to the current version. You can omit upgrade warnings that refer to changes older than the previous two versions. Always link to the product upgrade page.

Example:

```
<Warning> 

Consul Dataplane is the default proxy manager in Consul on Kubernetes 1.14 and later. If you are on Consul 1.13 or older, refer to [upgrading to Consul Dataplane](link) for specific upgrade instructions.

</Warning>
```

#### `<Warning heading="Compatibility warning"> Content </Warning>`

In most cases, usage docs describe version compatibility in the requirements section. This callout helps users understand incompatibilities that degrade performance.

Example:

```
<Warning heading="Compatibility warning">

Do not use Vault v1.11.0+ as the Consul service mesh CA provider. This is because the intermediate CA generated from this version cannot issue the leaf nodes required by service mesh and Consul client agents when auto-encrypt or auto-config and TLS is enabled for agent communication.

</Warning>
```

#### `<Warning title="Security warning"> Content </Warning>`

In most cases, security considerations should be described within the body of the topic, but you can use this callout to help users understand configurations or procedures that may result in catastrophic consequences.

Example:

```
<Warning title="Security warning">

Configuring the `metrics_proxy` to expose the metrics backend poses a security risk in production because Consul cannot process the requests in order to limit access to specific resources.

</Warning>
```

#### Links to tutorials

Use Markdown blockquotes in documentation to direct users to related tutorials. Use "Hands-on" in bold as the label.

Example:

```
 > **Hands-on**: Complete the [Tutorial](URL) tutorial to help you learn how to {topic}.
```

#### `<EnterpriseAlert> Content </EnterpriseAlert>` and `<EnterpriseInline/>`

Use the special Enterprise alert and inline badge to identify paid functionality. 

For usage pages, you should describe paid edition requirements in the Requirements section instead of using an alert. 

For overview pages, place the alert in a partial and reuse it after page description sentences when the alert applies to the entire contents of the page. When the page describes a mix of paid and community functionality, place the alert in the appropriate section.

Refer to the specific [content type guidelines]https://hashicorp.atlassian.net/wiki/spaces/TW/pages/2673180793/Content+types+overview) for document designs.

Example overview of a paid edition feature:

```
# Admin partitions 

This topic provides an overview of admin partitions, which are entities that define one or more administrative boundaries for single Consul deployments.

@include 'alerts/enterprise.mdx'
```

Example of an overview page that describes a mix of community and paid functionality:

```
# Service mesh traffic management overview

. . .

## Locality-aware routing

@include 'alerts/enterprise.mdx'

By default, Consul balances traffic to all healthy upstream instances in the cluster, even if the instances are in different network regions and zones. You can configure Consul to route requests to upstreams in the same region and zone, which reduces latency and transfer costs. Refer to Route traffic to local upstreams for additional information.
```

Example of reference content that describes a mix of community and paid functionality:

```
| Element | Description | Feature 1 | Feature 2 |
| ---     | ---         | ---       | ---       |
| `elementA` | Description <EnterpriseInline/>. | Data type | Use case 1 |
| `elementB` | Description of community edition.| Data type | Use case 1 |
```

## Guidelines for variants

Use the variants component to add variations of the same information for different audiences, such as showing how to interface with an SDK using different programming languages. The component adds a menu to the page so that users can choose which information to render. Refer to the [CDKTF documentation](https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-build) for an example.

- **Lean on existing variants**. Only create a new variant type or modify an existing variant if you cannot find one that fits your purposes. This should be a rare occurrence.
- **Choose variants and variant names carefully**. Be extremely mindful when deciding on a variant and variant option slug. Variants and slugs form part of the URL and can affect SEO, as well as user experience. 
- **Be concise with variants and variant names**. Variant and variant options should be approximately 20 characters.
- **Be consistent across products for slug and name**.
- **Use sentence-style capitalization** for variant and variant option names, such as, "Interactive lab" instead of "Interactive Lab".
- **Do not place H2 headers in variants**. H2 headers render on the right sidecar. In addition, variants are meant to separate the learning outcomes from tasks. H2 should be more general, for example, "Deploy infrastructure". Variants may include more specific guidance, such as "AWS, Azure, Google Cloud".

### How to use variants

There are three main steps to use variants. First, you need to create the variants. After you have configured the variant, you can use it in a tutorial by specifying it in the metadata and referencing it in the content.

1. Identify the variant type you want to use in `content/variants`.
1. There are two ways to specify variants in a tutorial. You can reference all options in a variant or a subset.
   - By default, if you only specify the variant slug (id), the tutorial will render all options in the order as defined in the variants file. For example, the following configuration renders "Terraform Cloud", "OSS", and "Interactive Lab" as variant types for the tutorial.

   ```
   variants:
   - slug: terraform-workflow
   ```

   - You can use the `options` parameter to reorder or render a subset of the variant options specified in the variant configuration file. For example, the following configuration will render "OSS" and "Terraform Cloud" as variant types for the tutorial.

   ```
   variants:
   - slug: terraform-workflow
   options:
      - oss
      - tfc
   ```

1. Use the Variant component by specifying both the variant slug and the variant option slug. When a particular variant option is active, only content for that variant option will render on the page. If no variant option is selected, the default option is the first variant defined in the options array. For example:

   ```

   <Variant slug="terraform-workflow" option="tfc">

   Content for TFC

   </Variant>
   <Variant slug="terraform-workflow" option="oss">

   Content for OSS

   </Variant>

   ```