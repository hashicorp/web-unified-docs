# Language and word choice

These guideline help you choose consistent words and phrases when describing code and commands.

## Do not use the command name as a verb

- **keywords**: writing, word choice, CLIs, commands
- **content sets**: docs, tutorials, WAF, certifications

Refer to "the {command words} command", instead of "a {command words}" for clarity. 

### Examples

**Do**:

``To download providers, run the `terraform init` command in the directory containing the `main.tf` file.``

**Don't**

``To download providers, `init` the directory containing the `main.tf` file.``

## Use language that matches keywords built into the product

- **keywords**: writing, formatting, configuration, keys, values, code
- **content sets**: docs, tutorials, WAF, certifications

When describing code, configurations, settings, modes, and other elements, refer to specific keys or values and format them as code.

### Examples

**Do**

```
Add an `actions` field to your configuration to specify which actions clients can perform on the resources.
```

```
Set the `mode` to `active-active` to configure Terraform Enterprise to store and retrieve data from external sources.
```

**Don't**

```
Add Actions to your configuration and specify which actions clients are allowed to perform on the resources.
```

```
Operate Terraform Enterprise in Active-Active mode to configure Terraform Enterprise to store and retrieve data from external sources.
```

