# `remark-enhanced`
Remark enhanced is a collection of plugins for remark.

## How does it work
Remark enhanced uses remark-rehype to convert the Remark AST (Abstract Syntax Tree) to a HAST (HTML Abstract Syntax Tree) and then uses rehype to convert the HAST to HTML.

### Why convert the AST to HAST if Remark already does this? 
Traversing Remark's AST can lead to unexpected results. To ensure that the output is always expected, the package uses rehype to conver the AST to a workable and predictable HAST, which is then modified as desired by Remark Enhanced, and returned as HTML. 

## Plugins

* `addHeadingIds` - Adds an `id` attribute to all headings. The `id` will be the same as the heading's inner text. 
* `wrapElements` - Wraps all specified elements in a `div` with a class. This allows for easier styling of elements like tables and images which often need containers. 
* `addTableOfContents` - Gathers headings from content and creates a table of contents. Table of contents can be automatically prepended to the content, or returned in a separate object. 

