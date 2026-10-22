export const useTagFilter = <T extends { tags?: string[] | null }>(items: Ref<T[] | null | undefined>) => {
    const route = useRoute();
    const router = useRouter();
    const nuxtApp = useNuxtApp();

    // The URL (?tag=) is the single source of truth, so a layout and its page
    // that both call this always agree, and back/forward or a pasted link
    // just works. Pages are prerendered without a query, though, so while
    // hydrating we must render the unfiltered list the HTML was built with
    // and only apply the query once mounted — otherwise the payload's state
    // wins and a direct /sample?tag=… visit shows everything.
    const isReady = ref(import.meta.client && !nuxtApp.isHydrating);
    onMounted(() => (isReady.value = true));

    const queryTag = computed(() => {
        const tag = route.query.tag;
        const value = Array.isArray(tag) ? tag[0] : tag;
        return value || null;
    });

    const selectedTag = computed<string | null>({
        get: () => (isReady.value ? queryTag.value : null),
        set: (tag) => {
            router.replace({ query: { ...route.query, tag: tag ?? undefined } });
        },
    });

    const allTags = computed(() => {
        const set = new Set<string>();
        for (const item of items.value ?? []) {
            for (const tag of item.tags ?? []) set.add(tag);
        }
        return sortTags([...set]);
    });

    const filteredItems = computed(() => {
        if (!selectedTag.value) return items.value ?? [];
        return (items.value ?? []).filter((item) =>
            (item.tags ?? []).includes(selectedTag.value as string)
        );
    });

    return { selectedTag, allTags, filteredItems };
};
