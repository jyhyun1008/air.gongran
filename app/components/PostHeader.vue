<script setup lang="ts">
defineProps<{
    title: string;
    subtitle?: string | null;
    image?: string | null;
    tags?: string[] | null;
}>();
</script>

<template>
    <div class="post-header">
        <div class="post-header-banner">
            <ThumbnailImage class="post-header-image" :src="image" :alt="title" />
            <div class="post-header-scrim"></div>
            <div class="post-header-text">
                <ul v-if="tags?.length" class="post-header-tags">
                    <li v-for="tag in sortTags(tags)" :key="tag" :class="{ primary: isPrimaryTag(tag) }">
                        {{ tag }}
                    </li>
                </ul>
                <h2>{{ title }}</h2>
                <p v-if="subtitle" class="post-subtitle">{{ subtitle }}</p>
            </div>
        </div>
    </div>
</template>
