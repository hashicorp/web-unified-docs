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