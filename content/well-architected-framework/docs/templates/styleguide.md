# Top 12 guidelines

The following guidelines cover most writing style issues.


## Write in active voice

- **keywords**: writing, grammar, active voice, passive voice  
- **content sets**: docs, WAF, tutorials, certifications

The subject of the sentence always performs the action, embodies a description, or otherwise exhibits agency. 

### Examples

**Do:**

- `Next, register the service.`
- `We recommend configuring VCS access when you set up an organization.`
- `By default, Vault expects users to own configuration directories and files that control how Vault runs.`

**Don't:**

- `Next, the service will be registered.`
- `It is recommended to configure VCS access when first setting up an organization.`
- `By default, Vault expects that the configuration directory and files that run Vault are owned by the user.`

## Use simple present tense to describe immediate actions

- **keywords**: writing, grammar, tense  
- **content sets**: docs, WAF, tutorials

Simple present tense describes actions or events that happen regularly, are currently happening, or are facts. Use present tense when describing chronological events, such as procedural steps and outputs. 

Avoid using the world "will", and do not describe events or actions that "will" happen in the future. For example, describe t​he results of a command as though it just happened, instead of describing it as an action that will happen.

Use "when" to describe a sequence of actions, not "if".  

### Examples

**Do:**

- `The output shows that Vault is initialized and unsealed.`
- `After Consul performs a health check, the web UI reports that the service is unhealthy.`
- `Click **Next**. The server configuration screen appears.`

**Don't:**

- `The output will show that Vault is initialized and unsealed.`
- `The service's state will change to unhealthy in the web UI.`
- `Click **Next**. The server configuration screen will appear.`

## Describe features and functionality as they currently exist 

- **keywords**: writing  
- **content sets**: docs, WAF, tutorials

Do not refer to features and functionality that will be implemented in the future. 

Do not promise updates or fixes for specific releases.

Do not use words that reference points in time, such as "new", "old", "now", or "currently" to describe products.

Reference specific versions only when necessary in dedicated areas, such as the Requirements block on a usage page or in a beta callout.

### Examples

**Do:**

```
The `terraform providers schema` command prints detailed schemas for the providers used in the configuration.
```

### Exceptions

You can add notices about deprecated configurations and functionality. If applicable, you should link to the release notes page that contains the deprecation announcement. 

## Do not use unofficial product abbreviations 

- **keywords**: writing, word choice, abbreviations  
- **content sets**: docs, tutorials, WAF, certifications

