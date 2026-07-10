<script setup lang="ts">
defineProps<{
    playing: boolean;
}>();
</script>

<template>
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <template v-if="playing">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
        </template>
        <polygon v-else points="6 4 20 12 6 20" />
    </svg>
</template>
