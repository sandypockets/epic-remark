import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { processMarkdown } from '../../../../dist/index.esm.js';
import '../../../../dist/styles.css';

function Post() {
  const { slug } = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/posts/${slug}.md`);
      const fileContents = await response.text();

      const options = {
        addHeadingIds: true,
        addTableOfContents: true,
        calculateReadingTime: true,
        readingTimeOptions: { wordsPerMinute: 250 },
        renderEmbeds: true,
      };
      const processedData = await processMarkdown(fileContents, options);
      setPostData(processedData);
    }

    fetchData();
  }, [slug]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <h1>{postData.frontMatter.title}</h1>
      <p>Reading time: {postData.readingTime} min</p>
      <div>
        <h3>Table of Contents</h3>
        <div dangerouslySetInnerHTML={{ __html: postData.toc }} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}

export default Post;
