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
