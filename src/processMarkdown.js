import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import wrapElements from './plugins/wrapElements.js';
import addHeadingIds from './plugins/addHeadingIds.js';
import addTableOfContents from './plugins/addTableOfContents.js';

export default async function processMarkdown(markdownContent, options = {}) {
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
        tableOfContents = await remark()
          .use(() => () => tocNode)
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
