<script setup lang="ts">
interface NavItem {
    title: string;
    path: string;
    children?: NavItem[];
}

defineProps<{
    items: NavItem[];
    // the project these docs belong to, shown above the tree
    title: string;
    titleTo: string;
}>();

const { isOpen, toggle } = useDocsSidebar();
</script>

<template>
    <button type="button" class="docs-sidebar-toggler" @click="toggle()">
        {{ isOpen ? "목차 닫기" : "문서 목차" }}
    </button>
    <aside class="docs-sidebar" :class="{ open: isOpen }">
        <!-- the drawer covers the toggler button above, so it needs its
        own close button reachable from inside it -->
        <button type="button" class="docs-sidebar-close" @click="toggle(false)">✕ 닫기</button>
        <NuxtLink :to="titleTo" class="docs-sidebar-title">{{ title }}</NuxtLink>
        <DocsNavList :items="items" />
    </aside>
</template>
