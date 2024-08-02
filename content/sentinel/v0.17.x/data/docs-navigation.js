// The root folder for this documentation category is `pages/docs`
//
// - A string refers to the name of a file
// - A "category" value refers to the name of a directory
// - All directories must have an "index.mdx" file to serve as
//   the landing page for the category

export default [
  'changelog',
  {
    category: 'concepts',
    content: ['policy-as-code', 'language', 'imports', 'enforcement-levels']
  },
  {
    category: 'configuration',
    content: ['remote-sources']
  },
  {
    category: 'commands',
    content: ['apply', 'fmt', 'test']
  },
  {
    category: 'writing',
    content: ['basic', 'rules', 'tracing', 'testing', 'imports', 'debugging']
  },
  {
    category: 'extending',
    content: ['modules', 'plugins', 'internals']
  },
  '----------------',
  {
    category: 'language',
    content: [
      'variables',
      'values',
      'lists',
      'maps',
      'rules',
      'imports',
      'parameters',
      'boolexpr',
      'arithmetic',
      'slices',
      'conditionals',
      'loops',
      'collection-operations',
      'functions',
      'scope',
      'undefined',
      'logging-errors',
      'spec'
    ]
  },
  {
    category: 'functions',
    content: [
      'append',
      'delete',
      'error',
      'keys',
      'length',
      'print',
      'range',
      'values'
    ]
  },
  {
    category: 'imports',
    content: [
      'base64',
      'decimal',
      'http',
      'json',
      'runtime',
      'sockaddr',
      'strings',
      'time',
      'types',
      'units',
      'version'
    ]
  },
  '----------------',
  'consul',
  'nomad',
  'terraform',
  'vault'
]