Do not use the following abbreviation: TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, and COM. Refer to [HashiCorp Voice, Style & Language Guidelines](https://docs.google.com/document/u/0/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit) for additional guidance.

## Only use "we" when referring to HashiCorp

- **keywords**: writing, grammar, active-voice  
- **content sets**: docs, WAF, tutorials, certifications

Use the first person plural "we" when providing recommendations from HashiCorp or when describing actions by the company. Excluding "we" commonly results in passive voice. Refer to [Write in active voice](#write-in-active-voice) for additional information.

Do not use "we" to guide readers through examples. 

### Examples

**Do:**

- `We recommend that you test your Sentinel policies extensively before deploying them within HCP Terraform. Refer to the following example for guidance on testing Sentinel policies.`

**Don't:**

- `In the following example, we set up a new Sentinel policy to test mocking the data we want our policies to operate on.`
- `It is recommended that you test your Sentinel policies extensively before deploying them within HCP Terraform.`
- `Next we will configure the server. We start by creating a configuration file.`

## Address the reader as "you" 

- **keywords**: writing, grammar, active-voice  
- **content sets**: docs, WAF, tutorials, certifications

Address the reader as "you" when describing actions that you expect the reader to perform. You can also use imperative statements to describe actions. Writing to "you" is called using the second person and it helps avoid passive voice.

### Examples

**Do:**

- `In this tutorial, you selectively allowed services to communicate with each other by configuring Consul service mesh.`
- `HCP Terraform's API lets you create workspaces without a VCS connection.`

**Don't:**

- `Upon completing this tutorial, a user has learned to selectively allow services to communicate with each other by configuring Consul service mesh.`
- `We can use HCP Terraform's API to create workspaces without a VCS connection.`

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

## Avoid unnecessary words

- **keywords**: writing, word choice  
- **content sets**: docs, WAF, tutorials, certifications

Avoid extra words and phrases. 

### Examples

- Instead of "in order to", use "to"
- Instead of "in the case that", use "when"
- Avoid adding filler words, especially words that editorialize, such as "simply", "just", "very", and "actually". Refer to [Do not editorialize about the difficulty or comprehensibility of an action or concept](general/language#do-not-editorialize-about-the-difficulty-or-comprehensibility-of-an-action-or-concept)

**Do:** 

`Do not allow new clients to join the gossip pool during the rotation process. Clients that join the pool during rotation may not receive the new primary gossip encryption key.`


**Don't:**

`Careful precaution should be taken to prohibit new clients from joining during the gossip encryption rotation process, otherwise the new clients will join the gossip pool without knowledge of the new primary gossip encryption key.`


## Use the simplest word possible

- **keywords**: writing, word choice  
- **content sets**: docs, WAF, tutorials, certifications

Always use the shortest word or phrase that conveys your intended meaning. Use discretion to provide additional clarity when advanced vocabulary is necessary.

### Examples

-  "use", not "utilize" or "utilization": Prefer the root for most "ize" words.
- "because, not "due to the fact that": Also refer to [Do not use figures of speech](general/language.md#do-not-use-figures-of-speech).
- "lets", not "enables" or "allows": Use "lets" when describing what tools or services do for users.

**Do:**

- `The AWS provider lets you manage CodeArtifact configuration through Terraform.`
- `HCP Terraform's API lets you create workspaces without a VCS connection.`
- `Vault lets you manage secrets dynamically.`

**Don't:**

- `The AWS provider enables you to manage CodeArtifact configuration through Terraform.`
- `HCP Terraform's API allows you to create workspaces without a VCS connection.`
- `Vault enables you to manage secrets dynamically.`

## Do not use words or phrases borrowed from other languages, scientific words, or jargon words

- **keywords**: writing, word choice  
- **content sets**: docs, WAF, tutorials, certifications

Use simple, concrete words so global audiences can understand our content more easily. Refer to [Spell out a phrase and place the acronym form in parentheses on first use](language#spell-out-a-phrase-and-place-the-acronym-form-in-parentheses-on-first-use) for related guidance.

Avoid Latin loan words such as via, which are common in the English language.

### Examples

The following list contains common words and phrases that you should avoid in educational content:

| Do not use | Suggestion | Explanation |
| --- | --- | --- |
| "blast radius" | "affected scope" | jargon |
| "ergo" | "therefore", "as a result", "so" | Latin word meaning "therefore" |
| "etc." | " . . . and other {entities matching the description}." |  Latin abbreviation of "et cetera", which means "and the rest". |
| "carte blanche" | "full permission", "admin access" | French phrase that translates to "blank document" and means "unlimited authority". |
| "via" | Choose a more concrete word to describe the relationship. | Latin word meaning "by way of". |
| "vice versa" | "conversely" | Latin word meaning "the other way around". |
| "sanity check" | "verification" | jargon, ableist |
| "smoke test" |  "preliminary test", "initial test" | jargon |

**Do:**

- `Some repositories may include Git submodules that you can only access using an SSH connection.`
- `Choose a set of tags relevant to your project.`
- `Vault manages credentials, tokens, and other secrets.`

**Don't:**

- `Some repositories may include Git submodules that can only be accessed via SSH.`
- `Choose a set of tags germane to your project.`
- `Vault manages credentials, tokens, etc.`

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

---

# FULL STYLE GUIDE - GENERAL



## Active Voice

# Active voice

These guidelines are intended to help you write in active voice.

## Write sentences where a subject performs an action, exhibits agency, or gets described by a predicate phrase

- **keywords**: writing, grammar, active-voice  
- **content sets**: docs, WAF, tutorials, certifications
 
### Examples

**Do**

- `Next, register the service.`
- `We recommend configuring VCS access when you set up an organization.`
- `By default, Vault expects users to own configuration directories and files that control how Vault runs.`
- `Consul is a service networking solution.`
- `Consul solves service networking issues.`

**Don't**

- `Next, the service will be registered.`
- `It is recommended to configure VCS access when first setting up an organization.`
- `By default, Vault expects that the configuration directory and files that run Vault are owned by the user.`

## Use direct, imperative statements that tell readers what to do

- **keywords**: writing, grammar, active-voice  
- **content sets**: docs, WAF, tutorials, certifications

Imperatives imply "you" as the subject. Imperatives are clear, actionable, and prevent passive voice. 

### Examples

**Do:**

The following examples imply that the subject is the second "you" :

- ``To specify the location of a configuration file, use the `-config` flag with `vault server`.``
- ``Open `main.tf` in your editor.``

The following examples explicitly instruct "you" to perform the action:

- ``You can set the `-var` flag multiple times in the same command to set additional variables.``
- ``You must provide credentials to access HCP Terraform.`` 

**Don't:**

- `The flag can be set multiple times. `
- `Next, the service will be registered.`
- `It is recommended to configure VCS access when first setting up an organization.`
---


## Alerts

# Alerts

These guidelines are intended to help you determine when to use alert boxes.

## Use alerts sparingly in documentation

- **keywords**: notes, warnings, alerts, callout boxes
- **content sets**: docs

Avoid adding unwarranted notes, warnings, and other alert boxes, which distract from the rest of the documentation and may give the impression that the rest of the content is unimportant. Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

## Use Markdown blockquotes to call out links to tutorials in documentation 

- **keywords**: links to tutorials, alerts
- **content sets**: docs

Place blockquotes in the Overview or Introduction section or in the most relevant section in the body of the page. Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

### Examples

**Do**

```
# Import existing resources overview

This topic provides an overview of the Terraform commands that let you import existing infrastructure resources so that you can manage them with Terraform. 

> **Hands-on:** Try the [Import Terraform Configuration](/terraform/tutorials/state/state-import) tutorial.
```

```
# Import existing resources overview

This topic provides an overview of the Terraform commands that let you import existing infrastructure resources so that you can manage them with Terraform. 

@include 'partials/enterprise.mdx`

## Workflows

You can import an existing resource to state from the Terraform CLI. You can also perform import operations using HCP Terraform. To import multiple resources, use the `import` block.  

> **Hands-on:** Try the [Import Terraform Configuration](/terraform/tutorials/state/state-import) tutorial.
```

**Don't**

```
# Import existing resources overview

This topic provides an overview of the Terraform commands that let you import existing infrastructure resources so that you can manage them with Terraform. 

<Note title="Hands-on">
Try the [Import Terraform Configuration](/terraform/tutorials/state/state-import) tutorial.
</Note>
```

```
# Import existing resources overview

> **Hands-on:** Try the [Import Terraform Configuration](/terraform/tutorials/state/state-import) tutorial.

This topic provides an overview of the Terraform commands that let you import existing infrastructure resources so that you can manage them with Terraform. 
```

## Place interactive tutorial alerts early in a tutorial 

- **keywords**: instruqt, alerts, callouts
- **content sets**: tutorials

Use discretion in where you think this component will best suit the flow of the content, but you should preferably place it directly following introductory content. Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

### Example

```
# This is the tutorial heading

Here are some intro paragraphs. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<InteractiveLabCallout />

## This is the start of the tutorial instructions

//...
```

## Use warning alerts to call out potentially harmful actions or configurations 

- **keywords**: warnings, alerts 
- **content sets**: docs, tutorials

Add an alert box to instructions when they describe actions or configurations that require special consideration to prevent harmful effects. 

Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

### Examples

**Do**

In the following example, users potentially lock up access to the system by overwriting existing credentials:

```
1. Set [application default credentials](https://cloud.google.com/docs/authentication/application-default-credentials)
as environment variables on the Vault server.

<Warning>
  Passing Vault new root credentials overwrites any preexisting root credentials.
</Warning>
```

**Don't**

In the following example, the only consequence is that the reader must get the necessary permissions to complete the instructions:

```
## Requirements

<Warning>
  You must be a member of a team with one of the following permissions enabled to create and manage workspaces.
</Warning>

- **Manage all projects**
```

## Use tip alerts to call out best practices or optional settings and workflow

- **keywords**: tips, flow, alerts 
- **content sets**: docs, tutorials

You can add tip-style alert boxes to highlight a recommendation, best practice, or to provide assistance beyond the scope of the documentation or tutorial. 

Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

### Examples

**Do**

```
<Tip>
  If you do not have access to IAM user credentials, use another authentication method described in the [AWS provider documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables).
</Tip>
```

```
Send a `GET` request to the `/workspaces/:workspace_id` endpoint to list workspace details.

<Tip>
  Alternatively, you can send a `GET` request to the `/organizations/:organization_name/workspaces/:name` endpoint.
</Tip>
```

**Don't**

The following example calls out information as a tip instead of describing it as part of the core product documentation:

```
The `recording_storage_minimum_available_capacity` vaule defines the minimum available disk space that must be available on the worker for session recording and session recording playback. 

<Tip>
  This threshold determines the local storage state of the worker!
</Tip>
```

The following example contains several style guide issues, including applying the wrong alert type for the information, using a custom title, and using an alert when a regular sentence is more appropriate:

```
## Dependency provisioners

<Tip title="Warning">
Advanced Topic! Dependency provisioners are an advanced topic. If you are just getting started with Vagrant, you can safely skip this.
</Tip>
```
---


## Content Organization

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
---


## Enterprise Releases

# Paid offerings and pre-GA releases

These guidelines describe how to write about enterprise editions, paid tiers, and pre-GA releases.

## Use an enterprise alert to create a partial that calls out paid edition considerations on overview and concept pages

- **keywords**: enterprise, editions, alerts   
- **content sets**: docs

Use the appropriate partial to add an alert box when the topic describes features that require a paid edition. Refer to [Use the appropriate partial to communicate product maturity, deprecation warning, and pricing and packaging information](#use-the-appropriate-partial-to-communicate-product-maturity-deprecation-warning-and-pricing-and-packaging-information).

The design documents for overview and concept content types do not include a Requirements or Prerequisites section. When you need to create a partial to identify a paid feature or functionality, use the enterprise-style alert box. Use the include tag to add it to the appropriate section. 

If the edition requirement applies to the entire page, place the include element after the page description paragraph. Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

### Examples

**Do:**

```
# Overview page title 

This topic provides an overview of how to use {functionality}.

<EnterpriseAlert product="{product}">
 {Description of consideration and link to product page}
</EnterpriseAlert>
```

```
## Subheading that describes a specific aspect

<EnterpriseAlert product="{product}">
 {Description of consideration and link to product page}
</EnterpriseAlert>
```

**Don't:**

```
# Overview page title 

<EnterpriseAlert product="{product}">
 {Description of consideration and link to product page}
</EnterpriseAlert>

This topic provides an overview of how to use {functionality}.
```

## Use inline alerts when calling out edition considerations on reference pages

- **keywords**: enterprise, editions, alerts, flow  
- **content sets**: docs

The design document for reference content types does not include a Requirements or Prerequisites section. Additionally, most reference pages are designed to be searched using the browser's find command. When you need to call out pricing or edition information for a flag, argument, and other reference information, use the inline enterprise-style alert box at the specific element. If the edition requirement applies to the entire page, place the alert after the page description paragraph. Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

### Examples

**Do:**

```
## Options 

You can use the following options:

- `option1`: Decription of this option. <EnterpriseAlert inline/>
- `option2`: Description of this option.
```

```
# `command` reference

The `command` performs some action.

<EnterpriseAlert product="{product}">
 {Description of consideration and link to product page}
</EnterpriseAlert>
```

**Don't:**

```
## Options 

You can use the following options:

- `option1`: Decription of this option.
   <EnterpriseAlert product="{product}">
     {Description of consideration and link to product page}
   </EnterpriseAlert>
- `option2`: Description of this option.
```

## Use the appropriate partial to communicate product maturity, deprecation warning, and pricing and packaging information

- **keywords**: writing, partials, beta, enterprise  
- **content sets**: docs, tutorials, WAF

Do not write custom alerts or messages to describe flag beta features, deprecations, or paid edition considerations. Instead, use a partial to render the appropriate standardized message. Work with your technical writer if your doc set does not have an appropriate partial.

### Examples

**Do:**

```
# Secrets import

@include 'alerts/enterprise-only.mdx'
```

**Don't:**

```
# Secrets import

<Note title="Alpha feature">
Alpha features are features in an active-development state or available early in development to provide as a tech demo experience and are subject to change. We strongly discourage using alpha features in production deployments of Vault.
</Note>
```

## Use note-style alerts to create partials that call out beta functionality

- **keywords**: beta, flow, alerts  
- **content sets**: docs, tutorials

Use the appropriate partial to add an alert box when the topic describes features that do not ship with standard community edition products or are not yet generally available. Refer to [Use the appropriate partial to communicate product maturity, deprecation warning, and pricing and packaging information](#use-the-appropriate-partial-to-communicate-product-maturity-deprecation-warning-and-pricing-and-packaging-information).

When creating the partial containing a standardized message, use note-style alert boxes. 

For tutorials, add the `beta` badge to the front matter in your markdown file. Do not attach badges to tutorials that have a cloud and open source option.

If the entire page of documentation relates to beta functionality, add a `“BETA”` badge to the navigation entry. 

Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

### Examples

**Tutorials**

```
---
products_used:
  - product: vault
    beta: true
---
```

**Documentation**

```
<Note>
This feature is in beta. Do not use beta features in production environments.
</Note>
```

## Describe edition and pricing considerations in the requirements section for topics that provide instructions

- **keywords**: enterprise, editions, alerts, flow  
- **content sets**: docs, tutorials

When the page describes using enterprise features or functionality that requires a minimum HCP plan, state the required subscriptions or editions in the requirements section and to link to appropriate marketing materials. Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for additional information.

### Examples

**Documentation**

```
# Enable audit logging

This topic describes how to enable audit logs.

## Overview

{overview}

## Requirements

- HCP Terraform account with a Plus subscription. Refer to [HCP Terraform pricing](https://www.hashicorp.com/en/products/terraform/pricing) for details.
```

---


## Fonts And Formats

# Fonts and text formatting

Follow these guidelines so that you can consistently use code font, apply letter cases, and format text.

## Use lowercase for features, components, and other regular nouns unless they are branded words

- **keywords**: capitalization, lowercase, uppercase, feature names, binaries, files
- **content sets**: docs, tutorials, WAF, certifications 

Capitalize brand names and product names as proper nouns, but use lowercase for names of features, components, binaries, files or other regular nouns unless they are branded words. Refer to the word list in the corporate style guide for exceptions and special cases.

### Examples

- "virtual machine", not "Virtual Machine"
- "consensus protocol", not "Consensus Protocol"
- "`active-active` mode', not "Active/Active mode"
- "Consul server", not "Consul Server"

## Use boldface to introduce new terms

- **keywords**: formatting, bold, terms, italics, quotes, quotation marks 
- **content sets**: docs, tutorials, WAF, certifications 

Do not use italics or quotation marks to introduce terminology. Use boldface instead.  

### Examples

**Do**

```
**Data sources** allow Terraform to use information defined outside of Terraform, defined by another independent Terraform configuration, or modified by functions.
```

**Don't**

```
_Data sources_ allow Terraform to use information defined outside of Terraform, defined by another independent Terraform configuration, or modified by functions.
```

```
"Data sources" allow Terraform to use information defined outside of Terraform, defined by another independent Terraform configuration, or modified by functions.
```

## Do not use special text formatting for names of services, applications, and programs

- **keywords**: formatting, services, applications
- **content sets**: docs, tutorials, WAF, certifications 

Do not use code font, italics, quotation marks, bold, or any other special formatting or characters for names of services, applications, and programs, but use code font when referring to an executable, such as the CLI.

### Examples

**Do**

- `Start the counting service.`
- `Stop the dashboard service.`	
- ``Run the `terraform apply` to provision the counting service.``

**Don't**

- ``Start the `counting` service.``
- `Stop the _dashboard_ service.`

## Format local URLs as code

- **keywords**: formatting, URLs, code
- **content sets**: docs, tutorials, WAF, certifications 

### Examples

``In a browser window, navigate to the UI at `http://localhost:8500`.``

## Format API endpoints and request methods as code

- **keywords**: formatting, APIs, code
- **content sets**: docs, tutorials, WAF, certifications 

### Examples

``Send a `PUT` request to the `/acl/token` endpoint to create a new token.``

## Format specific file names as code

- **keywords**: formatting, URLs, code, filename, filenames
- **content sets**: docs, tutorials, WAF, certifications 

### Examples

````
In the following example, Terraform saves the planned infrastructure changes in the `my-plan` file in the local directory:

```shell-session
$ terraform apply -out=my-plan
``` 	
````

## Use lowercase for compass directions, but capitalize the names of regions

- **keywords**: writing, directions, regions, east, west, north, south
- **content sets**: docs, tutorials, WAF, certifications

Use lowercase for compass directions, such as north, south, east, and west, but capitalize the names of regions, such as "the Southern United States".

## Do not use footnotes or endnotes to cite sources. 

- **keywords**: writing, footnotes, endnotes, citations
- **content sets**: docs, tutorials, WAF, certifications

Cite third-party work directly in the prose and link to the source.

## Capitalize job titles when introducing people, but use lower case when referring to jobs

- **keywords**: writing, capitalization, job titles
- **content sets**: docs, tutorials, WAF, certifications

### Examples

- `Armon Dadgar, Founder and CTO`
- `She is the founder of the company.`

## Do not use the registered trademark or trademark symbol unless directed to do so by HashiCorp's legal team

- **keywords**: writing, trademarks
- **content sets**: docs, tutorials, WAF, certifications
---


## Grammar

# Grammar and punctuation

These guidelines describe verb tense and how to consistently document events that occur over time.

## Always use the serial comma, also called the "Oxford" comma

- **keywords**: grammar, punctuation, commas, lists  
- **content sets**: docs, WAF, tutorials, certifications

In prose, add a comma between the second to last item and the word "and". 

### Examples

**Do:**

`Give permission to read, write, and delete.`

**Don't:**

`Give permission to read, write and delete.`

## Always write complete sentences in prose

- **keywords**: grammar, sentence fragments  
- **content sets**: docs, WAF, tutorials, certifications

Do not use sentence fragments or truncated phrases in prose. Do not split complete sentences across codeblocks, screenshots, or other elements. Do not use a list, codeblock, or other element to complete a sentence. 

### Examples

**Do:**

```
# `packer build ` command

The `packer build` command starts a build using the configurations defined in the template file.
```

````
Create a token and link it to your policy:

```shell-session
$ consul acl token create
```

````

**Don't:**

```
# `packer build ` command

Starts a build.

```

````
Run

```shell-session
$ consul acl token create
```

to link the policy to a token.
````

## Avoid mixing fragments and complete sentences in lists and tables

- **keywords**: grammar, sentence fragments, complete sentence, lists, tables  
- **content sets**: docs, WAF, tutorials, certifications

Prefer complete sentences in all cases, but be consistent when you need to use sentence fragments in non-prose constructions, such as tables and lists. If you use a sentence fragment for one cell in a table or for one item in a list, use fragments for all cells or list items.

Use parallel phrases in lists.

### Examples

**Do:**

Instead of showing the markdown, the following example shows the rendered table:

| Parameter | Description | Data type | Default |
| --- | --- | --- | --- |
| `IdleTimeout` | Specifies the total amount of time permitted for the request stream to be idle | Integer | `0` |
| `RequestTimeout` | Specifies the total amount of time in nanoseconds, including retry attempts, Consul permits for the entire downstream request to be processed | Integer | `0` |


```
You can configure the following types of gateways:

- **Mesh gateways** enable service-to-service traffic between Consul datacenters or between Consul admin partitions. They also let you federate datacenters across wide area networks.
- **Ingress gateways** enable connectivity within your organizational network from services outside the Consul service mesh to services in the mesh.
- **Terminating gateways** enable connectivity within your organizational network from services in the Consul service mesh to services outside the mesh.
```

**Don't:**

Instead of showing the Markdown, the following example shows the rendered table:

| Parameter | Description | Data type | Default |
| --- | --- | --- | --- |
| `IdleTimeout` | This parameter specifies the total amount of time permitted for the request stream to be idle. | Integer | `0` |
| `RequestTimeout` | Specifies the total amount of time Consul permits for the entire downstream request to be processed. This parameter accepts a value in nanoseconds. Includes retry attempts | Integer | `0` |


```
You can configure the following types of gateways:

- _Mesh gateways_ enable service-to-service traffic between Consul datacenters or between Consul admin partitions. lets you federate datacenters across wide area networks.
- _Ingress gateways_ - Use to connect external services to the mesh
- _Terminating gateways_ - Lets services be connected services externally
```

## Do not use parentheses, en dashes, or em dashes to separate ideas or phrases

- **keywords**: grammar, punctuation, parentheses, dashes  
- **content sets**: docs, WAF, tutorials, certifications

En dashes represent a range. Em dashes are similar to commas, but many writers use them in place of colons, semicolons, parentheses, or to create stylistic pauses. In documentation, only use parentheses when introducing acronyms or when they are characters in code samples. For consistency, use commas to separate phrases and periods to separate ideas. 

Refer to the following guidelines for additional information:

- [Spell out a phrase and place the acronym form in parentheses on first use](language#spell-out-a-phrase-and-place-the-acronym-form-in-parentheses-on-first-use)  
- [Write sentences that contain a single idea](content-organization#write-simple-sentences-that-contain-a-single-idea)

### Examples

**Do:**

```
Nomad uses the HashiCorp configuration language (HCL), which uses concise descriptions of the required steps to get to a job file. 
```

```
The organization name also must be unique. The interface prompts you to choose another name if an existing organization already has the name.
```

**Don't:**

```
Nomad uses the Hashicorp Configuration Language - HCL - designed to allow concise descriptions of the required steps to get to a job file. 
```

```
The name also must be unique — if another organization is already using the name, you will be asked to choose a different one.
```

## Do not use punctuation or text formatting to add semantic emphasis

- **keywords**: writing, punctuation, emphasis  
- **content sets**: docs, WAF, tutorials

Write in an even, consistent tone. Do not use punctuation, such as exclamation marks, or text formatting, such as bold or italics, for semantic emphasis. 

### Examples

**Do:**

- `Vault must have read permission on your source this directory to successfully load plugins. You cannot use symbolic links for the source directory.`
- `TCP (L4) services must authorize incoming connections against the Consul intentions, whereas HTTP (L7) services must authorize incoming requests against the intentions.`

**Don't:**

- `Vault _must_ have permission to read files in this directory to successfully load plugins. The value cannot be a symbolic link.`
- `Vault **must** have permission to read files in this directory to successfully load plugins. The value cannot be a symbolic link.`

## Use colons to introduce lists, tables, and visual aids

- **keywords**: writing, colons, lists, tables, visual aids  
- **content sets**: docs, tutorials, WAF, certifications 

Colons introduce lists of related information, procedural steps, tables, and visual aids. Do not use colons mid-sentence. Do not introduce a list, table, or visual aid with a sentence fragment.

To introduce a list, write a complete sentence followed by a colon. You can omit the introductory sentence when the list immediately follows a heading, such as the list of requirements on a usage page.

### Example

**Do:**

```
Use the HCP Terraform API to create, read, update, and delete the following entities:

- GPG keys
- Private providers
- Provider versions and platforms
```

```
## Requirements

- A Consul cluster with at least three nodes. 
- All Consul servers in the cluster must be on a v0.8.5 or newer.
```

**Don't:**

```
Use the HCP Terraform API to create, read, update, and delete: GPG keys, private providers, and provider versions and platforms.
```

```
## Overivew

Start by:

1. {step}
1. {step}
```

## Do not use quotation marks around file names, constructs, new terms, or to add emphasis

- **keywords**: punctuation, quotes, emphasis, terminology, code  
- **content sets**: docs, tutorials, WAF, certifications 

Use quotation marks when required in codeblocks and when referring to titles of books, articles, and other works. Otherwise, do not use them. 

### Examples

**Do:**

- `The foundation of Boundary is an identity-based, zero-trust access model.`
- `For details about Lifeguard, refer to the article titled "Making Gossip More Robust with Lifeguard" published on our blog.`	

**Don't:**

- `The foundation of Boundary is an identity-based, “Zero-Trust” access model.`
- `Terraform relies on plugins called "providers" to interact with cloud providers, SaaS providers, and other APIs.`
---


## Index

# General guidelines

- [Active voice](active-voice.md)
- [Alert boxes](alerts.md)
- [Content organization](content-organization.md)
- [Fonts and formats](fonts-and-formats.md)
- [Grammar and punctuation](grammar.md)
- [Language and word choice](language.md)
- [Links](links.md)
- [Paid offerings and pre-GA releases](enterprise-releases.md)
- [Point of view](point-of-view.md)
- [Screenshots](screenshots.md)
- [Tense and time](tense-and-time.md)
- [Titles and headings](titles-and-headings.md)
- [Variants](variants.md)
---


## Language

# Language and word choice

These guideline help you choose consistent words and phrases in prose. 

## Do not use ableist language

- **keywords**: writing, word choice, ableist  
- **content sets**: docs, tutorials, WAF, certifications

Avoid language that makes assumptions about a user's faculties or ascribes mental health conditions to processes and technologies.

For many people with different abilities, the difference between asking to "see" another topic instead of being asked to "refer" to another topic is minimal. But there are people for whom "see {link}" or "sanity check" is another reminder of their "otherness" with regard to their vision or mental health. The people who are unbothered by the language will still have a good experience and the people who are more sensitive to it will definitely feel included.

The discussion around ableist language is nuanced and can easily deviate from how to write content on behalf of HashiCorp to personal expression. Our goal is to be considerate and inclusive, so you should carefully weigh word choices so that we can avoid contributing to what can be an already frustrating experience. 

### Examples

**Do:** 

- `Refer to {link} for additional information.`
- `Perform a preliminary check to verify that the operation successfully completed.`

**Don't:**

- `See {link} for additional information.`
- `Run a sanity check to verify that the operation successfully completed.`

## Do not use gender-specific language

- **keywords**: writing, word choice, gender  
- **content sets**: docs, tutorials, WAF, certifications

Refer to general roles, such as a "developer", "engineer", or "administrator", instead of third-person pronouns. When you need to refer to a third-person pronoun, use the singular pronoun "they".  

### Examples

**Do:**

- `Distribute tokens to developers so they can access deploy services using the API.`

**Don't:**

- `Provide a token to the developer so that he can deploy services using the API.`

## Use non-violent language

- **keywords**: writing, word choice, non-violent language  
- **content sets**: docs, tutorials, WAF, certifications

Avoid describing actions using violent terms. Note that some words, such as "execution" to describe issuing a command, may be unavoidable. Explore alternatives whenever possible. Similarly, the `terraform destroy`command, which deletes infrastructure resources, has no alternatives.

### Examples

**Do:**

- ``Click *Delete* to permanently remove {element}.``
- ``Use the `kill` command to stop the process.``

**Don't:**

- `Hit the *Delete* button to permanently remove {element}.`
- `Kill the process.`

## Avoid speculative language

Do not ask readers to "imagine", "suppose", "pretend", or otherwise engage in a hypothetical situation. Instead, use concrete language to set up examples.

### Examples

**Do:**

- `In the following example, <product> deploys three server clusters to the network.`
- `In the following example, the <command> directs Vault to enable the database secrets engine.`

**Don't:**

- `Suppose that we are starting with three server clusters.`
- `Imagine that you want to use Vault commands to enable the database secrets engine.`

## Use the most specific word to describe actions between entities 

General actions such as "use" are acceptable to avoid adding long descriptions.

### Examples

Instead of a general action, such as "use", the preferred word is emphasized in the following examples:

- {product} **consumes** the configuration file. 
- The flag **passes** values into the operation.
- **Present** the token when calling the endpoint.

## Do not use figures of speech

- **keywords**: diction, metaphors, similes  
- **content sets**: docs, WAF, tutorials, certifications

Do not use metaphors, similes, colloquialisms, idiomatic expressions, or other figurative language. Refer to [Do not use words or phrases borrowed from other languages, scientific words, or jargon words](#do-not-use-words-or-phrases-borrowed-from-other-languages-scientific-words-or-jargon-words) for more guidance. 

### Examples

Do not use the following constructions or similar language:

- Six of one, half dozen of the other
- [will be] materialized
- gonna
- wanna
- y'all
- drive you up a wall
- prim and proper
- a ton

## Do not editorialize about the difficulty or comprehensibility of an action or concept

- **keywords**: diction, simply, easily, complexity  
- **content sets**: docs, WAF, tutorials, certifications

Some users may be struggling with the instructions or with understanding concepts. Using language that downplays the complexity associated with our products can turn users away. Do not use the following words or similar words that imply that a task is easy:

- easy, easily, simply
- just (as in "just run this command")
- obviously

### Examples

**Do:**

- `Click Create to add a new workspace.`
- ``Run the `consul config write` command to apply the configuration.``

**Don't:**

- `Simply click Create to add a new workspace.`
- ``Just run the `consul config write` command to apply the configuration.``

## Avoid unnecessary words

- **keywords**: diction, extra words, fewer words  
- **content sets**: docs, WAF, tutorials, certifications

Short sentences are easier to understand than sentences that contain filler words and phrases. Avoid adding words and phrases that do not affect the meaning. When possible, replace longer expressions with shorter words that have the same meaning.

### Examples

- Instead of "in order to", use "to"
- Instead of "in the case that", use "when"
- Avoid adding filler words, especially words that editorialize, such as "simply", "just", "very", and "actually". Refer to [Avoid editorializing on the difficulty or comprehensibility of an action or concept](#do-not-editorialize-about-the-difficulty-or-comprehensibility-of-an-action-or-concept).

## Use the simplest word possible

- **keywords**: diction, short words, simple words  
- **content sets**: docs, WAF, tutorials, certifications

Always use the shortest word that has the same meaning. 

### Examples

- "use", not "utilize" or "utilization": In most instances, use the root for "ize" words.
- "because” not "due to the fact that": Also refer to [Do not use figures of speech](#do-not-use-figures-of-speech).

## Do not use words or phrases borrowed from other languages, scientific words, or jargon words

- **keywords**: diction, short words, simple words  
- **content sets**: docs, WAF, tutorials, certifications

Use simple, concrete words to help our global audiences understand our content. 

### Examples

The following list contains common words and phrases that you should avoid in educational content:

| Do not use | Suggestion | Explanation |
| --- | --- | --- |
| blast radius | affected scope | metaphor, jargon |
| ergo | therefore, as a result, so | Latin word meaning "therefore" |
| etc. | " . . . and other {entities matching the description}." | Latin abbreviation of "et cetera", which means "and the rest". |
| e.g. or i.e. | "For example", "such as" | Abbreviation of Latin phrases used to give examples or restate what was previously said. |
| carte blanche | full permission, admin access | French word that literally translates to "blank document" and means "unlimited authority". |
| via | Choose a more concrete word to describe the relationship. | Latin word meaning "by way of". |
| vice versa | conversely | Latin word meaning "the other way around". |
| sanity check | preliminary check, verification, dry run | jarbon, ableist |

**Do:**

- `Some repositories may include Git submodules that you can only access using an SSH connection.`
- `Choose a set of tags relevant to your project.`
- `Vault manages credentials, tokens, and other secrets.`

**Don't:**

- `Some repositories may include Git submodules that you can only access via SSH.`
- `Choose a set of tags germane to your project.`
- `Vault manages credentials, tokens, etc.`

## Use American English spelling

- **keywords**: diction, Americn English, American spelling  
- **content sets**: docs, WAF, tutorials, certifications

For consistency and cohesiveness, spell words according to American English instead of British or Australian English. Refer to the Merriam-Webster dictionary for guidance.

## Examples

- "center", not "centre"
- "initialize", not "initialise"

## Do not use shortened or abbreviated spellings

- **keywords**: writing, abbreviations  
- **content sets**: docs, tutorials, WAF, cert

Shortened and abbreviated forms of words are common, but they may not be understandable to English as a Second Language (ESL) audiences or appropriate in formal settings. Our educational materials are friendly, but they are also professional documents. Using shortened phrases or words, even if they are widely-used and widely-understood, creates a colloquial tone that does not match our voice.  Refer to the [word list](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?tab=t.0#heading=h.7xv30zvawyfc) in the corporate style guide for additional information.

### Examples

- "repository", not "repo"
- "directory", not "dir"
- "configuration", not "config" 

## Do not ask rhetorical questions

- **keywords**: writing, questions, headings  
- **content sets**: docs, tutorials, WAF, certification

Do not use rhetorical questions in prose, as headings, or in any other construction unless you are referring to questions that appear in the product UI or are writing content for the [What is?](https://docs.google.com/document/d/1kp5AUJaQg7Wrq472Ebad9Bvi4t5UYn5TvWtjsM2HsA8/edit?tab=t.0) content type. Instead, use descriptive headings that orient readers.

Only use question marks when they are a necessary part of a code sample. 

**Do:**

```
### Verify that plugins meet Packer Plugin SDK requirements

The `packer init` command only installs plugins that have been upgraded to use the latest version of the [Packer Plugin SDK](https://github.com/hashicorp/packer-plugin-sdk). As a result, the plugins are compatible with Packer's API version v5.0. The plugin repository on GitHub must also follow a specific release format. Contact your repository maintainer if you are unsure that the plugin meets those requirements. 
```

```
## Enable your application to consume active secrets

Auto-rotating secrets maintain overlapping sets of active credentials to eliminate application downtime associated with rotation. The two newest versions of your secret are always active and available for consumption. To ensure that your application continues to consume active credentials, we recommend restarting it at least once every rotation interval. 
```

**Don't:**

```
### When should you upgrade your template?

The `packer init` command can only install plugins that have been upgraded to use the latest version of the [Packer Plugin SDK](https://github.com/hashicorp/packer-plugin-sdk), and therefore are compatible with Packer's API version v5.0. The plugin repository on GitHub also needs to use a specific release format. If you are not sure whether the plugin you use fits those requirements, you can reach out to your maintainer to ask. 
```

```
## How frequently should the secrets be consumed?

Auto-rotating secrets maintain overlapping sets of active credentials to eliminate application downtime associated with rotation. At any given time, the latest two secret versions will be active and available for consumption. To ensure that your application is always consuming active credentials, we recommend restarting it at least once every rotation interval. 
```

## Refer to a locally addressable web services as "localhost"

- **keywords**: word choice, localhost, addresses  
- **content sets**: docs, tutorials, WAF, certifications 

Refer to localhost, instead of IPv4 or IPv6 addresses, when describing a locally addressable web service. Refer to [Format IP addresses as code](../codeblocks-and-consoles/fonts-and-formats.md#format-commands-as-code) for additional guidance.

### Examples

**Do:**

``In a browser window, navigate to the UI at `http://localhost:8500`.``

**Don't:**

``In a browser window, navigate to the UI at `http://127.0.0.1:8500`.``


## Refer to the user’s local machine as "localhost" or "your local machine"

- **keywords**: word choice, localhost, addresses, local machine  
- **content sets**: docs, tutorials, WAF, certifications 

## Spell out a phrase and place the acronym form in parentheses on first use

- **keywords**: acronyms, writing, parentheses  
- **content sets**: docs, tutorials, WAF, certifications 

Unless the spelled-out words are less common than the acronym, such as HTTP or SSH, spell out the words on first use. If a non-Hashicorp product name is commonly abbreviated, write out the name of the product before using the abbreviated form. Refer to the word list in the corporate style guide for additional information.

### Examples

**Do:**

- `This topic describes how to create and manage custom policies using the open policy agent (OPA) framework.`
- `This topic describes how to configure DNS servers so that they can forward DNS queries to Consul servers.`

## Refer to HashiCorp products as "products" or "offerings" not “tools” or “tooling”

- **keywords**: writing, word choice, products, tools  
- **content sets**: docs, tutorials, WAF, certifications

Refer to [HashiCorp Voice, Style & Language Guidelines](https://docs.google.com/document/u/0/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit) for additional guidance.

## Do not refer to “HashiStack”

- **keywords**: writing, word choice, hashistack  
- **content sets**: docs, tutorials, WAF, certifications

Refer to the “HashiCorp stack", instead. Refer to [HashiCorp Voice, Style & Language Guidelines](https://docs.google.com/document/u/0/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit) for additional guidance.

## Do not use unofficial product abbreviations 

- **keywords**: writing, word choice, abbreviations  
- **content sets**: docs, tutorials, WAF, certifications

Do not use the following abbreviation: TF, TFE, TFC, TFC4B, TFCB, HCP TF, and COM. Refer to [HashiCorp Voice, Style & Language Guidelines](https://docs.google.com/document/u/0/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit) for additional guidance.

## Follow the guidance for industry terms as described in the corporate style guide

- **keywords**: writing, word choice, abbreviations  
- **content sets**: docs, tutorials, WAF, certifications

Refer to the [word list](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?tab=t.0#heading=h.7xv30zvawyfc) in the corporate style guide for guidance about industry terms.

## Refer to the documentation or website for the project

- **keywords**: writing, word choice, third-party software  
- **content sets**: docs, tutorials, WAF, certifications

For guidance on words associated with a specific software project that do not appear in our style guidance, refer to the documentation or website for the project. Use the third-party’s formatting standards to differentiate between products. For example, Kubernetes Pods and Services are always capitalized.

## Follow the guidance for page titles and meta descriptions in the content types guidance

- **keywords**: writing, metadata, page titles, descriptions  
- **content sets**: docs

Refer to [Appendix B: Metadata](https://hashicorp.atlassian.net/wiki/x/HICUpg) in the content types guidance for additional information.



---


## Links

# Links

These guidelines are intended to help you properly use links.

## Use descriptive link text that explicitly tells readers about the destination content

- **keywords**: links, linking, linked text
- **content sets**: docs, tutorial, WAF, certifications

Mid-prose links can distract readers from their task or confuse readers if the linked text targets a single word that seems randomly selected. Avoid linking single words or phrases mid-sentence unless they clearly match the title of the linked topic. Instead, write a second sentence that refers users to a related topic using the title as the linked text. 


### Examples

**Do**:

```
After defining your services and health checks, you must register them with a Consul agent. Refer to [Register Services and Health Checks](/consul/docs/services/usage/register-services-checks) for additional information.
```

```
You must also configure the HCP provider to authenticate using an [organizational-level service principal](/hcp/docs/hcp/iam/service-principal#organization-level-service-principals) and service principal key. Refer to the [Authenticate with HCP guide in the Terraform registry](https://registry.terraform.io/providers/hashicorp/hcp/latest/docs/guides/auth) for more information.
```

```
You should be familiar with AWS ECS. Refer to [What is Amazon Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) in the Amazon AWS documentation for additional information.
```

```
For additional information about the `kill` command, refer to 
[Kill Signals and Commands ](https://www.linux.org/threads/kill-signals-and-commands-revised.11625/) in the Linux documentation.
```

**Don't**:

In the following example, the author should link to the title of the article and let readers know that they are being directed to an external website.

```
For more information on different signals sent by the `kill`  command, go
[here](https://www.linux.org/threads/kill-signals-and-commands-revised.11625/)
```

In the following example, the linked text is in quotation marks, which may confuse the reader because it's not clear if the term is part of the HashiCorp lexicon or a colloquialism. And without additional context, the reader may assume that the link directs them to a conceptual article about what "bootstrapping" means.

```
A server may also be in ["bootstrap"](/consul/docs/agent/config/cli-flags#_bootstrap_expect) mode, which enables the server to elect itself as the Raft leader.
```

In the following example, the linked text may not intuitively match the destination topic. Also note that the destination is poorly structured per IA guidelines.

```
Within each region, we have both clients and servers. Servers are responsible for accepting jobs from users, managing clients, and [computing task placements](/nomad/docs/concepts/scheduling/scheduling).
```

## Never use "click here", "here", "learn more", or similar phrases as link text

- **keywords**: links, linking, linked text, click here, learn more
- **content sets**: docs, tutorial, WAF, certifications

Refer to [Use linked text that explicitly tells readers about the destination content](#use-descriptive-link-text-that-explicitly-tells-readers-about-the-destination-content) for additional information and examples.

## Avoid using raw URLs as hyperlinks in prose

- **keywords**: writing, linking, linked text, URLs
- **content sets**: docs, tutorial, WAF, certifications

Refer to [Use linked text that explicitly tells readers about the destination content](#use-descriptive-link-text-that-explicitly-tells-readers-about-the-destination-content) for additional information and examples.

## Put file extensions in parentheses when linking to PDFs and other static content

- **keywords**: links, linked text, pdf, webpages
- **content sets**: docs, tutorial, WAF, certifications

### Example

`Refer to [Some article in PDF format (PDF)](URL) for additionl information.`


---


## Point Of View

# Point of view

These guidelines describe how to address readers and when to refer to HashiCorp.

## Address the reader as "you"

- **keywords**: writing, grammar, point of view, second person, "you"  
- **content sets**: docs, WAF, tutorials, certifications 

Write in the second person by addressing the reader as "you" when describing actions that you expect the reader to perform. You can also directly tell readers to perform actions when providing instructions.

### Examples

**Do:**

- `In this tutorial, you selectively allowed services to communicate with each other by configuring Consul service mesh.`
- `HCP Terraform's API lets you create workspaces without a VCS connection.`


**Don't:**

- `Upon completing this tutorial, a user has learned to selectively allow services to communicate with each other by configuring Consul service mesh.`
- `We can use HCP Terraform's API to create workspaces without a VCS connection.`


## Use the inclusive "we" when speaking on behalf of HashiCorp

- **keywords**: writing, grammar, point of view, "we", hashicorp  
- **content sets**: docs, WAF, tutorials, certifications 

Use the inclusive "we" when providing recommendations from HashiCorp or when describing actions by the company. Alternatively, you can also use "HashiCorp" in place of "we" when referring to guidance from the company. 

### Examples

**Do:**

- `We recommend configuring VCS access when first setting up an organization.`
- `We fixed a vulnerability where some users were able to copy their session cookie from the browser bar and use it in the API to continue a session.`
- `HashiCorp is not responsible for compromised data if you do not use production-ready configurations.`

**Don't:**

- `In this example, we take the values from the previous step and add them to the configuration.`


## Do not use the inclusive "we" or personal possessives to guide readers through examples

Do not refer to "our configuration" or describe actions "we" will take in documentation unless referring to artifacts provided by, or actions performed by, HashiCorp. 

### Examples

**Do:**

- ``Add the `terraform` block to your `main.tf` file.``

**Don't:**

- `We will add the terraform block to our main.tf file.`

---


## Screenshots

# Screenshots

These guidelines describe when and how to use screenshots in your content.


## Avoid screenshots in documentation 

- **keywords**: visual aids, screenshots
- **content sets**: docs

HashiCorp UIs change too frequently and are a maintenance burden. Concise descriptions of the user workflow are simpler to keep up to date. Work worth your technical writer to determine when a screenshot may be necessary. 

## Add screenshots to tutorials according to the Education team's standards

- **keywords**: visual aids, screenshots
- **content sets**: tutorials, WAF, certifications

Refer to [Guidelines for alert boxes](../appendix.md#guidelines-for-alerts-boxes) for details.

## Remove the browser's URL bar and window elements from screenshots

- **keywords**: visual aids, screenshots
- **content sets**: tutorials, WAF, certifications

If you must include screenshots, crop out the address bar and other browser elements so that readers can focus on the product UI.

---


## Tense And Time

# Tense and time

These guidelines describe verb tense and how to consistently document events that occur over time.

## Use simple present tense to describe immediate actions

- **keywords**: writing, grammar, tense   
- **content sets**: docs, WAF, tutorials

Simple present tense describes actions or events that happen regularly, are currently happening, or are facts. Use present tense when describing chronological events, such as procedural steps and outputs. Do not describe events or actions that will happen in the future. For example, describe the results of a command as though it just happened, instead of describing it as an action that will happen. 

### Examples

**Do:**

- `The output shows that Vault is initialized and unsealed.`
- `After Consul performs a health check, the web UI reports that the service is unhealthy.`
- `Click **Next**. The server configuration screen appears.`

**Don't:**

- `The output will show that Vault is initialized and unsealed.`
- `The service's state will change to unhealthy in the web UI.`
- `Click **Next**. The server configuration screen will appear.`

## Use future tense when describing a sequences of events in a tutorial 

- **keywords**: writing, grammar, tense  
- **content sets**: tutorials

Use future tense when introducing a sequence of steps that the practitioner must follow chronologically as part of the tutorial. You can also use future tense to introduce outputs that practitioners can expect as they complete tutorials. Refer to [Use simple present tense to describe immediate actions](#use-simple-present-tense-to-describe-immediate-actions) for guidance for documentation.

### Examples

- `In this tutorial, you will deploy a Boundary cluster using the HCP portal.`
- `When the HCP Boundary deployment completes, you will be redirected to the Boundary Overview page.`


## Describe features and functionality as they currently exist 

- **keywords**: writing, grammar, tense, versions  
- **content sets**: docs, WAF, tutorials

- Do not refer to features and functionality that will be implemented in the future. 
- Except for release notes, do not use words that use relational points of time, such as "new", "old", "now", or "currently" to describe products. In release notes, you can describe features and functionality as new, for example, "{product} can now . . ."
- Reference specific versions as necessary in dedicated areas, such as the Requirements block on a usage page.
- Do not mention specific versions in the body of a document outside specific contexts, such as release notes, deprecation guides, and upgrade guides.


### Examples

**Do**

```
## Requirements 

- {product} {version} or later
- {external product or system} or later
```

```

## Requirements 

- {product} {version} or later is required to {perform specific action described in this topic}
```

**Don't:**

- `Support for additional providers will be available in the next release.`
- `In version 0.13.0, support for additional providers was added.`

## Do not communicate updates or fixes in prose


- **keywords**: writing, grammar, versions, updates, deprecations  
- **content sets**: docs, WAF, tutorials

Do not communicate updates or fixes for specific releases in prose. Instead, describe them in release notes or in a deprecations page. You should add alerts about deprecations as necessary and link to the appropriate release notes or deprecations page.

### Examples

**Do**

The following examples are partials and would not appear in the page.

```
<Note title="Deprecated feature">

  Deprecated features are functional but marked for eventual removal or
  replacement. Refer to the
  [deprecation announcements page](/vault/docs/deprecation#announcements) for
  migration details and information on
  [our deprecation process](/vault/docs/deprecation#phases).

</Note>
```

```
<Note title="Beta feature">

All APIs, workflows, and HCL syntax are subject to change. We do not guarantee backward compatibility support for the beta features that reach GA. 

</Note>
```

**Don't**

```
## Versioning 

Future APIs will increment this version, leaving the `/v1` API intact, though in the future we might deprecate certain features. In that case, we'll provide ample notice to migrate to the new API.
```

```
-> **NOTE:** The above example will give errors when working with pre-release
versions (example: `0.12.0beta1`). Future versions of this import will include
helpers to assist with processing versions that will account for these kinds of
exceptions.
```
---


## Titles And Headings

# Titles and headings

Follow these guidelines so that you can consistently format for page titles, sections headings, and navigation labels.

## Use sentence case for titles, headings, and navigation labels

- **keywords**: capitalization, headings, titles
- **content sets**: docs, tutorials, WAF, certifications

Capitalize the first word and proper nouns in page titles, headings, navigation labels. Proper nouns include product, company, and brand names, but not feature names, concepts, or constructs within a product.

### Examples

```
# Create a static credential store
```

```
## Create a role
```

```
{
   "title": "Secrets management tools",
   "path": "overview/vs/secrets-management"
},
```


## Use simple present tense in titles, headings, and navigation labels

- **keywords**: writing, tense, headings, titles
- **content sets**: docs, tutorials, WAF, certifications

Simple present tense describes actions or events that happen regularly, are currently happening, or are facts. 

## Examples

- "Configure proxies", instead of "Configuring proxies
- "Provision infrastructure", instead of "Provisioning infrastructure"

## Nest headings sequentially according to header level markdown

- **keywords**: writing, headings, nesting, markdown
- **content sets**: docs, tutorials, WAF, certifications

Readers use the hierarchy to understand how topics relate to each other. The following table describes when to use a heading:

| HTML heading | Markdown | Child of | Explanation |
| --- | --- | --- | --- |
| H1 | # | None | The main topic and title of the page. Use one H1 per page. |
| H2 | ## | H1 | A specific aspect of or argument related to the main topic. Second level headings can be related to each other, but should stand on their own as components of the H1. Many H2s are predefined in the [content types guidelines](https://hashicorp.atlassian.net/wiki/spaces/TW/pages/2673180793/Content+types+overview). |
| H3 | ### | H2 | Provides specific details or layers of organization to the idea expressed in its parent H2. |
| H4 | #### | H3 | A subset of information expressed in its parent H3. Consider splitting the page into multiple related topics in the same folder if your content reaches H4 headings and beyond.  |

### Examples

**Do**

```
## Requirements

Verify that your system meets the following requirements.

### ACLs
 . . .
```

**Don't**

```
# Requirements

Verify that your system meets the following requirements.

#### ACLs
 . . .
```
---


## Variants

# Variants

These guidelines provide at-a-glance reference for using variants. For complete guidance on how to use the variants markdown component, refer to [Guidelines for variants](../appendix.md#guidelines-for-variants).

## Use sentence case for variant, variant option, and tab names

- **keywords**: variants, capitalization, headings
- **content sets**: tutorials, WAF, certifications

## Do not place H2-level headings in variants

- **keywords**: variants, capitalization, headings
- **content sets**: tutorials, WAF, certifications

## Use the variants component to add variations of the same information for different audiences

- **keywords**: variants, writing, headings
- **content sets**: tutorials, WAF, certifications



---


## Appendix

# Appendix - Additional Guidelines

## Guidelines for Screenshots in Tutorials

- **keywords**: screenshots, visual aids, images
- **content sets**: tutorials, WAF, certifications

Use Chrome Developer Tools at iPad Pro dimensions for consistency.

Use Snagit to edit and annotate images with specific hex colors:
- Primary: #F92672
- Alternative: #0D44CC

Store images in product directories with descriptive, underscore-separated filenames. Prefix diagram images with `diagram_`.

Use descriptive alt text without phrases like "image of".

Employ inline links rather than reference-style links.

### Product-Specific Naming

**Terraform**: Replace "app.terraform.io_app" with "hcp_tf"

**Vault**: Follow format `(platform|diagram|ui)_(section)-(subsection)*_(operation)`

**Consul/Nomad**: Use `<common or collection>-<product>-<description>` structure

## Guidelines for Alert Boxes

Alerts should be used sparingly to flag beta, enterprise, or paid features—not as paragraph replacements.

**Character limit**: Keep messages under 270 characters and concise.

### Alert Types and Usage

- **`<Tip/>`**: Optional settings and best practices
- **`<Note/>`**: User action may be needed
- **`<Warning/>`**: Required actions addressing breaking changes or security
- **`<EnterpriseAlert/>`**: Paid edition or enterprise features

### Alert Restrictions

- Avoid consecutive alerts
- Don't begin topics with alerts
- No images or code blocks within alerts
- Remove outdated alerts

## Guidelines for Variants

Variants display information for different audiences (like programming languages).

Be extremely mindful when deciding on a variant and variant option slug. Keep names approximately 20 characters using sentence-style capitalization.

Avoid H2 headers within variants.

Reference existing variant types before creating new ones.

---


## Markdown Standards

# Markdown Standards

These guidelines ensure consistent markdown formatting across documentation, tutorials, and certification materials.

## Use hash-style headings

- **keywords**: markdown, headings, formatting
- **content sets**: docs, tutorials, WAF, certifications

Format headings using the `#` symbol syntax in markdown rather than alternative formatting methods. This approach ensures consistency across all content.

### Example

**Do:**

```markdown
# Main Heading
## Subheading
### Sub-subheading
```

**Don't:**

```markdown
Main Heading
============

Subheading
----------
```

## Avoid markdown headings inside tabs

- **keywords**: markdown, headings, tabs, components
- **content sets**: docs, tutorials, WAF, certifications

Do not place markdown heading syntax within tab components. Placing headings inside a tab can cause problems. For example, H2 headings inside tabs affect the table of contents and linking to H3 headings placed inside a tab can negatively affect the user experience.

Instead of using markdown headings in tabs, utilize the `heading` attribute within tab components.

### Example

**Do:**

```markdown
<Tabs>
<Tab heading="CLI command">
Content
</Tab>
<Tab heading="API call using cURL">
Content
</Tab>
</Tabs>
```

**Don't:**

```markdown
<Tabs>
<Tab>
## CLI command
Content
</Tab>
<Tab>
## API call using cURL
Content
</Tab>
</Tabs>
```

## Use double asterisks for bold text

- **keywords**: markdown, formatting, bold
- **content sets**: docs, tutorials, WAF, certifications

Use double asterisks (`**text**`) rather than underscores to emphasize words in documentation.

### Example

**Do:**

```markdown
Use the **bold** command to emphasize text.
```

**Don't:**

```markdown
Use the __bold__ command to emphasize text.
```

## Avoid combining multiple formatting styles

- **keywords**: markdown, formatting, inline styles
- **content sets**: docs, tutorials, WAF, certifications

Avoid combining multiple formatting styles in prose. For instance, don't mix italics with bold or code formatting on the same phrase—pick one method to maintain clarity.

### Example

**Do:**

```markdown
Use the `terraform init` command to initialize the directory.
```

**Don't:**

```markdown
Use the **`terraform init`** command to initialize the directory.
```

## Use hyphens for unordered lists

- **keywords**: markdown, lists, formatting
- **content sets**: docs, tutorials, WAF, certifications

Use hyphens (`-`) as bullet markers. Don't use asterisks or plus signs, which can create confusion with italic/bold syntax at list item starts.

### Example

**Do:**

```markdown
- First item
- Second item
- Third item
```

**Don't:**

```markdown
* First item
* Second item
* Third item
```

## Start ordered list items with 1

- **keywords**: markdown, lists, formatting, ordered lists
- **content sets**: docs, tutorials, WAF, certifications

Start every item with `1.` instead of sequential numbering. The platform automatically renders consecutive "1." entries as incremental numbers, reducing manual errors.

### Example

**Do:**

```markdown
1. First step
1. Second step
1. Third step
```

**Don't:**

```markdown
1. First step
2. Second step
3. Third step
```

## Use appropriate spacing in lists

- **keywords**: markdown, lists, formatting, spacing
- **content sets**: docs, tutorials, WAF, certifications

Simple, short lists use single spacing between items. Complex lists with long items, nested content, or code examples need blank lines between entries. Always include blank lines before and after the entire list.

### Examples

**Do (simple list):**

```markdown
- Short item
- Another short item
- Third short item
```

**Do (complex list):**

```markdown
- First item with a longer explanation that spans multiple lines
  and continues here.

- Second item that includes code:

  ```shell-session
  $ terraform init
  ```

- Third item with additional context.
```

## Add blank lines between structural elements

- **keywords**: markdown, formatting, spacing
- **content sets**: docs, tutorials, WAF, certifications

Add an extra line space between headings and the next element to ensure proper visual separation between sections and their content.

### Example

**Do:**

```markdown
## Configuration

The following example shows how to configure the service.

```hcl
config = "value"
```
```

## Exclude domain from internal links

- **keywords**: markdown, linking, internal links
- **content sets**: docs, tutorials, WAF, certifications

Exclude the 'developer.hashicorp.com' domain when linking to internal content. Use relative links instead of absolute URLs when directing readers to other pages within the HashiCorp developer documentation site. This approach simplifies link maintenance and improves portability of content.

### Example

**Do:**

```markdown
Refer to [Permissions](/terraform/cloud-docs/permissions) for additional information.
```

**Don't:**

```markdown
Refer to [Permissions](https://developer.hashicorp.com/terraform/cloud-docs/permissions) for additional information.
```

---


## UI Components

# UI Components

These guidelines describe how to consistently document user interface interactions.

## Format UI Elements

- **keywords**: UI, formatting, interface
- **content sets**: docs, tutorials, WAF, certifications

Match capitalization, punctuation, and other formatting elements to the UI. Use bold for interactive elements like buttons and menus. Do not use quotation marks around UI names.

### Examples

**Do:**

- `Click **Save and Close**.`
- `Select the **Automatically check for updates** option.`
- `In the **Settings** window, click **Advanced**.`

**Don't:**

- `Click "Save and Close".`
- `Click the Save and Close button.`

## Use Specific Action Verbs

- **keywords**: UI, actions, verbs
- **content sets**: docs, tutorials, WAF, certifications

Use precise verbs based on interaction type:

- **Press** for keyboard keys
- **Click** for buttons, tabs, toggles, and similar interactive components
- **Select** for choosing from grouped elements like checkboxes or radio buttons

### Examples

**Do:**

- `Press **Enter** to confirm.`
- `Click **Create Workspace**.`
- `Select the **Enable TLS** checkbox.`

## Use Correct Prepositions

- **keywords**: UI, prepositions
- **content sets**: docs, tutorials, WAF, certifications

Prepositions vary by component type:

- Use **in** for windows, panes, dialogs, and text boxes
- Use **on** for pages

### Examples

**Do:**

- `In the **Configuration** dialog, enter your credentials.`
- `On the **Settings** page, configure your preferences.`
- `In the **Name** field, enter the workspace name.`

---


## Codeblocks And Consoles

# Codeblocks and Consoles

These guidelines help you organize and format code examples and command-line content.

## Format commands as code

- **keywords**: code blocks, commands, formatting
- **content sets**: docs, tutorials, WAF, certifications

Commands should be presented in code blocks with proper syntax highlighting. This helps with proper rendering and future styling improvements.

### Example

**Do:**

````
Run the following command to initialize Terraform:

```shell-session
$ terraform init
```
````

## Use shell-session for Linux commands

- **keywords**: code blocks, CLI, syntax highlighting
- **content sets**: docs, tutorials, WAF, certifications

Employ the `shell-session` syntax highlighter for CLI examples. This helps with proper rendering and future styling improvements.

### Example

**Do:**

````
```shell-session
$ vault status
```
````

**Don't:**

````
```bash
$ vault status
```
````

## Use double pound signs for comments in CLI code blocks

- **keywords**: code blocks, comments, CLI
- **content sets**: docs, tutorials, WAF, certifications

Precede comments with double pound signs (`##`) rather than single `#`. This prevents shell syntax highlighters from treating comments as root prompts.

### Example

**Do:**

````
```shell-session
$ export VAULT_ADDR="http://127.0.0.1:8200"
## Set the namespace to admin
$ export VAULT_NAMESPACE=admin
```
````

**Don't:**

````
```shell-session
$ export VAULT_ADDR="http://127.0.0.1:8200"
# Set the namespace to admin
$ export VAULT_NAMESPACE=admin
```
````

## Use long-form commands for HashiCorp CLIs

- **keywords**: CLIs, commands, HashiCorp
- **content sets**: docs, tutorials, WAF, certifications

Use long-form command names, flags, and options in code examples for HashiCorp tools. Optionally demonstrate short-form equivalents separately.

### Example

**Do:**

````
```shell-session
$ terraform plan --var-file="production.tfvars"
```
````

**Don't:**

````
```shell-session
$ terraform plan -var-file="production.tfvars"
```
````

## Use common short flags for non-HashiCorp CLIs

- **keywords**: CLIs, commands
- **content sets**: docs, tutorials, WAF, certifications

Short flags are acceptable for non-HashiCorp tools when they represent common usage patterns.

### Example

**Do:**

````
```shell-session
$ docker exec -it container_name bash
```
````

## Split long commands across multiple lines

- **keywords**: code blocks, commands, formatting
- **content sets**: docs, tutorials, WAF, certifications

Split commands exceeding 100 characters across multiple lines using the shell's line continuation character (backslash).

### Example

**Do:**

````
```shell-session
$ terraform apply \
  -var-file="production.tfvars" \
  -var="region=us-west-2" \
  -var="instance_type=t3.medium"
```
````

## Include sample output for commands

- **keywords**: code blocks, commands, output
- **content sets**: docs, tutorials, WAF, certifications

Include sample output to confirm commands work as intended. Remove timestamps from output. Use commented ellipsis to truncate unnecessary content. Explicitly state when commands produce no output.

### Example

**Do:**

````
Run the following command:

```shell-session
$ vault status
Key             Value
---             -----
Seal Type       shamir
Initialized     true
Sealed          false
## ...
```
````

**Do (no output):**

````
Run the following command. It produces no output on success.

```shell-session
$ vault policy write admin admin.hcl
```
````

## Indent code blocks in lists with four spaces

- **keywords**: code blocks, lists, indentation
- **content sets**: docs, tutorials, WAF, certifications

Code blocks within lists require four-space indentation to prevent list disruption and pass validation hooks.

### Example

**Do:**

````
1. Initialize the Terraform directory.

    ```shell-session
    $ terraform init
    ```

1. Apply the configuration.

    ```shell-session
    $ terraform apply
    ```
````

## Use spaces for indentation

- **keywords**: code blocks, indentation, formatting
- **content sets**: docs, tutorials, WAF, certifications

Use spaces rather than tabs for indentation (unless the language requires tabs like Go). Tabs display inconsistently across browsers and cause copy errors.

## Match syntax highlighting to file type

- **keywords**: code blocks, syntax highlighting
- **content sets**: docs, tutorials, WAF, certifications

Match highlighting labels to the file type being demonstrated. Use `javascript` label for JSON containing unsupported characters (allows comments).

### Example

**Do (HCL file):**

````
```hcl
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
```
````

**Do (JSON with comments):**

````
```javascript
{
  "version": "1.0",
  // This is a comment
  "name": "example"
}
```
````

## Use angle brackets for placeholder values

- **keywords**: code blocks, placeholders
- **content sets**: docs, tutorials, WAF, certifications

Enclose variable text in angle brackets to clearly indicate where users should substitute actual values.

### Example

**Do:**

````
```shell-session
$ export VAULT_TOKEN=<your-token-value>
```
````

**Don't:**

````
```shell-session
$ export VAULT_TOKEN=YOUR_TOKEN
```
````

## Do not use command names as verbs

- **keywords**: writing, word choice, CLIs, commands
- **content sets**: docs, tutorials, WAF, certifications

Refer to "the {command words} command" instead of using the command name as a verb for clarity.

### Example

**Do:**

```
To download providers, run the `terraform init` command in the directory containing the `main.tf` file.
```

**Don't:**

```
To download providers, `init` the directory containing the `main.tf` file.
```

## Use language matching product keywords

- **keywords**: writing, formatting, configuration, keys, values, code
- **content sets**: docs, tutorials, WAF, certifications

When describing code, configurations, settings, modes, and other elements, refer to specific keys or values and format them as code.

### Examples

**Do:**

- `Add an `actions` field to your configuration to specify which actions clients can perform on the resources.`
- `Set the `mode` to `active-active` to configure Terraform Enterprise to store and retrieve data from external sources.`

**Don't:**

- `Add Actions to your configuration and specify which actions clients are allowed to perform on the resources.`
- `Operate Terraform Enterprise in Active-Active mode to configure Terraform Enterprise to store and retrieve data from external sources.`

## Avoid providing instructions in code comments

- **keywords**: code blocks, comments, writing
- **content sets**: docs, tutorials, WAF

Use comments to enhance clarity, but call out pertinent details from the code block when discussing the block instead of using comments to document instructions, functionalities, or other characteristics.

### Examples

**Do:**

````
The following configuration requires the `aws` provider version 2.7.0 or later from the public Terraform registry:

```hcl
terraform {
  required_providers {
    aws = {
      version = ">= 2.7.0"
      source = "hashicorp/aws"
    }
  }
}
```
````

**Don't:**

````
```hcl
terraform {
  required_providers {
    aws = {
      version = ">= 2.7.0"  ## Adds the required version
      source = "hashicorp/aws" ## Where Terraform should get the provider from
    }
  }
}
```
````

## In tutorials, introduce code blocks with a descriptive imperative sentence

- **keywords**: code blocks
- **content sets**: tutorials, WAF

The sentence before a code block describes a high-level operation that is expressed by the command. End with a period.

### Example

````
Write out the policy named `exampleapp` that enables the `read` capability for secrets at path `secret/data/exampleapp/config`.

```shell-session
$ vault policy write exampleapp - <<EOH
path "secret/data/exampleapp/config" {
  capabilities = ["read"]
}
EOH
```
````

## In documentation, introduce code blocks as examples

- **keywords**: code blocks, examples
- **content sets**: docs

In documentation, describe an action and provide example configurations and commands whenever possible. Introduce examples by describing the actions the configuration or command represents.

### Example

````
The following configuration requires the `aws` provider version 2.7.0 or later from the public Terraform registry:

```hcl
terraform {
  required_providers {
    aws = {
      version = ">= 2.7.0"
      source = "hashicorp/aws"
    }
  }
}
```
````

## Add one product command per code block

- **keywords**: CLIs
- **content sets**: docs, tutorials, WAF, certifications

Do not place a sequence of product commands in the same block. Instead, place them in separate blocks so that practitioners have the context for running each command. When adding example commands related to the task but not the product, you can chain multiple commands for their convenience.

### Examples

**Do:**

````
1. Return to the terminal and set the `VAULT_TOKEN` environment variable.

   ```shell-session
   $ export VAULT_TOKEN=<token>
   ```

1. Set the `VAULT_NAMESPACE` environment variable to `admin`.

   ```shell-session
   $ export VAULT_NAMESPACE=admin
   ```
````

````
```shell-session
$ mkdir /tmp/learn-vault-lab && export HC_LEARN_LAB="/tmp/learn-vault-lab"
```
````

**Don't:**

````
Set the environment variables.

```shell-session
$ export VAULT_ADDR="http://127.0.0.1:8200"
$ export VAULT_TOKEN=<token>
$ export VAULT_NAMESPACE=admin
```
````

---


## Numbers Dates And Time

# Numbers, Dates, and Time

These guidelines ensure consistent formatting of numerical values, dates, and time references.

## Spell out ordinal numbers

- **keywords**: numbers, ordinals
- **content sets**: docs, tutorials, WAF, certifications

Spell out ordinal numbers that indicate position.

### Example

**Do:**

```
The first step is to initialize the configuration.
The second iteration of the loop processes the data.
```

**Don't:**

```
The 1st step is to initialize the configuration.
The 2nd iteration of the loop processes the data.
```

## Spell out numbers zero through nine

- **keywords**: numbers, writing
- **content sets**: docs, tutorials, WAF, certifications

Spell out numbers zero through nine in general writing. However, use numerals when describing technical quantities like storage capacity. Apply non-breaking spaces between numerals and units unless they form compound descriptions.

### Examples

**Do:**

```
The system can handle three concurrent connections.
Configure the service with 1 GB of memory.
Use a 64-bit processor for optimal performance.
```

**Don't:**

```
The system can handle 3 concurrent connections.
Configure the service with one gigabyte of memory.
Use a 64 bit processor for optimal performance.
```

## Use numerals with dashes for ranges including 0-9

- **keywords**: numbers, ranges
- **content sets**: docs, tutorials, WAF, certifications

Use numerals with dashes for clarity in ranges, even when the range includes numbers zero through nine.

### Examples

**Do:**

```
Ports 8000 - 9000 must be open.
Restart all clients in zones from two to four.
```

**Don't:**

```
Ports 8000 to 9000 must be open.
Restart all clients in zones from 2 - 4.
```

## Spell out the month and use cardinal numbers for dates in prose

- **keywords**: formatting, dates
- **content sets**: docs, tutorials, WAF, certifications

Do not abbreviate months. When including a day of the week, do not abbreviate the day.

### Example

```
We will release the final version of Terraform Enterprise that supports Replicated in November 2024. HashiCorp will support this release until April 1, 2026.
```

## Use YYYY-MM-DD format in tables, lists, titles, and non-prose elements

- **keywords**: formatting, dates
- **content sets**: docs, tutorials, WAF, certifications

When adding dates as part of a reference, such as a releases page, use YYYY-MM-DD format.

### Example

```
# Release notes

This page contains release information about {product}.

## 2024-11-15

- New feature
- Bug fix
- Other changes

## 2024-10-20

- New feature
- Bug fix
- Other changes
```

## Use YYYY-MM-DDThh:mm:ss format for timestamps

- **keywords**: formatting, timestamps
- **content sets**: docs, tutorials, WAF, certifications

In most cases, timestamps include the hours, minutes, and seconds, but depending on the context, you may add the year, month, and day as necessary.

### Example

````
At `2024-11-11T15:51:21.680-0800`, the server initialized the LAN area manager:

```
...
2024-11-11T15:51:21.680-0800 [INFO]  agent.router: Initializing LAN area manager
...
```
````

## Use the 12-hour clock for time of day and include a time zone

- **keywords**: formatting, time, clock
- **content sets**: docs, tutorials, WAF, certifications

You can look up time zone abbreviations at [www.timeanddate.com](https://www.timeanddate.com/time/zones/).

### Example

`The regular maintenance window begins at 12:00 AM PST.`

## Use commas in base-10 numbers with more than three digits, except for port numbers

- **keywords**: numbers, ranges
- **content sets**: docs, tutorials, WAF, certifications

Except for port numbers, use commas between three-digit sets when the number has four or more digits.

### Examples

- `10,000 users`
- `Port 8080` (no comma)
- `1,234,567 records`

## Format port numbers as code

- **keywords**: formatting, port numbers, code
- **content sets**: docs, tutorials, WAF, certifications

### Example

``Access the service on port `8080`.``

## Format IP addresses as code

- **keywords**: formatting, IP addresses, code
- **content sets**: docs, tutorials, WAF, certifications

### Example

``Navigate to `192.168.1.1` in your browser.``

---

