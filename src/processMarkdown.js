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
import getOptionsArray from './helpers/getOptionsArray.js'

export default async function processMarkdown(markdownContent, options = {}) {
  function log(msg) {
    if (options.debug) console.log(`[epic-remark] ${new Date().toISOString()} - `, msg);
  }

  log(`options:\n${getOptionsArray(options).join('\n')}`);

  if (!markdownContent) {
    log("No markdown content provided. Setting to empty string.");
    markdownContent = "";
  }

  const defaultWrapConfig = {
    img: 'epic-remark-image',
    table: 'epic-remark-table',
  };

  const wrapConfig = { ...defaultWrapConfig, ...(options.wrapConfig || {}) };
  let frontMatterData = {};
  let tableOfContents = null;
  let readingTime = null;

  try {
    log("Processing markdown content...")
    const processor = remark()
    .use(frontmatter, ['yaml'])
    .use(() => tree => {
      const yamlNode = tree.children.find(node => node.type === 'yaml');
      if (yamlNode) {
        frontMatterData = yaml.parse(yamlNode.value);
      }
    })
    .use(html)
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(wrapElements, wrapConfig);
    if (options.debug) {
      log("Initial processing complete.")
      log("Processing options...")
    }

    if (options.addHeadingIds) {
      log("Adding heading ids...")
      processor.use(addHeadingIds);
    }

    if (options.addTableOfContents) {
      log("Adding table of contents...")
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
      log("Calculating reading time...")
      readingTime = calculateReadingTime(options.readingTimeOptions)(remark().parse(markdownContent));
    }

    if (options.renderEmbeds) {
      log("Rendering embeds...")
      processor.use(embed).use(rehypeRaw);
    }

    log("Processing final content...")
    const processedContent = await processor.use(rehypeStringify).process(markdownContent);
    log("Wrapping content...")
    const wrappedContentHtml = wrapWithDiv(processedContent.toString(), 'markdown');
    log("Processing complete.")

    return {
      frontMatter: frontMatterData,
      contentHtml: wrappedContentHtml,
      toc: tableOfContents,
      readingTime: readingTime,
    };
  } catch (err) {
    console.error("Error processing markdown: ", err);
    throw err;
  }
}

