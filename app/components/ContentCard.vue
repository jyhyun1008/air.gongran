<script setup lang="ts">
defineProps<{
    item: {
        path: string;
        title: string;
        subtitle?: string | null;
        thumbnail?: string | null;
        tags?: string[] | null;
        date?: string | null;
    };
}>();
</script>

<template>
    <NuxtLink :to="item.path" class="post-card">
        <figure class="post-card-thumb">
            <ThumbnailImage :src="item.thumbnail" :alt="item.title" />
        </figure>
        <div class="post-card-body">
            <p class="post-card-title">{{ item.title }}</p>
            <p v-if="item.subtitle" class="post-card-excerpt">{{ item.subtitle }}</p>
            <div class="post-card-meta">
                <ul v-if="item.tags?.length" class="item-tags">
                    <li v-for="tag in sortTags(item.tags)" :key="tag" :class="{ primary: isPrimaryTag(tag) }">
                        {{ tag }}
                    </li>
                </ul>
                <time v-if="item.date" class="post-card-date">{{ formatDate(item.date) }}</time>
            </div>
        </div>
    </NuxtLink>
</template>
