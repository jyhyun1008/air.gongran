<script setup lang="ts">
definePageMeta({ contentWidth: "medium" });

const route = useRoute();

const { data: page } = await useAsyncData(`project-${route.path}`, () =>
    queryCollection("project").path(route.path).first()
);

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: "프로젝트를 찾을 수 없습니다." });
}

useSeoMeta({ title: () => `${page.value?.title} | project | GONGRAN` });
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

        <p v-if="page.link">
            <a :href="page.link" target="_blank" rel="nofollow noopener">관련 링크 →</a>
        </p>

        <p class="text-center" style="margin-top: 60px">
            <NuxtLink to="/project">← project 목록으로</NuxtLink>
        </p>
    </article>
</template>
