import path from 'path';
import fs from 'fs';

const postsDirectory = path.join(process.cwd(), './posts');

export default function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    return {
      id,
      fileContents,
    };
  });
}
