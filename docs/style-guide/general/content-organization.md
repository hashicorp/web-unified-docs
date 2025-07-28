# Content organization

These guidelines are intended to help you organize information within a page in a consistent manner.

## Do not implement frequently-asked-question (FAQ) sections 

- **keywords**: writing, faq  
- **content sets**: docs, cert, tutorials

If the information has gaps, redesign your content around use cases that would otherwise be filled with FAQs.

## Organize content so that it flows in a single direction from beginning to end 

- **keywords**: writing, flow  
- **content sets**: docs, WAF, tutorials

Avoid structuring content so readers have to backtrack or jump forward. 

When you must direct readers to a different section, refer to a specific point instead of using ambiguous directional phrases, such as "above", "below", and "previously" because the location of content can change over time. 

Use "following" to describe an element or topic that immediately follows the sentence or paragraph.

### Examples

**Do:**

- `In the following example, . . .`
- `A provider has the following configuration: . . .`
- `Copy the certificate keys you created in [Create TLS certificates](#create-tls-certificates) to the host instance.`
- `Copy the output from step 1.`
- `The account must have admin access to shared repositories containing Terraform configurations. Refer to [Requirements](#requirements) for more information.`

**Don't:**

- `The example below . . .`
- `Get the output from the step above . . .`
- `Get the output from the previous step . . .`
- `See above for supported versions.`

## Reference specific steps, section headings, or page titles when pointing readers to other sections

- **keywords**: writing, flow, organization  
- **content sets**: docs, WAF, cert, tutorials

When necessary, direct users to the specific step instead of using directional or temporal phrases. When you must reference previous sections, always direct users to the specific section. Avoid vague positional language such as “above” or “previously”.

### Examples

**Do:**

- `Copy the output from step 1.`
- `Refer to [Requirements](#requirements) for supported versions.`
- `In the following example, . . .`

**Don't**

- `Get the output from the previous step . . .`
- `See above for supported versions.`
- `The example above shows . . .`

## Write simple sentences that contain a single idea

- **keywords**: writing, flow, organization  
- **content sets**: docs, WAF, cert, tutorials

Avoid long, complex sentences. Instead, write multiple sentences that each contain a single idea. Frontload paragraphs with the most important information to make it easier to scan the page.

