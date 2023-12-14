import fs from 'fs';
import path from 'path';
import { processMarkdown } from '../src/processMarkdown.js';
import getAllPosts from './helpers/getAllPosts.js';

async function convertPostToHtml(id) {
  const postsDirectory = path.join(process.cwd(), './posts');
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Create an options object to indicate which functions in the package to run
  const options = {
    addHeadingIds: true,
    elementsToWrap: ['img', 'table'],
    addTableOfContents: true,
  };

  const { contentHtml, toc } = await processMarkdown(fileContents, options);

  return {
    slug: id,
    contentHtml: contentHtml,
    tableOfContents: toc,
  };
}

function runExample() {
  const allPostsData = getAllPosts();

  for (const post of allPostsData) {
    convertPostToHtml('example').then(postData => {
      console.log('Post data: ', postData);
    });
  }
}

runExample();
