export const useTagFilter = <T extends { tags?: string[] | null }>(
    items: Ref<T[] | null | undefined>,
    // pass a key when multiple components (e.g. a layout and its page) need
    // to share the same selected-tag state instead of each getting their own.
    stateKey?: string
) => {
    const route = useRoute();
    const router = useRouter();

    const selectedTag = stateKey
        ? useState<string | null>(stateKey, () => (route.query.tag as string) ?? null)
        : ref<string | null>((route.query.tag as string) ?? null);

    watch(selectedTag, (tag) => {
        router.replace({ query: { ...route.query, tag: tag ?? undefined } });
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
