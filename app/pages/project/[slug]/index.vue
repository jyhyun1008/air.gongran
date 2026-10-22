<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(`project-${route.path}`, () =>
    queryCollection("project").path(route.path).first()
);

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: "프로젝트를 찾을 수 없습니다." });
}

// first page of this project's docs (by file order), if it has any
const { data: firstDoc } = await useAsyncData(`project-docs-entry-${route.path}`, () =>
    queryCollection("docs").where("path", "LIKE", `${route.path}/docs%`).order("stem", "ASC").select("path").first()
);

useSeoMeta({ title: () => `${page.value?.title} | project | GONGRAN` });
</script>

<template>
    <PostDetail v-if="page" :page="page" back-to="/project" back-label="project 목록으로">
        <div v-if="page.link || firstDoc" class="post-detail-actions">
            <NuxtLink v-if="firstDoc" :to="firstDoc.path" class="post-detail-action primary">문서 보기 →</NuxtLink>
            <a v-if="page.link" :href="page.link" target="_blank" rel="nofollow noopener" class="post-detail-action">
                관련 링크 →
            </a>
        </div>
    </PostDetail>
</template>
