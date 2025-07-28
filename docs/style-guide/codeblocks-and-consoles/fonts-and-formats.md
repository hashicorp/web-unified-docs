# Fonts and formats

Follow these guidelines for formatting content that appears in code snippets and CLIs.

## Format commands as code

- **keywords**: formatting, CLIs, commands, code
- **content sets**: docs, tutorials, WAF, certifications

## Use shell-session for Linux shell commands

- **keywords**: CLIs, shell-session, syntax highlighting
- **content sets**: docs, tutorials, WAF, certifications

Use `shell-session` syntax highlighting for CLIs.

### Example

````
The following command writes a policy named `exampleapp`:

```shell-session
$ vault policy write exampleapp - <<EOH
path "secret/data/exampleapp/config" {
  capabilities = ["read"]
}
EOH
````

## Use `##` in code blocks to indicate comments in CLI code blocks 

- **keywords**: code, CLIs, comments
- **content sets**: docs, tutorials, WAF, certifications

Use double pound-signs ("##") preceding a comment. This prevents the shell syntax highlighter from treating the comment as a shell command following a root prompt. This will also facilitate eventual styling to make the prompt characters non-selectable.

Note that you should avoid using comments as documentation. Refer to [Avoid providing instructions and documenting functionality in code comments](organization.md#avoid-providing-instructions-and-documenting-functionality-in-code-comments) for additional guidance.

## Use long forms of commands, flags, and options in code blocks when describing HashiCorp CLI    

- **keywords**: CLIs, commands, flags, options
- **content sets**: docs, tutorials, WAF, certifications

You can also optionally demonstrate short forms of CLI keywords.

## Use short command flags for a non-Hashicorp CLI when it is common usage

- **keywords**: CLIs, commands, flags, options
- **content sets**: docs, tutorials, WAF, certifications

### Example

````
Start an interactive shell on the running container named `my-container`.

```shell-session
$ docker exec -it my-container sh
```
````

## Split long commands across multiple lines

- **keywords**: CLIs, commands
- **content sets**: docs, tutorials, WAF, certifications

Commands that exceed 100 characters overflow the rendered code block. Use the shell's line continuation character to continue commands across multiple lines.

### Example

````
```shell-session
$ docker run \
      --name postgres \
      --env POSTGRES_USER=root \
      --env POSTGRES_PASSWORD=rootpassword \
      --detach  \
      --publish 5432:5432 \
      postgres
```
````

## Include output printed to the console but remove timestamps

- **keywords**: CLIs, output, timestamps
- **content sets**: docs, tutorials, WAF, certifications

Always help users confirm that commands work as expected by including some output. Truncate unhelpful output with a commented ellipsis. When there is no output, state that explicitly.

## Indent code blocks that appear in a list

- **keywords**: CLIs, lists
- **content sets**: docs, tutorials, WAF, certifications

Code blocks that are associated with list items should be indented four spaces to avoid breaking the list. One of the commit hooks in the tutorials repository removes indentation when code blocks are indented two spaces. Four spaces pass the commit hook and renders correctly.

### Example

````
1. Initialize the configuration.

    ```shell-session
    $ terraform init
    ```

1. Apply the configuration. Respond to the confirmation prompt with a `yes`.

    ```shell-session
    $ terraform apply
    ```
````

## Use spaces, not tabs, to indent example code in a code block unless required by the code

- **keywords**: markdown, indentation, tabs, code, golang 
- **content sets**: docs, tutorials, WAF, certifications

Unless the language of the code sample requires it, such as Golang, never use tabs. Tabs appear as different widths in different browsers and tend to result in errors when copying. 

## Use the appropriate syntax highlighting label

- **keywords**: code, syntax 
- **content sets**: docs, tutorials, WAF, certifications

When providing example code, use the syntax highlighting label that matches file type.

### Example

````
```json
"key": "value"
```
````

## Use the `javascript` syntax label for JSON that contains unsupported characters

keywords: code, syntax, JSON, javascript 
- **content sets**: docs, tutorials, WAF, certifications

You should describe how configuration and code samples operate when you introduce them instead of using comments. Refer to [In documentation, introduce code blocks as examples with an explanation of the actions represented in the block](../general/content-organization.md#in-documentation-introduce-code-blocks-as-examples-with-an-explanation-of-the-actions-represented-in-the-block) for additional information.

When you must add comments in JSON snippets, such as to add ellipses that represent additional code in the example, use the JavaScript syntax highlighter.

### Example

````
```javascript
{
  // ...
  "foo": "bar"
}
```
````

## Place stand-in text in angle brackets

- **keywords**: code, variables, stand-in text, replacement values
- **content sets**: docs, tutorials, WAF, certifications

Place stand-in text, such as words indicating a general command line argument or value in a configuration, in angle brackets.

### Example

````
Run the `consul agent` command and specify the location of the `-config-file`:

```shell-session
$ consul agent -config-file <path/to/file>
```
````

