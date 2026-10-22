<script setup lang="ts">
// Markdown usage (MDC block component):
//
// ::feature-cards
// ---
// items:
//   - name: 기능 이름
//     image: /images/foo.webp   # optional thumbnail
//     position: 70% 50%         # optional: which part of the photo to focus on
//     zoom: 2                   # optional: magnify around `position` (default 1)
//     tags: [유형, 공간]
//     description: 설명
//     sharing: 공유 범위
// ---
// ::
defineProps<{
    items: Array<{
        name: string;
        image?: string;
        position?: string;
        zoom?: number;
        tags?: string[];
        description: string;
        sharing?: string;
    }>;
}>();

const thumbStyle = (item: { position?: string; zoom?: number }) => {
    if (!item.position) return undefined;
    return {
        objectPosition: item.position,
        transformOrigin: item.position,
        transform: item.zoom ? `scale(${item.zoom})` : undefined,
    };
};
</script>

<template>
    <div class="feature-cards">
        <article v-for="item in items" :key="item.name" class="feature-card">
            <figure class="feature-card-thumb">
                <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.name"
                    :style="thumbStyle(item)"
                    loading="lazy"
                />
                <div v-else class="thumbnail-fallback">사진 준비 중</div>
            </figure>
            <div class="feature-card-body">
                <p class="feature-card-name">{{ item.name }}</p>
                <ul v-if="item.tags?.length" class="item-tags">
                    <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
                </ul>
                <p class="feature-card-desc">{{ item.description }}</p>
                <p v-if="item.sharing" class="feature-card-sharing">
                    <span>공유 범위</span>
                    {{ item.sharing }}
                </p>
            </div>
        </article>
    </div>
</template>
