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