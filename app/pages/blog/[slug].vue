<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(`blog-${route.path}`, () =>
    queryCollection("blog").path(route.path).first()
);

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: "글을 찾을 수 없습니다." });
}

useSeoMeta({ title: () => `${page.value?.title} | blog | GONGRAN` });
</script>

<template>
    <PostDetail v-if="page" :page="page" back-to="/blog" back-label="blog 목록으로" />
</template>
