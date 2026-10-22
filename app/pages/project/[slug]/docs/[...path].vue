<script setup lang="ts">
definePageMeta({ contentWidth: "full" });

interface NavNode {
    title: string;
    path: string;
    children?: NavNode[];
}

const route = useRoute();
const slug = route.params.slug as string;
const projectPath = `/project/${slug}`;
const docsRoot = `${projectPath}/docs`;

const { data: project } = await useAsyncData(`project-${projectPath}`, () =>
    queryCollection("project").path(projectPath).first()
);

const { data: page } = await useAsyncData(`docs-${route.path}`, () =>
    queryCollection("docs").path(route.path).first()
);

if (!project.value || !page.value) {
    throw createError({ statusCode: 404, statusMessage: "문서를 찾을 수 없습니다." });
}

const { data: nav } = await useAsyncData(`docs-navigation-${docsRoot}`, () =>
    queryCollectionNavigation("docs").where("path", "LIKE", `${docsRoot}%`)
);

const { data: surround } = await useAsyncData(`docs-surround-${route.path}`, () =>
    queryCollectionItemSurroundings("docs", route.path, {
        fields: ["title", "description"],
    }).where("path", "LIKE", `${docsRoot}%`)
);

useSeoMeta({
    title: () => `${page.value?.title} | ${project.value?.title} | GONGRAN`,
    description: () => page.value?.description,
});

const prevPage = computed(() => surround.value?.[0] ?? null);
const nextPage = computed(() => surround.value?.[1] ?? null);

// Navigation comes back nested under /project -> /project/<slug> -> .../docs;
// the sidebar should start at the docs folder's own children.
const findNode = (nodes: NavNode[], path: string): NavNode | null => {
    for (const node of nodes) {
        if (node.path === path) return node;
        const found = findNode(node.children ?? [], path);
        if (found) return found;
    }
    return null;
};
const sidebarItems = computed(() => findNode((nav.value ?? []) as NavNode[], docsRoot)?.children ?? []);
</script>

<template>
    <div class="docs-layout">
        <DocsSidebar :items="sidebarItems" :title="project?.title ?? ''" :title-to="projectPath" />

        <article v-if="page" class="docs-content">
            <header class="docs-page-header">
                <NuxtLink :to="projectPath" class="docs-project-link">← {{ project?.title }}</NuxtLink>
                <h1>{{ page.title }}</h1>
                <p v-if="page.description" class="docs-page-desc">{{ page.description }}</p>
            </header>

            <ContentRenderer :value="page" class="prose" />

            <nav v-if="prevPage || nextPage" class="docs-surround">
                <NuxtLink v-if="prevPage" :to="prevPage.path" class="docs-surround-link prev">
                    <span class="docs-surround-label">← 이전</span>
                    <span class="docs-surround-title">{{ prevPage.title }}</span>
                </NuxtLink>
                <span v-else />
                <NuxtLink v-if="nextPage" :to="nextPage.path" class="docs-surround-link next">
                    <span class="docs-surround-label">다음 →</span>
                    <span class="docs-surround-title">{{ nextPage.title }}</span>
                </NuxtLink>
            </nav>
        </article>

        <TableOfContents class="docs-toc" :links="(page as any)?.body?.toc?.links" />
    </div>
</template>
