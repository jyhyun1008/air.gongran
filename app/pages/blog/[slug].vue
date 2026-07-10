<script setup lang="ts">
definePageMeta({ contentWidth: "medium" });

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
    <article v-if="page">
        <PostHeader
            :title="page.title"
            :subtitle="page.subtitle"
            :image="page.thumbnail"
            :tags="page.tags"
        />

        <ContentRenderer :value="page" />

        <p class="text-center" style="margin-top: 60px">
            <NuxtLink to="/blog">← blog 목록으로</NuxtLink>
        </p>
    </article>
</template>
