# Indexing

Using consistent words across the navigation and content indexes is a core aspect of IA design. This document provides guidance on word choice for navigation labels and folder and file names that appear on developer.hashicorp.com. You can also consult this document as a fallback for the style guide to find the most accurate word to use in prose. 

The vocabulary described in this document is scoped to the following parts of the information architecture:

- Navigational labels
- File names
- Folder names

## General guidelines

Unless called out in the exceptions, use the following guidance to choose the correct usage:

- Use singular nouns for file and folder names. 
- Use simple present tense for verbs.
- Folder and file names at the beginning of the hierarchy should use the most general terms. Downstream leaves and branches can use more specific terms. 
- Use the fewest words possible for file and folder names:
    - Ideal: {verb || noun}
    - Good: {verb}-{noun} 
    - Acceptable: {verb}-{descriptor}-{noun}.
- Do not use abbreviations, acronyms, or numbers in folder or file names. The following words are exceptions:
    - "api", not "application-programming-interface"
    - "cli", not "command-line"
    - "ui", not "user-interface"
    - "k8s", not "kubernetes"
    - "2fa", not "two-factor-authentication"
    - "rbac", not "role-based-access-credentials" 
- Avoid constructing paths that repeat words, especially the product name.
- Apply the principle of workflows over technologies. When describing a topic with more than one runtime or platform, guide readers to a single topic or folder. Differences between runtimes or platforms should be page-level details. For example:
    - Avoid: <root>/<index>/<runtime>/<topic>
    - Better:  <root>/<index>/<topic>/<runtime>.mdx
    - Best: <root>/<index>/<topic>.mdx <tab=runtime1><tab=runtime2>

## Navigational labels

Use the shortest navigation label possible, especially at the root, so that visitors aren't overwhelmed. 

### Overviews

All folders must have an index.mdx file referred to as "Overview" in the navigation to prevent 404s when visitors navigate the site by removing URL segments. In most cases, the first file is an overview content type.

### Usage topics

As visitors navigate from higher-level topic areas to more concrete topics, labels should become more specific. Use the following pattern for lableing second- or third-tier folders and pages in the navigation:

{verb} {descriptor} {noun}

The following list contains example navigation labels: 
 
- Access your account
- Define attributes
- Configure attributes 
- Create an account
- Delete your account
- Update your account
- Create a configuration file
- Connect to a database
- Develop providers
- Find modules in the registry
- Find providers in the registry
- Edit settings

### Concepts

Topics that are focused on concepts do not require a verb to form the navigation label, but they should appear in a dedicated section that clearly identifies the topics as explanatory. "Concepts" is the most appropriate label: 

```
Concepts
- Overview
- {keyword as concept}
```

You can also use the "Architecture" label for the group of topics that describe architectural concepts and components. You can either use this label as a top-level item or as a child of the "Reference" section: 

```
Architecture
- Overview
- {component}
```

```
Reference
    - Overview
    - Architecture
        - Overview
        - {component}
```

### Reference

Topics that serve as reference documentation do not require a verb to form the navigation label, but they must appear in a dedicated section that clearly identifies them as references. You can also group references into types:

```
Reference
- Overview
    - {reference type}
    - Overview
        - {reference topic}
```

Examples

```
Reference
- Overview
- Architecture
    - Overview
    - {component or concept}
- Attributes
- Configuration
- CLI
    - Overview # describes the root command
    - {subcommand} 
Permissions
```

## Folder names
Use the following principles to name folders in the repository.

### Overviews

All folders must have an index.mdx file, usually referred to as "Overview" in the navigation, so that users can always reach a page of content at all segments of the URL. 

#### Root-level folders

A product's purpose is defined by its set of root-level categories. Adding a new top-level folder should be extremely rare. 

#### Nested folders

Folders nested within the root-level categories can have one or two words long using one of the following formats: 

- /{noun}
- /{verb}
- /{verb}-{noun}

Use the singular form of a word when naming folders, for example, "workspace", not "workspaces". 

Use the simple present form of verbs instead of participle or gerund forms. For example, "configure", not "configuring". 

## File names

Use the following principles and definitions in the glossary to name files.

### Order matters 

Choose a pattern for ordering file and folder names that results in a natural language phrase so that search engines can use the URL to connect users to our content.

### Overviews

All folders must have an index.mdx file, usually referred to as "Overview" in the navigation, so that users can always reach a page of content at all segments of the URL. 

### Usage topics 

Names for files that contain usage instructions can have up to three words according to the following patterns:

- {noun}
- {verb}
- {descriptor}-{noun}
- {verb}-{noun}
- {verb}-{descriptor}-{noun}

Use the singular form of a word, for example, "workspace", not "workspaces". 

Use the simple present form of verbs instead of participle or gerund forms. For example, "configure", not "configuring". 

### Concepts

Do not use a verb or descriptor for names for files that contain conceptual information unless a descriptor is part of the concept, such as the concept of "sensitive data".  

Placing concepts in a `/concepts` folder is a good practice when the topic area has many in-depth concepts. In these cases, use the name of the concept as file name: 

```
Concepts
- Overview
- {keyword as concept}
```

For several short concepts, add a `concepts.mdx` page, instead.

### Reference

Do not use a verb or descriptor for names for files that contain reference information unless a descriptor is part of the reference item.  

Place references in a `/reference` folder or in a subfolder if the reference folder contains several types and use the name of the item as file name: 

```
Reference
- Overview
- {reference type}
    - Overview
    - {reference topic}

Examples

```
Reference
- Overview
- Architecture
    - Overview
    - {component or concept}
- Attributes
- Configuration
- CLI
    - Overview
    - {command}
- Permissions
