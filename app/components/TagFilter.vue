<script setup lang="ts">
const props = defineProps<{
    tags: string[];
    modelValue: string | null;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", tag: string | null): void;
}>();

// tags is already primary-first sorted (see useTagFilter), so filtering here
// preserves that order within each group.
const primaryTags = computed(() => props.tags.filter(isPrimaryTag));
const secondaryTags = computed(() => props.tags.filter((tag) => !isPrimaryTag(tag)));

const select = (tag: string | null) => {
    emit("update:modelValue", tag === props.modelValue ? null : tag);
};
</script>

<template>
    <div v-if="tags.length" class="tag-filter-group">
        <ul class="tag-filter">
            <li>
                <button type="button" :class="{ active: modelValue === null }" @click="select(null)">
                    전체보기
                </button>
            </li>
            <li v-for="tag in primaryTags" :key="tag">
                <button
                    type="button"
                    class="primary"
                    :class="{ active: modelValue === tag }"
                    @click="select(tag)"
                >
                    {{ tag }}
                </button>
            </li>
        </ul>
        <ul v-if="secondaryTags.length" class="tag-filter">
            <li v-for="tag in secondaryTags" :key="tag">
                <button type="button" :class="{ active: modelValue === tag }" @click="select(tag)">
                    {{ tag }}
                </button>
            </li>
        </ul>
    </div>
</template>
