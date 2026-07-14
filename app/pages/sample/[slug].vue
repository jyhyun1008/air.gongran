<script setup lang="ts">
definePageMeta({ layout: "sample" });

const route = useRoute();

const { data: page } = await useAsyncData(`sample-${route.path}`, () =>
    queryCollection("sample").path(route.path).first()
);

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: "샘플을 찾을 수 없습니다." });
}

useSeoMeta({ title: () => `${page.value?.title} | sample | GONGRAN` });

const { load } = useSamplePlayer();

onMounted(() => {
    if (page.value) load(page.value);
});
</script>

<template>
    <template v-if="page">
        <div v-if="page.type === 'illustration'" class="sample-illustration-hero">
            <img v-if="page.image" :src="page.image" :alt="page.title" />
            <ThumbnailImage v-else :alt="page.title" />
        </div>

        <p v-if="page.comment" class="text-center">{{ page.comment }}</p>

        <ul v-if="page.tags?.length" class="item-tags text-center" style="justify-content: center">
            <li v-for="tag in sortTags(page.tags)" :key="tag" :class="{ primary: isPrimaryTag(tag) }">
                {{ tag }}
            </li>
        </ul>

        <ContentRenderer :value="page" />

        <p class="text-center" style="margin-top: 60px">
            <NuxtLink to="/sample">← sample 목록으로</NuxtLink>
        </p>
    </template>
</template>
