import MuxPlayer from "@mux/mux-player-react/lazy";
import { useState } from "react";

interface BannerVideoProps {
    videoSrc: string;
    posterImg: string;
    i18n: {
        PLAY_PAUSE: string;
        BANNER_VIDEO_HOME: string;
    };
}

export default function BannerVideo({ videoSrc, posterImg, i18n }: BannerVideoProps) {

    const [isPlaying, setIsPlaying] = useState(true);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        const player = document.querySelector("mux-player") as any;
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    };

    return (
        <>
            <style>
                {`
                    mux-player {
                        --controls: none;
                        --media-object-fit: cover;
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                    }
                    mux-player::part(gesture-layer) {
                        display: none;
                    }
                    `}
            </style>
            <section className="h-120 md:h-150 relative z-10 overflow-hidden">
                <MuxPlayer
                    playbackId={videoSrc}
                    loop
                    muted
                    autoPlay
                    poster={posterImg}
                    placeholder={posterImg}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center brightness-75 z-0 mask-radial-[140%_100%] mask-radial-from-90% mask-radial-at-top"
                    metadata={{
                        video_title: i18n.BANNER_VIDEO_HOME,
                    }}
                />
                <button
                    id="btn-video-home"
                    onClick={handlePlayPause}
                    className="absolute z-10 bottom-2 left-1/2 -translate-x-1/2 bg-white hover:bg-gray-100 transition rounded-full p-6 shadow-lg group cursor-pointer"
                >
                    <span className="sr-only">{i18n.PLAY_PAUSE}</span>
                    {/* Icon Pause */}
                    <svg className={`Pause size-10 transition-transform duration-300 group-hover:scale-110 ${isPlaying ? "block" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                        <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                    </svg>
                    {/* Icon Play */}
                    <svg className={`Play size-10 transition-transform duration-300 group-hover:scale-110 ${isPlaying ? "hidden" : "block"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
                    </svg>
                </button>
            </section>
        </>
    );
}