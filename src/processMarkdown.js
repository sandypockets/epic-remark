import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import frontmatter from 'remark-frontmatter';
import yaml from 'yaml';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import wrapElements from './plugins/wrapElements.js';
import addHeadingIds from './plugins/addHeadingIds.js';
import addTableOfContents from './plugins/addTableOfContents.js';
import calculateReadingTime from './plugins/calculateReadingTime.js';
import embed from './plugins/embed.js';
import wrapWithDiv from './helpers/wrapWithDiv.js';

export default async function processMarkdown(markdownContent, options = {}) {
  if (!markdownContent) {
    throw new Error('No markdown content provided');
  }

  const defaultWrapConfig = {
    img: 'epic-remark-image',
    table: 'epic-remark-table',
  };

  const wrapConfig = { ...defaultWrapConfig, ...(options.wrapConfig || {}) };
  let frontMatterData = null;
  let tableOfContents = null;
  let readingTime = null;

  const processor = remark()
    .use(frontmatter, ['yaml'])
    .use(() => tree => {
      frontMatterData = extractFrontMatter(tree);
    })
    .use(html)
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(wrapElements, wrapConfig);

  if (options.addHeadingIds) {
    processor.use(addHeadingIds);
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

  if (options.calculateReadingTime) {
    readingTime = calculateReadingTime(options.readingTimeOptions)(remark().parse(markdownContent));
  }

  if (options.renderEmbeds) {
    processor.use(embed).use(rehypeRaw);
  }

  let processedContent = await processor.use(rehypeStringify).process(markdownContent);
  const wrappedContentHtml = wrapWithDiv(processedContent.toString(), 'markdown');

  return {
    frontMatter: frontMatterData,
    contentHtml: wrappedContentHtml,
    toc: tableOfContents,
    readingTime: readingTime,
  };
}

function extractFrontMatter(tree) {
  const frontMatterNode = tree.children.find(node => node.type === 'yaml');
  return frontMatterNode ? yaml.parse(frontMatterNode.value) : {};
}
