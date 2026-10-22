<script setup lang="ts">
const route = useRoute();
const isListRoute = computed(() => route.name === "sample");

const { selectedTag, allTags } = useSampleLibrary();

// Detail routes need their own item's title in the header. The layout persists
// across /sample <-> /sample/[slug] navigation (so SamplePlayer keeps playing),
// so this can't fetch fresh per page — but the detail page already resolves its
// own data and calls player.load() with it on mount, so just read that back
// instead of re-querying (which was slow and caused a stale-header flash).
const { current } = useSamplePlayer();
</script>

<template>
    <SiteHeader />

    <main class="content-wide">
        <div v-if="isListRoute">
            <div class="page-title">
                <h2>sample</h2>
                <p>작업 샘플을 바로 들어보고 볼 수 있어요.</p>
            </div>
            <TagFilter v-model="selectedTag" :tags="allTags" />
        </div>
        <div v-else-if="current" class="page-title">
            <h2>{{ current.title }}</h2>
        </div>

        <div class="sample-layout">
            <div class="sample-player-pane">
                <SamplePlayer />
            </div>
            <div class="sample-content-pane">
                <slot />
            </div>
        </div>
    </main>

    <SiteFooter />
</template>
