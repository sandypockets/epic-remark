# `epic-remark`
`epic-remark` is a Markdown to HTML processor built on top of `remark`. It adds GitHub-flavoured markdown capabilities, alongside some handy must-have custom plugins. 

Use the all-in-one `processMarkdown` function to format your markdown into HTML, or import the custom plugins working behind the scenes one-by-one to mix your own flavour of Markdown HTML.

### Dependencies
- `remark`: `^15.0.1`
- `remark-gfm`: `^4.0.0`
- `remark-html`: `^16.0.1`
- `rehype-stringify`: `^10.0.0`
- `remark-rehype`: `^11.0.0`

## How does it work
`epic-remark` first uses `remark` and `remark-html` to convert your initial markdown to HTML. Then, `remark-gfm` is applied to enable the use of GitHub-flavoured markdown (tables, strikethrough, etc). At this point, the HTML is in a special `remark` AST (Abstract Syntax Tree). While it is possible to traverse and modify the tree, it can have some unexpected results. To create a more predictable environment, `epic-remark` uses `remark-rehype` to convert the `remark` AST to an easily adjustable HAST (HTML Abstract Syntax Tree). 

`epic-remark` then runs any of the custom `epic-remark` plugins you've enabled, serializes the newly modified HAST using `rehype-stringify`, and returns the HTML content back to you, ready to display on your frontend.

## Plugins

* `processMarkdown` - Converts markdown to HTML and returns it. Uses configurable options object to enable other plugins during execution.
* `addHeadingIds` - Adds an `id` attribute to all headings. The `id` will be the same as the heading's inner text. 
* `wrapElements` - Wraps all specified elements in a `div` with a class. This allows for easier styling of elements like tables and images which often need containers. 
* `addTableOfContents` - Gathers headings from content and creates a table of contents. Table of contents can be automatically prepended to the content, or returned in a separate object. 

## License
MIT. See [license.md](LICENSE.md)