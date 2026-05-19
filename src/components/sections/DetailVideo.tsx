import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoProps {
    videoSrc: string;
    posterImg: string;
    titleVideo: string;
    buttonLabel: string;
}

export default function DetailVideo({ videoSrc, posterImg, titleVideo, buttonLabel }: VideoProps) {

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
            <MuxPlayer
                playbackId={videoSrc}
                loop
                muted
                autoPlay
                poster={posterImg}
                placeholder={posterImg}
                className="absolute top-0 left-0 w-full h-full object-cover object-center z-0 brightness-65"
                metadata={{
                    video_title: titleVideo,
                }}
            />
            <button
                id="btn-video-hero"
                onClick={handlePlayPause}
                className="absolute bottom-10 right-5 md:right-10 bg-linear-to-br from-sky-700 via-cyan-400 to-sky-500 transition rounded-full p-2 md:p-3 shadow-lg group cursor-pointer"
            >
                <span className="sr-only">{buttonLabel}</span>
                {/* Icon Pause */}
                <svg className={`Pause text-white size-10 transition-transform duration-300 group-hover:scale-110 ${isPlaying ? "block" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                    <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                </svg>
                {/* Icon Play */}
                <svg className={`Play text-white size-10 transition-transform duration-300 group-hover:scale-110 ${isPlaying ? "hidden" : "block"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
                </svg>
            </button>
        </>
    )
}