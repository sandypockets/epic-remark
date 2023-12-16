import { processMarkdown } from '../../../dist/index.esm';
import getAllPosts from '../../helpers/getAllPosts';
import '../../../dist/styles.css';

async function convertPostToHtml(fileContents) {
  const options = {
    addHeadingIds: true,
    addTableOfContents: true,
    calculateReadingTime: true,
    readingTimeOptions: { wordsPerMinute: 250 },
    renderEmbeds: true,
  };

  const { contentHtml, toc, readingTime } = await processMarkdown(fileContents, options);
  return { contentHtml, toc, readingTime };
}

export async function getStaticPaths() {
  const paths = getAllPosts().map(post => ({ params: { slug: post.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const { fileContents } = allPosts.find(post => post.id === params.slug);
  const postData = await convertPostToHtml(fileContents);
  return { props: { postData, slug: params.slug } };
}

export default function Post({ postData, slug }) {
  return (
    <article>
      <h1 className="text-5xl">{slug}</h1>
      <p>Reading time: {postData.readingTime} min</p>
      <div>
        <h3 className="text-2xl">Table of Contents</h3>
        <div dangerouslySetInnerHTML={{ __html: postData.toc }} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
