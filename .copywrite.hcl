schema_version = 1

project {
  license        = "BUSL-1.1"
  copyright_year = 2024

  header_ignore = [
    "public/**",
    "content/**",
    "docs/**",
    "__fixtures__/**",
    "__mocks__/**",
    "**/*.json",
    ".next/**",
    ".husky/**",
    "next-env.d.ts",
    "Gemfile",
    "scripts/tfe-releases/tfe-releases-repos.yaml",
    "scripts/tfe-releases/app_repos.yaml",
  ]
}
