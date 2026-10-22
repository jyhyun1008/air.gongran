<script setup lang="ts">
// shared body for the project and blog detail pages
defineProps<{
    page: {
        title: string;
        subtitle?: string | null;
        thumbnail?: string | null;
        tags?: string[] | null;
        date?: string | null;
    };
    backTo: string;
    backLabel: string;
}>();
</script>

<template>
    <article>
        <header class="post-detail-header">
            <ul v-if="page.tags?.length" class="item-tags">
                <li v-for="tag in sortTags(page.tags)" :key="tag" :class="{ primary: isPrimaryTag(tag) }">
                    {{ tag }}
                </li>
            </ul>
            <h1>{{ page.title }}</h1>
            <p v-if="page.subtitle" class="post-detail-subtitle">{{ page.subtitle }}</p>
            <time v-if="page.date" class="post-detail-date">{{ formatDate(page.date) }}</time>
        </header>

        <figure v-if="page.thumbnail" class="post-detail-cover">
            <img :src="page.thumbnail" :alt="page.title" />
        </figure>

        <ContentRenderer :value="page" class="prose" />

        <slot />

        <p class="back-link">
            <NuxtLink :to="backTo">← {{ backLabel }}</NuxtLink>
        </p>
    </article>
</template>
