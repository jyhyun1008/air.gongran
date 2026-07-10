<script setup lang="ts">
defineProps<{
    items: Array<{
        path: string;
        title: string;
        subtitle?: string | null;
        thumbnail?: string | null;
        tags?: string[] | null;
        date?: string | null;
    }>;
}>();

const formatDate = (date?: string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
</script>

<template>
    <ul class="content-list">
        <li v-for="item in items" :key="item.path">
            <figure>
                <NuxtLink :to="item.path">
                    <ThumbnailImage :src="item.thumbnail" :alt="item.title" />
                </NuxtLink>
            </figure>
            <div class="body">
                <NuxtLink class="title" :to="item.path">{{ item.title }}</NuxtLink>
                <p v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</p>
                <ul v-if="item.tags?.length" class="item-tags">
                    <li v-for="tag in sortTags(item.tags)" :key="tag" :class="{ primary: isPrimaryTag(tag) }">
                        {{ tag }}
                    </li>
                </ul>
                <time v-if="item.date" class="date">{{ formatDate(item.date) }}</time>
            </div>
        </li>
    </ul>
</template>
