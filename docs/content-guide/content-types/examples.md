# Examples

Use examples to reinforce configuration syntax and usage patterns where appropriate. Configuration reference pages have an [examples block](building-blocks.md#examples) that help reinforce the syntax and behavior associated with each configuration item. Example configuration is the domain of the configuration reference type.

Do not use the examples block in [usage pages](usage.md). Instead, add inline examples to reinforce how to perform an action. Example commands, UI interactions, and other actions are within the domain of usage content types.

## Guidance

  * Always introduce an example by describing the intended purpose. Use the names of artifacts and components to describe outcomes. For example, “The following example command applies the `filename.hcl` configuration:”

  * All commentary should come before the example. If you must continue a discussion related to an example, avoid directional language, such as “above” or “previous”, so that readers that may not be reading from top to bottom are not confused. Instead, use concrete reference points, for example, “In the `[Name of the example](link)` example, . . ."

  * To more effectively reinforce the actions described in usage pages, add blocks of configuration to your inline examples as necessary, but do not repeat or replicate example configurations in usage pages.

## Examples

The following multi-step block contains an inline example in the final step:

```mdx
## Register the service

Provide the service definition to the Consul agent to register your proxy service. You can use the same methods for registering proxy services as you do for registering application services:

- Place the service definition in a Consul agent's configuration directory and start, restart, or reload the agent. Use this method when implementing changes to an existing proxy service.
- Use the `consul services register` command to register the proxy service with a running Consul agent.
- Call the `/agent/service/register` HTTP API endpoint to register the proxy service with a running Consul agent.

Refer to [Register services and health checks](/consul/docs/services/usage/register-services-checks) for instructions.

In the following example, the `consul services register` command registers a proxy service stored in `proxy.hcl`:

```shell-session
$ consul services register proxy.hcl
```

```
The following example demonstrates an appropriate use of a configuration block as part of an inline example:

```mdx
 1. Create a configuration entry and specify the `Kind` as `"exported-services"`.

  <CodeBlockConfig filename="peering-config.hcl" hideClipboard>

  ```hcl
  Kind = "exported-services"
  Name = "default"
  Services = [
    {
      ## The name and namespace of the service to export.
      Name      = "service-name"
      Namespace = "default"

      ## The list of peer clusters to export the service to.
      Consumers = [
        {
          ## The peer name to reference in config is the one set
          ## during the peering process.
          Peer = "cluster-02"
        }
      ]
    }
  ]
  ```

  </CodeBlockConfig>

1. Add the configuration entry to your cluster.

  ```shell-session
  $ consul config write peering-config.hcl
  ```

Before you proceed, wait for the clusters to sync and make services available to their peers. To check the peered cluster status, [read the cluster peering connection](/consul/docs/connect/cluster-peering/usage/manage-connections#read-a-peering-connection).

```
Refer to [Examples](building-blocks.md#examples) for configuration reference examples.
