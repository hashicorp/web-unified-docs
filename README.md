# Web Unified Docs

This repository contains documentation for all IBM's HashiCorp products.

If you are a developer working on the documentation website, refer to [DEVELOPMENT.md](DEVELOPMENT.md).

For full details on contributing documentation content, refer to the [Contribute to HashiCorp documentation](CONTRIBUTING.md) guide.

## Contributor Quick Start

We welcome contributions to our documentation. Feel free to open issues or pull requests like any normal GitHub project. Detailed information about the repository structure, workflows, and local preview are available in the [Contribute to HashiCorp documentation](CONTRIBUTING.md) guide.

Documentation content is located in the `content` directory, with subdirectories organized by product.

### Local Preview

You can preview the site and any local changes you make in your browser using the local preview function.

#### Requirements

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for managing containers)

#### Preview the site

Run `make` from the root of the repository (usually `web-unified-docs`).

The process of building the containers and assembling content takes some time.  You must wait for the process to complete before you can successfully test content in the preview environment.

Once the website creation process has finished, access the local preview at `http://localhost:3000`.

To gracefully shut down the preview environment, run `make clean` in a separate terminal window. You can also run `make clean CLEAN_OPTION=full` to shutdown the environment and remove the local Docker images.
