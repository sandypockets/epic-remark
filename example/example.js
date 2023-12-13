import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { remarkWrapTables, remarkAddIdsToHeadings } from '../dist/index.js';

const postsDirectory = path.join(process.cwd(), './posts');

function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    return {
      id,
      fileContents,
    };
  });

  return allPostsData;
}

async function convertPostToHtml(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const processedContent = await remark().use(html).use(gfm).use(remarkWrapTables).use(remarkAddIdsToHeadings).process(fileContents);
  let contentHtml = processedContent.toString();
  contentHtml = contentHtml.replace(/id="user-content-/g, 'id="');

  return {
    id,
    contentHtml,
  };
}

function runExample() {
  const allPostsData = getAllPosts();
  console.log(allPostsData);

  for (const post of allPostsData) {
    console.log(post);
    convertPostToHtml('example').then(postData => {
      console.log(postData);
    });
  }
}

runExample();
