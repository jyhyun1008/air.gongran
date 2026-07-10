export const useSampleLibrary = () => {
    const { data: items } = useAsyncData("sample-list", () =>
        queryCollection("sample").order("date", "DESC").all()
    );

    const { selectedTag, allTags, filteredItems } = useTagFilter(items, "sample-selected-tag");

    return { items, selectedTag, allTags, filteredItems };
};
