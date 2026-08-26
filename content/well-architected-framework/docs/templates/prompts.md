## Setup

1. If you want to work locally, install Claude 

`curl -fsSL https://claude.ai/install.sh | bash`

1. Before proceeding, add style-guide directory to chat context.
Note: This is a WIP. Any suggestions are welcome. 

## Content prompts

1. Are there any spelling errors in this document?

1. Are there any US english grammar errors in this document?

1. Check this file for any confusing statements

1. Using the information from the style-guide directory, are there any problems
   with <file-name> not following the recommendations??

1. Is this technically accurate?

1. Can I better describe how HashiCorp tools can help help user solve or implment the content in this       document?

1. Looking at all docs in the <dirname> directory, are there any inconsistencies
   in technical explanation of concepts that could be better aligned,
   inconsistent formatting for links, lists, etc?

1. Are there any sentances that start with `this`?

1. Can you search HashiCorp documentation and tutorials for resources that will help users learn and implement the content in this document? Provide the URLs.

## Review prompts

Please review the changes I'm about to commit and check:
1. Do they follow our writing standards?
2. Do they follow general technical writing best practices?
3. Are code examples accurate?
4. Is the frontmatter complete and correct?
5. Are there any links that need testing?
6. Do the docs make sense? Would a user be successful following them?

## CLI prompts

1. To find supporting documents in the WAF (or other directories), you can run the following prompt:

 In this document, I want to support it with documents from the docs repo. Can you find documents that support the ideas in this document and will help users implement it? For example, I provided a link for users in the infrastructure as code section at the top of this document. I want you to only search the well-architected-framework documents.


## SEO prompts

Analyze this document's SEO optimization and provide specific recommendations.

**Areas to evaluate and improve:**
1. **Title** - Provide 3 options that:
   - Use sentence case
   - Avoid colons
   - Exclude tool names (e.g., Terraform, AWS) from the main title
   - Are compelling and clear
   
2. **Meta description** - Suggest an optimized version (150-160 characters)

3. **First paragraph** - Recommend improvements for:
   - Hook/engagement
   - Keyword placement
   - Clarity of value proposition

4. **H2 headings** - Evaluate current headings and suggest improvements
   - Tool-specific names (Terraform, AWS) are allowed in H2s only when the section content is tool-specific
   - Otherwise, keep headings generic and benefit-focused

6. **Discription for images and videos** - Review the tags for images and videos:
   - Review descriptions for videos and images
5. **Other critical SEO elements** - Flag any major issues with:
   - Keyword usage and density
   - Content structure and readability
   - Internal linking opportunities
   - Image alt text (if applicable)

**Writing requirements:**
- Eliminate all passive voice
- Use sentence case throughout
- Prioritize clarity and user intent

**Output format:**
For each recommendation, explain why the change improves SEO and provide specific before/after examples where helpful.

## Batch prompt

Here is a list of all the work we are working on (this in an example list)
content/well-architected-framework/docs/docs/define-and-automate-processes/automate/deployments.mdx
content/well-architected-framework/docs/docs/define-and-automate-processes/automate/packaging.mdx
content/well-architected-framework/docs/docs/define-and-automate-processes/automate/testing.mdx


$ Use the CLAUDE.md file located at content/well-architected-framework/docs/templates/CLAUDE.md
$ Review all the documents and, if they relate to each other, add them in the HashiCorp Resources sections
$ Review all the documents for the HashiCorp style guide located in the CLAUDE.md file
$ Fact check all the documents
$ Do the docs make sense? Would a user be successful following them?
$ Review all the docs for SEO and AI/LLM optimization 
$ Are link descriptions optimized? Do they clearly explain what the user will find (vs. generic "Learn more")?
$ Do we have the right balance of "getting started" vs. "advanced" links? Are we overwhelming beginners or leaving advanced users without depth?

