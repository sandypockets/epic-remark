<template>
  <article>
    <h1>{{ postData.frontMatter.title }}</h1>
    <p>Reading time: {{ postData.readingTime }} min</p>
    <div v-html="postData.toc" />
    <div v-html="postData.contentHtml" />
  </article>
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const posts = await $http.$get('/posts.json');
    const postData = posts.find(post => post.id === params.slug);
    return { postData };
  }
};
</script>
