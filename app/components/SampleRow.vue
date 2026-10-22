<script setup lang="ts">
import type { SampleTrack } from "~/composables/useSamplePlayer";

const props = defineProps<{
    item: SampleTrack & { path: string; tags?: string[] | null };
    index?: number;
}>();

const { toggle, isCurrent, isPlaying } = useSamplePlayer();

const isActive = computed(() => isCurrent(props.item.path));
const isActivePlaying = computed(() => isActive.value && isPlaying.value);

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

        <svg class="sample-kind-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <template v-if="item.type === 'audio'">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
            </template>
            <template v-else-if="item.type === 'youtube'">
                <rect x="2" y="6" width="14" height="12" rx="2" />
                <path d="M16 10l6-3v10l-6-3" />
            </template>
            <template v-else>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="M21 15l-5-5L5 21" />
            </template>
        </svg>
    </li>
</template>
