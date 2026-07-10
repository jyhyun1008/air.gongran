<script setup lang="ts">
useSeoMeta({ title: "sample | GONGRAN" });
definePageMeta({ layout: "sample" });

const { filteredItems } = useSampleLibrary();

const { setQueue } = useSamplePlayer();
watch(filteredItems, (items) => setQueue(items), { immediate: true });
</script>

<template>
    <ul v-if="filteredItems.length" class="sample-list">
        <SampleRow
            v-for="(item, i) in filteredItems"
            :key="item.path"
            :item="item"
            :index="i + 1"
        />
    </ul>
    <p v-else class="empty-state">아직 등록된 샘플이 없습니다.</p>
</template>
