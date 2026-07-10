<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <SiteHeader />

    <main :class="[route.meta.contentWidth ? `content-${route.meta.contentWidth}` : null]">
        <slot />
    </main>

    <SiteFooter />
</template>
