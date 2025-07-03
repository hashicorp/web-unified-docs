# Headings

Follow these guidelines so that you can consistently use Markdown to format headings.

## Use #-style headings

- **keywords**: markdown, formatting, headings
- **content sets**: docs, tutorial, WAF, certifications

## Do not use Markdown headings inside tabs

- **keywords**: markdown, tabs, headings
- **content sets**: docs, tutorials, WAF, certifications

Do not use Markdown headings inside tabs. Instead, use the headings attribute. Placing headings inside a tab can cause problems. For example, H2 headings inside tabs affect the table of contents and linking to H3 headings placed inside a tab can negatively affect the user experience.  

### Examples

```
<Tabs>
<Tab heading="CLI command">
             <!-- Intentionally skipped line.. -->
Content
            <!-- Intentionally skipped line.. -->
</Tab>
<Tab heading="API call using cURL">

Content

<!-- Intentionally skipped line.. -->

</Tab>
<Tab heading="Web UI">

Content

</Tab>
</Tabs>
```