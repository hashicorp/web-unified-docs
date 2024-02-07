# Sentinel Documentation

This project contains the documentation for HashiCorp Sentinel.

## Local Development

There are two ways that the website can be run locally. If you do not have node installed and prefer not to, it can be run through Docker. The caveat here is that everything will be a little bit slower due to the additional overhead, so for frequent contributors it may be worth it to install node. Additionally, if the modifications you are introducing change the node dependencies, you will need to rebuild the Docker container in order for the dependency changes to appear, as the Docker workflow build pre-installed dependencies into the image so that they do not need to be re-installed each time it runs.

### Local Development with Docker

To run the website in a Docker container, you must have Docker installed, but do not need node to be installed. To run with docker, you can run `make` to run the website in development mode. If you are changing node depencencies you will need to run `make build-image` to generate a local Docker image with updated dependencies, then `make website-local` to use that image.

In order to make this workflow simple, there is a circleci task called `release-website-docker-image`. This task runs when website dependencies change on code that is pushed to `master`, and builds and releases a new docker image with the correct dependencies, which is used for local Docker development. This enables the above workflow in which users do not need to manually build docker images.

### Local Development with Node

To start the website in development mode if [you have node installed](https://nodejs.org/en/), you can run `npm start`. This will start the site in dynamic mode, booting up quickly and compiling each page as its loaded.

To export a static version of the website, run `npm run static`. It will be exported to a folder called `out`.

To run the website with a server in production mode, run `npm run dynamic` to build the assets in production mode and kick off an express server.

In both scenarios, you can **visit the local website at `http://localhost:3000`**. When you modify content, the website will automatically reload, you do not have to stop and restart the development environment.

### Creating Content

#### Pages

To create a page, create a Markdown (`mdx`), TypeScript (`tsx` or `ts`), or JavaScript (`jsx` or `js`) file in the `pages/` directory. The path to the file will also be the URL to the page.

Markdown files can be used for mostly static, text-based content. You can read the documentation for that in the [Markdown section](#markdown).

TypeScript and JavaScript files enable more complex behavior, data querying, and more. These should be used for layout files, dynamic pages, etc. For TypeScript or JavaScript files, the defaut ES6 export should be a
React Component. This will be rendered for the page. More documentation can be found on the [Next.js website](https://nextjs.org/docs/#fetching-data-and-component-lifecycle). You will see examples of both of these types of content in the `/pages` folder.

#### Markdown

HashiCorp websites often use Markdown for content authoring. To create a new page with Markdown, create a file ending in `.mdx` in the `pages/` directory. The path in the pages directory will be the URL route. For example, `pages/hello/world.mdx` will be served from the `/hello/world` URL.

This file can be standard Markdown and also supports [YAML frontmatter](https://middlemanapp.com/basics/frontmatter/). YAML frontmatter is optional, there are defaults for all keys.

```yaml
---
layout: 'custom'
title: 'My Title'
---

```

The significant keys in the YAML frontmatter are:

- `layout` `(string)` - This is the name of the layout file to wrap the Markdown page with, found in `pages/layouts`
- `title` `(string)` - This is the title of the page that will be set in the HTML title.

#### Analytics

If your project needs to implement analytics, you can run the provided npm script, `npm run generate:analytics` to generate a typed analytics client based on a specific [Tracking Plan](https://github.com/hashicorp/web-tracking-plans). By default the generated files will be located within an `analytics/generated` directory. Pass an `-o` or `--outputPath` flag to specify a specific output directory. i.e. `next-hashicorp analytics --outputPath ./analytics/typewriter`

### Deployment

This website is hosted on Netlify and configured to automatically deploy anytime you push code to the `stable-website` branch. Any time a pull request is submitted, a deployment preview will appear in the github checks which can be used to validate the way docs changes will look live. Deployments from `stable-website` will look and behave the same way as deployment previews.

### Generating the Changelog

This sentinel docs project has a specific task that's used to generate a changelog webpage based on the project's changelog. You can run this task using `npm run generate-changelog` at any time. It will run automatically before every deploy.
