<script setup lang="ts">
useSeoMeta({ title: "blog | GONGRAN" });
definePageMeta({ contentWidth: "wide" });

const { data: items } = await useAsyncData("blog-list", () =>
    queryCollection("blog").order("date", "DESC").all()
);

const { selectedTag, allTags, filteredItems } = useTagFilter(items);
</script>

<template>
    <article>
        <h2>blog</h2>

        <TagFilter v-model="selectedTag" :tags="allTags" />

        <div v-if="filteredItems.length" class="post-grid">
            <ContentCard v-for="item in filteredItems" :key="item.path" :item="item" />
        </div>
        <p v-else class="empty-state">아직 등록된 글이 없습니다.</p>
    </article>
</template>
