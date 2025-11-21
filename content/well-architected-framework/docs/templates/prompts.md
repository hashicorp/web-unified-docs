Before proceeding, add style-guide directory to chat context.
Note: This is a WIP. Any suggestions are welcome. 

## Content prompts

1. Are there any spelling errors in this document?

1. Are there any US english grammar errors in this document?

1. Check this file for any confusing statements

1. Using the information from the style-guide directory, are there any problems
   with <file-name> not following the recommendations??

1. Is this technically accurate?

1. Can i better describe how hashicorp tools help?

1. looking at all docs in the <dirname> directory, are there any inconsistencies
   in technical explanation of concepts that could be better aligned,
   inconsistent formatting for links, lists, etc?

1. Are there any sentances that start with `this`?

1. Can you search HashiCorp documentation and tutorials for resources that will help users learn the content in this document?


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
