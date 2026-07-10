<script setup lang="ts">
import type { SampleTrack } from "~/composables/useSamplePlayer";

const props = defineProps<{
    item: SampleTrack & { path: string; tags?: string[] | null };
    index?: number;
}>();

const { toggle, isCurrent, isPlaying } = useSamplePlayer();

const isActive = computed(() => isCurrent(props.item.path));
const isActivePlaying = computed(() => isActive.value && isPlaying.value);

const kindIcon = computed(() => {
    switch (props.item.type) {
        case "audio":
            return "fa-music";
        case "youtube":
            return "fa-video";
        default:
            return "fa-image";
    }
});

const sortedTags = computed(() => sortTags(props.item.tags ?? []));

const onPlayClick = () => toggle(props.item);
</script>

<template>
    <li class="sample-row" :class="{ active: isActive }">
        <span class="sample-index">
            <span v-if="isActivePlaying" class="now-playing-eq"><i></i><i></i><i></i></span>
            <template v-else>{{ index }}</template>
        </span>

        <button type="button" class="sample-art" :aria-label="isActivePlaying ? '일시정지' : '재생'" @click="onPlayClick">
            <ThumbnailImage
                class="art-cover"
                :src="item.type === 'youtube' && item.youtubeId ? youtubeThumbnail(item.youtubeId) : item.image"
                :alt="item.title"
            />
            <span v-if="item.type !== 'illustration'" class="play-badge">
                <PlayPauseIcon :playing="isActivePlaying" />
            </span>
        </button>

        <div class="sample-body">
            <NuxtLink class="sample-title" :to="item.path">{{ item.title }}</NuxtLink>
            <p v-if="item.comment" class="sample-comment">{{ item.comment }}</p>
            <div v-if="sortedTags.length" class="sample-tags-line">
                <span v-for="tag in sortedTags" :key="tag" :class="{ primary: isPrimaryTag(tag) }">
                    {{ tag }}
                </span>
            </div>
        </div>

        <i class="sample-kind-icon fas" :class="kindIcon" aria-hidden="true"></i>
    </li>
</template>
