<script setup lang="ts">
// Recursive: renders itself for nested folders, so `content/docs` structure
// maps 1:1 onto the sidebar tree.
defineOptions({ name: "DocsNavList" });

interface NavItem {
    title: string;
    path: string;
    navTitle?: string;
    page?: false;
    children?: NavItem[];
}

const props = defineProps<{
    items: NavItem[];
}>();

const route = useRoute();

// A folder with its own index page (e.g. `guide/1.index.md`) shows up in
// `queryCollectionNavigation` both as the folder node itself *and* as the
// first entry of its own `children` — drop that self-referencing duplicate.
const childrenOf = (item: NavItem): NavItem[] => (item.children ?? []).filter((child) => child.path !== item.path);
</script>

<template>
    <ul class="docs-nav-list">
        <li v-for="item in props.items" :key="item.path">
            <NuxtLink
                v-if="item.page !== false"
                :to="item.path"
                class="docs-nav-link"
                :class="{ active: route.path === item.path }"
            >
                {{ item.navTitle || item.title }}
            </NuxtLink>
            <span v-else class="docs-nav-group">{{ item.navTitle || item.title }}</span>

            <DocsNavList v-if="childrenOf(item).length" :items="childrenOf(item)" />
        </li>
    </ul>
</template>
