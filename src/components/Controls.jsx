import { Row } from "reactstrap";

import { useState, useEffect, useCallback, useRef } from 'react';

// icons
import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
    IoShuffle,
    IoRepeat,
} from 'react-icons/io5';


const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress, tracks, trackIndex, setTrackIndex, setCurrentTrack, handleNext, isPlaying, setIsPlaying, ifRandom, setIfRandom,ifRepeat, setIfRepeat }) => {

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const skipForward = () => {
        audioRef.current.currentTime += 15;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    };

    const handlePrevious = (ifRandom, ifRepeat) => {
        if (ifRandom) {
            let randomIndex = (Math.floor(Math.random() * tracks.length))
            setTrackIndex(randomIndex);
            setCurrentTrack(tracks[randomIndex])
            return;
        }

        if (ifRepeat) {
            setTrackIndex(trackIndex);
            setCurrentTrack(tracks[trackIndex])
            audioRef.current.currentTime = 0;
            return;
        }

        if (trackIndex === 0) {
            let lastTrackIndex = tracks.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
        } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
        }
    };

    const handleRandom = () => {
        setIfRandom((prev) => !prev);

        if (ifRepeat) {
            setIfRepeat(false);
        }
    }

    const handleRepeat = () => {
        setIfRepeat((prev) => !prev);

        if (ifRandom) {
            setIfRandom(false);
        }
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

    return (
        <Row>
            <div className="controls-wrapper">
                <div className="controls">
                    <button className={ifRandom ? "pressed" : ""} onClick={handleRandom}>
                        <IoShuffle />
                    </button>
                    <button onClick={() => handlePrevious(ifRandom, ifRepeat)}>
                        <IoPlaySkipBackSharp />
                    </button>
                    <button onClick={skipBackward}>
                        <IoPlayBackSharp />
                    </button>

                    <button onClick={togglePlayPause}>
                        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                    </button>
                    <button onClick={skipForward}>
                        <IoPlayForwardSharp />
                    </button>
                    <button onClick={() => handleNext(ifRandom, ifRepeat)}>
                        <IoPlaySkipForwardSharp />
                    </button>
                    <button className={ifRepeat ? "pressed" : ""} onClick={() => handleRepeat(ifRepeat)}>
                        <IoRepeat />
                    </button>
                </div>
            </div>
        </Row>
    );
};

export default Controls;