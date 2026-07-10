<script setup lang="ts">
const {
    current,
    isPlaying,
    currentTime,
    duration,
    isPlayable,
    playbackMode,
    cycleMode,
    toggle,
    seekToFraction,
    bindAudioElement,
    bindYoutubePlayer,
    onYoutubeStateChange,
} = useSamplePlayer();

const audioRef = ref<HTMLAudioElement | null>(null);
const ytMountRef = ref<HTMLDivElement | null>(null);
const titleWrapRef = ref<HTMLDivElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);

const isMarquee = ref(false);
const marqueeDuration = ref(10);

const checkMarquee = async () => {
    await nextTick();
    const wrap = titleWrapRef.value;
    const text = titleRef.value;
    if (!wrap || !text) return;
    const overflowWidth = text.scrollWidth;
    isMarquee.value = overflowWidth > wrap.clientWidth;
    // keep a steady scroll speed regardless of title length
    marqueeDuration.value = Math.max(6, overflowWidth / 40);
};

watch(() => current.value?.title, checkMarquee, { immediate: true });
onMounted(() => {
    window.addEventListener("resize", checkMarquee);
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", checkMarquee);
});

const progressFraction = computed(() => (duration.value ? currentTime.value / duration.value : 0));

const typeLabel = computed(() => {
    switch (current.value?.type) {
        case "audio":
            return "오디오";
        case "youtube":
            return "영상";
        case "illustration":
            return "일러스트";
        default:
            return "";
    }
});

const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
};

const onSeekInput = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value);
    seekToFraction(value);
};

const onTogglePlay = () => {
    if (current.value) toggle(current.value);
};

const modeLabel = computed(() => {
    switch (playbackMode.value) {
        case "all":
            return "반복 재생 (전체 루프)";
        case "one":
            return "반복 재생 (한 곡 루프)";
        default:
            return "반복 재생 꺼짐";
    }
});

onMounted(async () => {
    if (audioRef.value) bindAudioElement(audioRef.value);

    const YT = await useYoutubeIframeApi();
    if (!ytMountRef.value) return;
    const player = new YT.Player(ytMountRef.value, {
        videoId: current.value?.type === "youtube" ? current.value.youtubeId ?? "" : "",
        playerVars: { controls: 0, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
            onReady: () => {
                bindYoutubePlayer(player);
                // a detail page may have already selected a track before the
                // API finished loading — sync it in now, paused.
                if (current.value?.type === "youtube" && current.value.youtubeId) {
                    player.cueVideoById(current.value.youtubeId);
                }
            },
            onStateChange: (event: { data: YT.PlayerState }) => onYoutubeStateChange(event.data),
        },
    });
});
</script>

<template>
    <div class="sample-player">
        <div class="sample-player-art">
            <div class="yt-wrapper" v-show="current?.type === 'youtube'">
                <div ref="ytMountRef"></div>
            </div>

            <template v-if="current?.type === 'audio'">
                <ThumbnailImage class="art-cover" :src="current.image" :alt="current.title" />
            </template>

            <template v-else-if="current?.type === 'illustration'">
                <span
                    v-if="current.image"
                    class="art-bg"
                    :style="{ backgroundImage: `url(${current.image})` }"
                ></span>
                <img v-if="current.image" class="art-fg" :src="current.image" :alt="current.title" />
                <ThumbnailImage v-else :alt="current.title" />
            </template>

            <div v-if="!current" class="thumbnail-fallback">...</div>
        </div>

        <div class="sample-player-meta">
            <span v-if="typeLabel" class="sample-player-type">{{ typeLabel }}</span>
            <div ref="titleWrapRef" class="sample-player-title-wrap">
                <div
                    class="sample-player-title-track"
                    :class="{ marquee: isMarquee }"
                    :style="{ '--marquee-duration': `${marqueeDuration}s` }"
                >
                    <span ref="titleRef" class="sample-player-title">
                        {{ current ? current.title : "재생할 항목을 선택해 주세요" }}
                    </span>
                    <span v-if="isMarquee" class="sample-player-title" aria-hidden="true">
                        {{ current?.title }}
                    </span>
                </div>
            </div>
        </div>

        <div class="sample-player-bar" :class="{ disabled: !isPlayable }">
            <div class="sample-player-seek-wrap">
                <div class="sample-player-seek-track">
                    <div
                        class="sample-player-seek-fill"
                        :style="{ width: `${progressFraction * 100}%` }"
                    ></div>
                </div>
                <input
                    class="sample-player-seek"
                    type="range"
                    min="0"
                    max="1"
                    step="0.001"
                    :value="progressFraction"
                    :disabled="!isPlayable"
                    @input="onSeekInput"
                />
            </div>
            <div class="sample-player-time">
                <span>{{ formatTime(currentTime) }}</span>
                <span>{{ formatTime(duration) }}</span>
            </div>
        </div>

        <div class="sample-player-controls">
            <button
                type="button"
                class="sample-player-mode-toggle"
                :class="{ active: playbackMode !== 'off' }"
                :aria-label="modeLabel"
                :title="modeLabel"
                @click="cycleMode"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 1l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7 23l-4-4 4-4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span v-if="playbackMode === 'one'" class="sample-player-mode-badge">1</span>
            </button>
            <button
                type="button"
                class="sample-player-toggle"
                :disabled="!isPlayable"
                :aria-label="isPlaying ? '일시정지' : '재생'"
                @click="onTogglePlay"
            >
                {{ isPlaying ? "⏸" : "▶" }}
            </button>
        </div>

        <audio ref="audioRef" class="sample-player-audio-el"></audio>
    </div>
</template>
