import { Row } from "reactstrap";

import { useState, useEffect } from 'react';

import {
    IoMdVolumeHigh,
    IoMdVolumeOff,
    IoMdVolumeLow,
} from 'react-icons/io';

const ControlsVolume = ({ audioRef}) => {

    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume]);

    return (
        <Row>

            <div className="volume">
                <button onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume || volume < 1 ? (
                        <IoMdVolumeOff />
                    ) : volume < 40 ? (
                        <IoMdVolumeLow />
                    ) : (
                        <IoMdVolumeHigh />
                    )}
                </button>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    style={{
                        background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
                    }}
                />
            </div>
        </Row>
    );
};

export default ControlsVolume;