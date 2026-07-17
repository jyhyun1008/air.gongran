let apiPromise: Promise<typeof YT> | null = null;

declare global {
    interface Window {
        YT?: typeof YT;
        onYouTubeIframeAPIReady?: () => void;
    }
    namespace YT {
        class Player {
            constructor(el: string | HTMLElement, options: Record<string, unknown>);
            loadVideoById(id: string): void;
            cueVideoById(id: string): void;
            playVideo(): void;
            pauseVideo(): void;
            seekTo(seconds: number, allowSeekAhead: boolean): void;
            getCurrentTime(): number;
            getDuration(): number;
            setVolume(volume: number): void;
            getVolume(): number;
            destroy(): void;
        }
        enum PlayerState {
            ENDED = 0,
            PLAYING = 1,
            PAUSED = 2,
        }
    }
}

export const useYoutubeIframeApi = (): Promise<typeof YT> => {
    if (apiPromise) return apiPromise;

    apiPromise = new Promise((resolve) => {
        if (window.YT?.Player) {
            resolve(window.YT);
            return;
        }
        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            previous?.();
            resolve(window.YT as typeof YT);
        };
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
    });

    return apiPromise;
};
