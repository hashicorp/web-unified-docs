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