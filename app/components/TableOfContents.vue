<script setup lang="ts">
defineProps<{
    links?: Array<{
        id: string;
        text: string;
        depth: number;
        children?: Array<{ id: string; text: string; depth: number }>;
    }> | null;
}>();
</script>

<template>
    <nav class="toc">
        <p class="toc-title">목차</p>
        <ul v-if="links?.length" class="toc-list">
            <li v-for="link in links" :key="link.id">
                <a :href="`#${link.id}`">{{ link.text }}</a>
                <ul v-if="link.children?.length">
                    <li v-for="child in link.children" :key="child.id">
                        <a :href="`#${child.id}`">{{ child.text }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>
