# Documentation for epic-remark
`epic-remark` is an advanced Markdown to HTML processor built on top of remark. It enhances the standard Markdown processing capabilities by adding GitHub-flavored Markdown support and several custom plugins, offering a rich layer of markdown features and proper attributes on elements to make styling your markdown output easier.

## Features
* Converts Markdown to HTML
* Supports GitHub-flavored Markdown (GFM) including tables, strikethrough, and task lists
* Supports `YAML` frontmatter
* Custom support for embedded gists and YouTube videos
* Adds IDs to headings for anchor links
* Wraps any element in a div with a custom class 
* Extensible with custom plugins
* Compatible with all server-side JavaScript environments

## Installation
Install `epic-remark` using npm:

```bash
npm install epic-remark
```

or with yarn

```bash
yarn add epic-remark
```

## Usage
To use `epic-remark` in your project, you can import the processMarkdown function and use it to convert Markdown into HTML.

```javascript
import { processMarkdown } from 'epic-remark';

const markdown = `# Your Markdown Here`;
const html = processMarkdown(markdown);
```

### Configuration
processMarkdown accepts an optional options object, which allows you to configure various aspects of the Markdown processing.

#### Basic Options
`addHeadingIds`: `Boolean`. Automatically adds IDs to heading tags (h1 to h6).
`wrapConfig`: `Object`. Defines custom wrappers for specified HTML elements.
`addTableOfContents`: `Boolean`. Generates a table of contents based on headings.
`calculateReadingTime`: `Boolean`. Estimates the reading time of the content.
`wordsPerMinute`: `Number`. Defines the words-per-minute metric used to calculate reading time. Defaults to 250.
`renderEmbeds`: `Boolean`. Embeds content from external sources like YouTube videos or GitHub gists.

#### Example with Options

```javascript
import { processMarkdown } from 'epic-remark';

const markdown = `# Your Markdown Here`;

const options = {
    addHeadingIds: true,
    wrapConfig: { img: 'custom-img-class' },
    addTableOfContents: true,
    calculateReadingTime: true,
    wordsPerMinute: 200,
    renderEmbeds: true
};

const html = processMarkdown(markdown, options);
```

#### Frameworks
`epic-remark` is intended to be run on the server, typically during build time. This allows the HTML to be rendered and served to the client as static content. This is the recommended approach for most use cases.

If you're using a server-side JavaScript framework, like Next.js or Nuxt.js, then you can use the projects in the `examples/` directory to get up and running faster. 

`epic-remark` is framework-agnostic, and compatible with any server-side JavaScript environment, but you'll need to sort out the build and integration yourself.

#### File reading example
`epic-remark` does not include a file reading function. You'll need to read the file yourself and pass the contents to processMarkdown. Here's an example of how you might do this with Node.js:

```javascript
import fs from 'fs';
import { processMarkdown } from 'epic-remark';

const markdown = fs.readFileSync('path/to/file.md', 'utf8');
const html = processMarkdown(markdown);
```

Be sure to check out the projects in the `examples/` directory for more more in depth usage examples.

### Custom Plugins
#### `addHeadingIds`
When enabled, all an `id` attribute is automatically added to all heading tags. The id is generated from the heading text, formatted as a slug.

```javascript
import { processMarkdown } from 'epic-remark';

const markdown = `
# Your Markdown Here
Some text

## Heading 2
Other text
`

const options = { addHeadingIds: true };
const html = processMarkdown(markdown, options);
```

#### `wrapElements`
Allows you to wrap specified HTML elements in a div with a custom class. This is useful for applying specific styles or behaviors to certain elements.

By default, `epic-remark` wraps img and table tags in divs with classes `epic-remark-image` and `epic-remark-table`, respectively. You can override or add to these defaults, by passing a custom `wrapConfig` object to `processMarkdown`.

```javascript
import { processMarkdown } from 'epic-remark';

const markdown = `
# Your Markdown Here

![alt text](https://example.com/image.jpg)

| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;

const options = {
    wrapConfig: { img: 'custom-img-class' }
};

const html = processMarkdown(markdown, options);
```

The above example will wrap the table in a div with the class of `epic-remark-table`, but the image will be wrapped in a class of `custom-img-class`. If you want to wrap other elements, simply add to the `wrapConfig` object.

#### `addTableOfContents`
Generates a table of contents (ToC) from the document's headings. The ToC can be inserted directly into the content or returned as a separate HTML string. If inserted directly, the table of contents will be prepended to the content so it's displayed at the top of the page. 

If you do not want to insert directly, you can omit the option, as it defaults to `false`. 

```javascript
const options = { 
  addTableOfContents: true,
  insertTocDirectly: true
};

const html = processMarkdown(markdown, options);
```


#### `calculateReadingTime`
Estimates the time required to read the markdown content. This is calculated based on a words-per-minute metric, adjustable via options.

```javascript
const options = { 
  calculateReadingTime: true,
  wordsPerMinute: 200
};

const html = processMarkdown(markdown, options);
```

#### `embed`
Embeds external content such as YouTube videos or GitHub gists directly into the HTML. This is done using a simple `!embed` syntax followed by the URL.

To use embeds in your markdown, you'll need to enable the `renderEmbeds` option in processMarkdown.

```javascript
import { processMarkdown } from 'epic-remark';

const markdown = `
# Your Markdown Here
Below is a YouTube video embedded using the !embed syntax.

!embed https://www.youtube.com/watch?v=dQw4w9WgXcQ

And here is some text after the embed.
`;

const options = { renderEmbeds: true };
const html = processMarkdown(markdown, options);
```

Although the plugin is tested with GitHub gists and YouTube videos, it should work with any embeddable content that uses an iframe.


## Debugging
`epic-remark` supports a debug mode that logs additional information during processing. To enable this, set the debug flag in the options:

```javascript
const html = processMarkdown(markdown, { debug: true });
```

## Contributing
Contributions to `epic-remark` are welcome. If you're interested in contributing, please review the [contributing guidelines](CONTRIBUTING.md).

## License
`epic-remark` is released under the MIT License. Dependencies are also primarily MIT licensed, with the exception of yaml, which is ISC licensed.