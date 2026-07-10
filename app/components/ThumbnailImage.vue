<script setup lang="ts">
withDefaults(
    defineProps<{
        src?: string | null;
        alt: string;
        fallbackText?: string;
    }>(),
    { fallbackText: "..." }
);
</script>

<template>
    <img v-if="src" :src="src" :alt="alt" loading="lazy" />
    <div v-else class="thumbnail-fallback" role="img" :aria-label="alt">
        {{ fallbackText }}
    </div>
</template>
