export default async (context, inject) => {
  const posts = await require('@/static/posts.json');
  inject('posts', posts);
};
