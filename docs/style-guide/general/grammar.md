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