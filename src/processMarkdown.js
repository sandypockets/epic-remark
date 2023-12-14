import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { wrapElements, addHeadingIds, addTableOfContents } from '../dist/index.js';

export async function processMarkdown(markdownContent, options = {}) {
  let tableOfContents = null;

  const processor = remark().use(html).use(gfm).use(remarkRehype);

  if (options.addHeadingIds) {
    processor.use(addHeadingIds);
  }

  if (options.elementsToWrap && options.elementsToWrap.length > 0) {
    processor.use(wrapElements, options.elementsToWrap);
  }

  if (options.addTableOfContents) {
    processor.use(() => async tree => {
      const tocNode = addTableOfContents(tree, options.insertTocDirectly);
      if (tocNode) {
        // Use a new processor to convert the ToC node to an HTML string
        tableOfContents = await remark()
          .use(() => () => tocNode) // Pass the tocNode directly to the processor
          .use(rehypeStringify)
          .process('')
          .then(file => file.toString());
      }
    });
  }

  const processedContent = await processor.use(rehypeStringify).process(markdownContent);

  return {
    contentHtml: processedContent.toString(),
    toc: tableOfContents,
  };
}
