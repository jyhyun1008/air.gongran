export const useSampleLibrary = () => {
    const { data: items } = useAsyncData("sample-list", () =>
        queryCollection("sample").order("date", "DESC").all()
    );

    const { selectedTag, allTags, filteredItems } = useTagFilter(items);

    return { items, selectedTag, allTags, filteredItems };
};
