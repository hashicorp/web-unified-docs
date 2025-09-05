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
