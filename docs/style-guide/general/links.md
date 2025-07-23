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

