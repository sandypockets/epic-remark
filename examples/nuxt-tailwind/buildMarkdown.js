const fs = require('fs');
const path = require('path');
const { processMarkdown } = require('epic-remark/dist/index');

const postsDirectory = path.join(__dirname, 'posts');
const outputDirectory = path.join(__dirname, 'static');

const processPosts = async () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = [];

  for (const fileName of fileNames) {
    const id = fileName.replace(/\.md$/, ''); // Remove the file extension to get the ID
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const options = {
      addHeadingIds: true,
      addTableOfContents: true,
      calculateReadingTime: true,
      readingTimeOptions: {
        wordsPerMinute: 200,
        round: true,
      },
      renderEmbeds: true,
    }
    const processedContent = await processMarkdown(fileContents, options);
    posts.push({
      id, // Include the ID in the post object
      ...processedContent
    });
  }

  if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory);
  }

  fs.writeFileSync(path.join(outputDirectory, 'posts.json'), JSON.stringify(posts));
};

processPosts();