Do not use dashes, semicolons, or other punctuation to merge several ideas into a single sentence. Refer to [Do not use en or em dashes to separate ideas or phrases](grammar.md#do-not-use-parentheses-en-dashes-or-em-dashes-to-separate-ideas-or-phrases) for additional guidance. 

**Do:**

```markdown
Terraform processes the `import` block during the planning stage. Terraform lists the steps it intends to take in a plan, which you can approve to have Terraform import resources during the subsequent apply stage.`
```

**Don't:**

```markdown
The `import` block, like all Terraform configuration blocks, is processed during the `terraform plan` operation, which outputs a list of changes Terraform will make if you proceed to apply.
```

## Do not format multiple paragraphs of text into lists 

- **keywords**: writing, flow, organization, lists  
- **content sets**: docs, WAF, cert, tutorials

Do not force information into lists when doing so results in very large list items spanning multiple lines. 

Do not force information into a list when doing so results in multiple tiers of lists. Instead, group related information into subheadings and apply flat or almost-flat lists.

### Examples

```

## Personas

Consul aligns with the following personas.

### System administrator 

This person has access to the infrastructure undergirding the Consul cluster. System administrators have direct SSH or RDP access to a server within a cluster through a bastion host. This person also has permission to perform read, write, and execute operations on the Consul binary. The binary is the same for server and client agents, but they have different configuration files. 

This person may also have super-user access to the underlying compute resource and all persisted data on disk or in memory, including ACL tokens, certificates, and other secrets stored on the system. 

The organization trusts the system administrator to configure, start, and stop the Consul agent by providng administrative rights to the underlying operating-system. 

### Consul administrator 

The Consul administrator is often the same person as the system administrator. This person has access to define the Consul agent configurations for servers and clients, and have a Consul management ACL token. They also have total rights to all of the parts in the Consul system including the ability to manage all services within a cluster.

### Consul operator 

This is someone who likely has restricted capabilities to use their namespace within a cluster.

### Developer 

This is someone who is responsible for creating, and possibly deploying applications connected, or configured with Consul. In some cases they may have no access, or limited capabilities to view Consul information, such as through metrics, or logs.

### User

This refers to the end user whow uses applications backed by services managed by Consul. In some cases services may be public facing on the internet such as a web server, typically through a load-balancer, or ingress gateway. This is someone who should not have any network access to the Consul agent APIs.

```

```

## Requirements

The requirements depend on which operational mode you choose.

### `external` mode

- Refer to the PostgreSQL configuration requirements for stateful application data storage requirement details.
- Refer to the data object storage configuration requirements for requirements.

### `active-active` mode

- Refer to the PostgreSQL configuration requirements for stateful application data storage requirement details.
- Refer to the data object storage configuration requirements for requirements.
- Refer to the Redis data store configuration requirements for requirements.

### `disk` mode

One of the following mounted disk types is required for the persistent storage volume:

- AWS EBS
- GCP zonal persistent disk
- Azure disk storage
- iSCSI
- SAN
- A disk physically connected to the host machine

```

**Don't:**

```
## Personas

It helps to consider the following types of personas when managing the security requirements of a Consul deployment. The granularity may change depending on your team's requirements.

- System Administrator - This is someone who has access to the underlying infrastructure to the Consul cluster. Often they have access to SSH or RDP directly into a server within a cluster through a bastion host. Ultimately they have read, write and execute permissions for the actual Consul binary. This binary is the same for server and client agents using different configuration files. These users potentially have sudo, administrative, or some other super-user access to the underlying compute resource. They have access to all persisted data on disk, or in memory. This would include ACL tokens, certificates, and other secrets stored on the system. Users like these are essentially totally trusted, as they have administrative rights to the underlying operating-system with the ability to configure, start, and stop the agent.

- Consul Administrator - This is someone (probably the same System Administrator) who has access to define the Consul agent configurations for servers and clients, and/or have a Consul management ACL token. They also have total rights to all of the parts in the Consul system including the ability to manage all services within a cluster.

- Consul Operator - This is someone who likely has restricted capabilities to use their namespace within a cluster.

- Developer - This is someone who is responsible for creating, and possibly deploying applications connected, or configured with Consul. In some cases they may have no access, or limited capabilities to view Consul information, such as through metrics, or logs.

- User - This is the end user, using applications backed by services managed by Consul. In some cases services may be public facing on the internet such as a web server, typically through a load-balancer, or ingress gateway. This is someone who should not have any network access to the Consul agent APIs.
```

```
## Requirements

- `external` mode

   - Refer to the PostgreSQL configuration requirements for stateful application data storage requirement details.
   - Refer to the data object storage configuration requirements for requirements.

-`active-active` mode

   - Refer to the PostgreSQL configuration requirements for stateful application data storage requirement details.
   - Refer to the data object storage configuration requirements for requirements.
   - Refer to the Redis data store configuration requirements for requirements.

- `disk` mode

   - One of the following mounted disk types is required for the persistent storage volume:

      - AWS EBS
      - GCP zonal persistent disk
      - Azure disk storage
      - iSCSI
      - SAN
      - A disk physically connected to the host machine
```

## Describe the contents of diagrams, tables, and example code blocks in the introduction to the elements

- **keywords**: writing, diagrams, tables  
- **content sets**: docs, WAF, tutorials

Introduce diagrams, tables, and example code blocks with a statement that describes its purpose. If you need to provide additional clarity, do so after the page element.

Do not describe code examples using comments embedded in the code. 

### Examples

**Do:**

```
The following diagram shows . . .

![Description](/static/img/graphic.png)
```

````
In the following example, . . .

```hcl
{some code}
```
````

**Don't**

```
![Description](/static/img/graphic.png)

The above shows . . . 
```

````

```hcl
# This part of the code does {some action}
{some code}
```

````

## Do not place the same type of content elements next to each other

- **keywords**: formatting  
- **content sets**: docs, tutorials, WAF, certifications

Do not place the following non-prose elements immediately next to each other: 

- alerts next to other alerts 
- headings next to other headings 
- tables next to other tables
- visual aids next to other visual aids
- lists next to other lists

Creating blocks of visually complex elements distracts readers from the information. Use introductory text between the same type of elements.

### Examples

**Do:**

```
## Heading

This paragraph introduces subtopics organized under each subheading. 

### Subheading

```

**Don't:**

```
## Heading

### Subheading
```

## Include the URL for the locally-running services at least once

- **keywords**: local services, URLs, links  
- **content sets**: tutorials, docs

When describing the address where an application or service is accessible, include the URL at least once in the body of the content so that readers can readily copy, paste, and modify the location for their environment.

For short tutorials, include the URL the first time it is mentioned. For longer-form content or content with multiple stages, consider including the URL in sections that appear later in the tutorial. 

### Examples

**Do:**

``In a browser window, navigate to the UI at `http://localhost:8500`.``

**Don't**

`Go to the UI.`

## Match the navigation label, page and meta titles, and link text as closely as possible per your product information architecture 

- **keywords**: navigation, page titles, writing, IA  
- **content sets**: docs

Each page has a label in the navigation, an H1 page title, and a meta title that search engines use as part of their algorithms to match queries to content. The navigation label has the most restrictive character length. The H1 page title should match the meta title, but you can write longer or shorter meta titles as necessary. Use keywords from the page and meta title in the navigation label so that the experience is consistent for readers. 

The only exception is the overview page for a content area, which should always appear in the sidebar as "Overview".

### Examples

**Do**

The following example describes proper title elements for an overview page:

- Navigation label: "Overview"
- Page title: `# Terraform Enterprise deployment overview`
- Meta title: "Terraform Enterprise deployment overview"

The following example shows proper title elements for a usage page:

- Navigation label: "Establish cluster peering connections"
- Page title: `# Establish cluster peering connections`
- Meta title: "Establish cluster peering connections" 

**Don't**

In the following example, the page and meta titles match, but they do not agree with the navigation label:

- Navigation label: "Improving Consul Resilience"
- Page title: `Fault tolerance`
- Meta title: "Fault tolerance in Consul"

## Use the `badge` attribute in the navigation file to note release phases and special conditions, such as beta and deprecated

- **keywords**: writing, navigation, beta, deprecated, data.json  
- **content sets**: docs, tutorial, WAF, certifications

Use all caps for the contents of the badge.

Always use `"color" : "neutral"`.

Always use `"type": "outlined"` for statuses:

- `ALPHA`
- `BETA`
- `DEPRECATED`
- `EXPERIMENTAL`

Always use `"type": "filled"` for editions:

- `ENT` 
- `HCP`
- `HCP/ENT`

When status and edition are necessary, use the edition style and the following format: 

`<edition> | <status>`

For deprecated items, replace any existing badge with `DEPRECATED` and use the appropriate style.

Discuss experimental features with your technical writer.

### Example

```json

"title": "Session recording",
            "badge": {
              "text": "BETA",
              "type": "outlined",
              "color": "neutral"
             }
```

## Write modular pages and sections 

- **keywords**: writing, dry, modular topics  
- **content sets**: docs, tutorials, WAF, certifications

Describe concepts, instructions, workflows, reference items, and other types of information once in a neutral context and link to them from more specific contexts. 

Writing modular topics once so that you don't repeat yourself is referred to as "keeping your writing DRY". Refer to the content types guidance for additional guidance.

Some repetition is unavoidable and even expected in some contexts, but copying and pasting the same content without using partials indicates non-modular topics.