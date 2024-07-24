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
