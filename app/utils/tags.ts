// Tags in this fixed order are treated as top-level categories: pulled to the
// front of any tag list and styled distinctly from the rest.
export const PRIMARY_TAGS = ["음악", "일러스트", "영상"] as const;

export const isPrimaryTag = (tag: string): boolean => (PRIMARY_TAGS as readonly string[]).includes(tag);

export const sortTags = (tags: string[]): string[] => {
    const primary = PRIMARY_TAGS.filter((tag) => tags.includes(tag));
    const secondary = tags.filter((tag) => !isPrimaryTag(tag)).sort((a, b) => a.localeCompare(b, "ko"));
    return [...primary, ...secondary];
};
