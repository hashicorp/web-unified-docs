# Content organization

These guidelines are intended to help you organize information in a consistent manner when describing code and commands.

## Avoid providing instructions and documenting functionality in code comments

- **keywords**: code blocks, comments, writing
- **content sets**: docs, tutorials, WAF

Use comments to enhance clarity, but call out pertinent details from the code block when discussing the block instead of using comments to document instructions, functionalities, or other characteristics.

### Example

**Do**

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

**Don't**

````
```hcl
terraform {
  required_providers {
    aws = {
      version = ">= 2.7.0"  ## Adds the required version
      source = "hashicorp/aws" ## Where Terraform should get the provide from
    }
  }
}
```
````

## In tutorials, introduce code blocks with a descriptive imperative sentence that ends with a period

- **keywords**: code blocks
- **content sets**: tutorials, WAF

The sentence before a code block describes a high-level operation that is expressed by the command.

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

## In documentation, introduce code blocks as examples and explain the actions represented in the block

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

- **keywords: CLIs**
- **content sets**: docs, tutorials, WAF, certifications

Do not place a sequence of product commands in the same block. Instead, place them in separate blocks so that practitioners have the context for running each command. When adding example commands related to the task but not the product, you can chain multiple commands for their convenience.

### Examples

**Do**

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

**Don't**

````
Set the environment variables.

```shell-session
$ export VAULT_ADDR="http://127.0.0.1:8200"
$ export VAULT_TOKEN=<token>
$ export VAULT_NAMESPACE=admin
```
````