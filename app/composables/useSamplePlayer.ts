export interface SampleTrack {
    path: string;
    title: string;
    type: "youtube" | "audio" | "illustration";
    image?: string | null;
    audioSrc?: string | null;
    youtubeId?: string | null;
    comment?: string | null;
}

// off: stop when the track ends. all: advance to the next playable track,
// looping back to the start of the queue after the last one. one: repeat
// the current track.
export type SamplePlaybackMode = "off" | "all" | "one";

let audioEl: HTMLAudioElement | null = null;
let ytPlayer: YT.Player | null = null;
let ytPollTimer: ReturnType<typeof setInterval> | null = null;

export const useSamplePlayer = () => {
    const current = useState<SampleTrack | null>("sample-player-current", () => null);
    const isPlaying = useState("sample-player-is-playing", () => false);
    const currentTime = useState("sample-player-current-time", () => 0);
    const duration = useState("sample-player-duration", () => 0);
    const playbackMode = useState<SamplePlaybackMode>("sample-player-mode", () => "off");
    const queue = useState<SampleTrack[]>("sample-player-queue", () => []);

    const isPlayable = computed(
        () => current.value?.type === "audio" || current.value?.type === "youtube"
    );

    const isCurrent = (path: string) => current.value?.path === path;

    const stopYtPolling = () => {
        if (ytPollTimer) {
            clearInterval(ytPollTimer);
            ytPollTimer = null;
        }
    };

    const startYtPolling = () => {
        stopYtPolling();
        ytPollTimer = setInterval(() => {
            if (!ytPlayer) return;
            currentTime.value = ytPlayer.getCurrentTime() ?? 0;
            duration.value = ytPlayer.getDuration() ?? 0;
        }, 250);
    };

    const bindAudioElement = (el: HTMLAudioElement) => {
        audioEl = el;
        el.addEventListener("play", () => (isPlaying.value = true));
        el.addEventListener("pause", () => (isPlaying.value = false));
        el.addEventListener("ended", () => {
            isPlaying.value = false;
            handleEnded();
        });
        el.addEventListener("timeupdate", () => (currentTime.value = el.currentTime));
        el.addEventListener("loadedmetadata", () => (duration.value = el.duration || 0));
    };

    const bindYoutubePlayer = (player: YT.Player) => {
        ytPlayer = player;
    };

    const onYoutubeStateChange = (state: YT.PlayerState) => {
        if (state === 1 /* PLAYING */) {
            isPlaying.value = true;
            startYtPolling();
        } else {
            isPlaying.value = false;
            stopYtPolling();
            if (state === 0 /* ENDED */) {
                currentTime.value = 0;
                handleEnded();
            }
        }
    };

    const pause = () => {
        if (current.value?.type === "audio") audioEl?.pause();
        else if (current.value?.type === "youtube") ytPlayer?.pauseVideo();
    };

    const resume = () => {
        if (current.value?.type === "audio") audioEl?.play();
        else if (current.value?.type === "youtube") ytPlayer?.playVideo();
    };

    const restart = () => {
        if (current.value?.type === "audio" && audioEl) {
            audioEl.currentTime = 0;
            audioEl.play();
        } else if (current.value?.type === "youtube" && ytPlayer) {
            ytPlayer.seekTo(0, true);
            ytPlayer.playVideo();
        }
    };

    const setQueue = (tracks: SampleTrack[]) => {
        queue.value = tracks;
    };

    const cycleMode = () => {
        playbackMode.value =
            playbackMode.value === "off" ? "all" : playbackMode.value === "all" ? "one" : "off";
    };

    const isQueueable = (track: SampleTrack) => track.type === "audio" || track.type === "youtube";

    // Advances to the next *playable* track in the registered queue, skipping
    // over illustration entries (nothing to autoplay there) — looping back to
    // the start of the queue once the end is reached.
    const playNext = () => {
        if (!current.value || queue.value.length === 0) return;
        const currentIndex = queue.value.findIndex((track) => track.path === current.value?.path);
        if (currentIndex === -1) return;
        const ordered = [...queue.value.slice(currentIndex + 1), ...queue.value.slice(0, currentIndex + 1)];
        const next = ordered.find(isQueueable);
        if (next) select(next);
    };

    const handleEnded = () => {
        if (playbackMode.value === "one") restart();
        else if (playbackMode.value === "all") playNext();
    };

    const select = (track: SampleTrack) => {
        const isSameTrack = current.value?.path === track.path;

        // stop whatever the *previous* track was playing before swapping —
        // otherwise switching e.g. audio -> illustration leaves audio running silently.
        if (!isSameTrack) {
            audioEl?.pause();
            ytPlayer?.pauseVideo();
        }

        current.value = track;
        currentTime.value = 0;
        duration.value = 0;

        if (track.type === "audio") {
            if (audioEl && track.audioSrc) {
                if (!isSameTrack) audioEl.src = track.audioSrc;
                audioEl.play();
            }
        } else if (track.type === "youtube") {
            if (ytPlayer && track.youtubeId) ytPlayer.loadVideoById(track.youtubeId);
        }
    };

    // Loads a track into the player without starting playback — safe to call
    // outside a user gesture (e.g. when a detail page mounts).
    const load = (track: SampleTrack) => {
        if (current.value?.path === track.path) return;

        audioEl?.pause();
        ytPlayer?.pauseVideo();

        current.value = track;
        currentTime.value = 0;
        duration.value = 0;

        if (track.type === "audio") {
            if (audioEl && track.audioSrc) audioEl.src = track.audioSrc;
        } else if (track.type === "youtube") {
            if (ytPlayer && track.youtubeId) ytPlayer.cueVideoById(track.youtubeId);
        }
    };

    const toggle = (track: SampleTrack) => {
        if (isCurrent(track.path) && isPlaying.value) {
            pause();
        } else if (isCurrent(track.path)) {
            resume();
        } else {
            select(track);
        }
    };

    const seekToFraction = (fraction: number) => {
        const target = fraction * duration.value;
        if (current.value?.type === "audio" && audioEl) audioEl.currentTime = target;
        else if (current.value?.type === "youtube" && ytPlayer) ytPlayer.seekTo(target, true);
        currentTime.value = target;
    };

    return {
        current,
        isPlaying,
        currentTime,
        duration,
        isPlayable,
        isCurrent,
        playbackMode,
        setQueue,
        cycleMode,
        select,
        load,
        toggle,
        pause,
        resume,
        seekToFraction,
        bindAudioElement,
        bindYoutubePlayer,
        onYoutubeStateChange,
    };
};
