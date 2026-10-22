<script setup lang="ts">
// Markdown usage (MDC block component):
//
// ::photo-grid
// ---
// cover: true          # optional: first photo spans the full width
// items:
//   - src: /images/foo.webp
//     caption: 설명
//     label: 공간 이름   # optional small label above the caption
// ---
// ::
defineProps<{
    items: Array<{ src: string; caption?: string; label?: string }>;
    cover?: boolean;
}>();
</script>

<template>
    <div class="photo-grid" :class="{ 'has-cover': cover }">
        <figure v-for="item in items" :key="item.src" class="photo-card">
            <a :href="item.src" target="_blank" rel="noopener" :aria-label="`${item.caption ?? '사진'} 크게 보기`">
                <img :src="item.src" :alt="item.caption ?? ''" loading="lazy" />
                <span class="photo-card-enlarge" aria-hidden="true">↗</span>
            </a>
            <figcaption v-if="item.caption || item.label">
                <span v-if="item.label" class="photo-card-label">{{ item.label }}</span>
                {{ item.caption }}
            </figcaption>
        </figure>
    </div>
</template>
