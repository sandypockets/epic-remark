# `epic-remark`

**Warning**: This package is still in development. It is not yet ready for production use.

`epic-remark` is a Markdown to HTML processor built on top of `remark`. It adds GitHub-flavoured markdown capabilities, alongside some handy must-have custom plugins. 

Use the all-in-one `processMarkdown` function to format your markdown into HTML, or import the custom plugins working behind the scenes one-by-one to mix your own flavour of Markdown HTML.

## Currently supported frameworks: 
* Next.js

### Dependencies
- `remark`: `^15.0.1`
- `remark-gfm`: `^4.0.0`
- `remark-html`: `^16.0.1`
- `rehype-stringify`: `^10.0.0`
- `remark-rehype`: `^11.0.0`
- `rehype-raw`: `^7.0.0`

## How does it work
`epic-remark` first uses `remark` and `remark-html` to convert your initial markdown to HTML. Then, `remark-gfm` is applied to enable the use of GitHub-flavoured markdown (tables, strikethrough, etc). At this point, the HTML is in a special `remark` AST (Abstract Syntax Tree). While it is possible to traverse and modify the tree, it can have some unexpected results. To create a more predictable environment, `epic-remark` uses `remark-rehype` to convert the `remark` AST to an easily adjustable HAST (HTML Abstract Syntax Tree). 

`epic-remark` then runs any of the custom `epic-remark` plugins you've enabled, serializes the newly modified HAST using `rehype-stringify`, and returns the HTML content back to you, ready to display on your frontend.

# Plugins

## `processMarkdown`
The processMarkdown function is the core of epic-remark. It converts markdown to HTML, applying a range of configurable options to enable additional plugins during execution. It is the primary function you'll use, with other plugins augmenting its capabilities.

## `addHeadingIds`
Automatically adds an id attribute to all headings (h1 to h6). The id value mirrors the heading's text, transformed into a URL-friendly format. This plugin is ideal for creating anchor links and improving navigability within documents.

## `wrapElements`
Provides the ability to wrap specified HTML elements in a div with a customizable class. By default, img and table tags are wrapped in divs with classes `epic-remark-image` and `epic-remark-table`, respectively. Users can extend or override these defaults using the wrapConfig option in processMarkdown, allowing for more granular control over the styling and layout of elements.

## `addTableOfContents`
Generates a table of contents based on the document's headings. Users can configure this plugin to either prepend the table of contents directly into the content or return it as a separate HTML string. This plugin enhances document structure and user navigation.

## `calculateReadingTime`
Estimates the reading time of the provided markdown content. The calculation is based on a standard words-per-minute metric, which can be adjusted via options. The reading time is returned in minutes, offering a quick overview of the content length.

### Notes
Processed markdown always returns auto-linked URLs. This means that if you have a URL in your markdown, it will be converted to a clickable link. 

## License
MIT. See [license.md](LICENSE.md)