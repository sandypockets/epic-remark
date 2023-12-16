import getAllPosts from '../../helpers/getAllPosts';
import 'epic-remark/dist/index.esm.css';
import { processMarkdown } from 'epic-remark';

async function convertPostToHtml(fileContents) {
  const options = {
    addHeadingIds: true,
    addTableOfContents: true,
    calculateReadingTime: true,
    readingTimeOptions: { wordsPerMinute: 250 },
    renderEmbeds: true,
  };

  const { contentHtml, toc, readingTime, frontMatter } = await processMarkdown(fileContents, options);
  return { contentHtml, toc, readingTime, frontMatter };
}

export async function getStaticPaths() {
  const paths = getAllPosts().map(post => ({ params: { slug: post.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const { fileContents } = allPosts.find(post => post.id === params.slug);
  const postData = await convertPostToHtml(fileContents);
  return { props: { postData } };
}

export default function Post({ postData }) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-semibold">{postData.frontMatter.title}</h1>
      <p className="my-2">Reading time: {postData.readingTime} min</p>
      <div>
        <h3 className="text-xl">Table of Contents</h3>
        <div dangerouslySetInnerHTML={{ __html: postData.toc }} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
