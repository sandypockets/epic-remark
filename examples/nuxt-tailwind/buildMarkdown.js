const fs = require('fs');
const path = require('path');
const { processMarkdown } = require('epic-remark');

const postsDirectory = path.join(__dirname, 'posts');
const outputDirectory = path.join(__dirname, 'static');

const processPosts = async () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = [];

  for (const fileName of fileNames) {
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
    posts.push(processedContent);
  }

  if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory);
  }

  fs.writeFileSync(path.join(outputDirectory, 'posts.json'), JSON.stringify(posts));
};

processPosts();
