<script setup lang="ts">
import { marked } from 'marked';
import DomPurify from 'dompurify';

const props = withDefaults(defineProps<{ markdown?: string }>(), { markdown: '' });
const { markdown } = toRefs(props);

const html = computed(() => {
  const parsedHtml = marked.parse(markdown.value) as string;
  const htmlWithLinkStyle = parsedHtml.replaceAll('<a ', '<a class="text-primary transition decoration-none hover:underline" target="_blank" rel="noopener" ');
  return DomPurify.sanitize(htmlWithLinkStyle, { ADD_ATTR: ['target'] });
});
</script>

<template>
  <div v-html="html" />
</template>
