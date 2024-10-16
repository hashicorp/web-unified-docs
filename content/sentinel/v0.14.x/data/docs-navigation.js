// The root folder for this documentation category is `pages/docs`
//
// - A string refers to the name of a file
// - A "category" value refers to the name of a directory
// - All directories must have an "index.mdx" file to serve as
//   the landing page for the category

export default [
	{
		category: 'changelog',
	},
	{
		category: 'concepts',
		content: ['policy-as-code', 'language', 'imports', 'enforcement-levels'],
	},
	{
		category: 'commands',
		content: ['config', 'apply', 'fmt', 'test'],
	},
	{
		category: 'writing',
		content: ['basic', 'rules', 'tracing', 'testing', 'imports', 'debugging'],
	},
	{
		category: 'extending',
		content: ['install', 'dev'],
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
			'spec',
		],
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
			'values',
		],
	},
	{
		category: 'imports',
		content: [
			'decimal',
			'http',
			'json',
			'runtime',
			'sockaddr',
			'strings',
			'time',
			'types',
			'units',
		],
	},
	'----------------',
	{
		category: 'consul',
	},
	{
		category: 'nomad',
	},
	{
		category: 'terraform',
	},
	{
		category: 'vault',
	},
	'----------------',
	{
		category: 'internals',
		content: ['plugins'],
	},
]
