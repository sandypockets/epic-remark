<template>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <h1 class="text-5xl font-semibold">{{ postData?.frontMatter.title }}</h1>
    <p class="my-2">Reading time: {{ postData?.readingTime }} min</p>
    <div v-html="postData?.toc" />
    <div v-html="postData?.contentHtml" />
  </article>
</template>

<script>
import 'epic-remark/dist/index.esm.light.css';
export default {
  async asyncData({ params, app }) {
    const postData = await app.$posts.find(post => post.id === params.slug);
    return { postData };
  }
};
</script>
