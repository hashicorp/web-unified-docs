# Local development

Local development splits by audience.

## Educators

Educators primarily make `content/` changes and run the full local preview
through Docker with `make`:

```sh
make
make clean
```

## Developers

Developers work on application or tooling code and run the project locally with
`npm`:

```sh
npm run prebuild
npm run dev
```

## Runtime

The repo uses Next.js and requires Node `>=24` (see `package.json` `engines`).
