# Notes on experimental prototype

## To Do

### MDX transforms

- In existing setup, transforms happen _before_ content is added to our DynamoDB
- `@include` partials are one transform we probably _need_ to make before serving content
- Other transforms _may_ be appropriate to make on the front-end... but with the goal of parity in mind, probably makes sense to retain them server-side for now

### Image URLs

- Image URLs are currently _not_ functional after migrating content
- In our existing setup, we have some relatively complex transform logic to turn the authored image URL paths into URL paths we can fetch successfully from our content API
- In this new setup, maybe it would make sense to rewrite URL paths as part of migration?

### Versioned images and assets

🚧 TODO

### Variable content location in very old versions

- Some very old versions that are currently published on `developer.hashicorp.com` do _not_ follow the structure defined in `repo-config`
- Instead, they still have website source present. For example, for `vault`, in version `1.6.x`, the `.mdx` documents are located in the `pages` directory amidst other page files, and nav data is in `.js` format in the `website/data` directory, alongside a deprecated `version.js` file.
- In our existing system, we have some deeply buried conditionals that handle this case. I'm honestly not exactly sure how those conditionals work
