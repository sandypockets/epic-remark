import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Blog({ posts }){
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-semibold my-3">Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-gray-600">{post.date}</p>
                <p>{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map(filename => {
    const id = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter } = matter(fileContents);

    return {
      id,
      ...frontMatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
