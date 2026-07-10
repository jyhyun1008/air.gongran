<script setup lang="ts">
useSeoMeta({ title: "project | GONGRAN" });
definePageMeta({ contentWidth: "medium" });

const { data: items } = await useAsyncData("project-list", () =>
    queryCollection("project").order("date", "DESC").all()
);

const { selectedTag, allTags, filteredItems } = useTagFilter(items);
</script>

<template>
    <article>
        <h2>project</h2>

        <TagFilter v-model="selectedTag" :tags="allTags" />

        <ContentList v-if="filteredItems.length" :items="filteredItems" />
        <p v-else class="empty-state">아직 등록된 프로젝트가 없습니다.</p>
    </article>
</template>
