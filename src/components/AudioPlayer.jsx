import { useRef, useState, useEffect } from 'react';
import { getSongs } from '../data/getSongsApi';
import { Row, Col } from "reactstrap";

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import DisplayTrackList from './DisplayTrackList';
import ControlsVolume from './ControlsVolume';

const AudioPlayer = () => {
    const [tracks, setTracks] = useState([]);
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState({});
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [baseUrl, setBaseUrl] = useState('https://assets.breatheco.de/apis/sound/');
    const [isPlaying, setIsPlaying] = useState(false);
    const [ifRandom, setIfRandom] = useState(false);
    const [ifRepeat, setIfRepeat] = useState(false);

    useEffect(() => {
        async function fetchSongs() {
            const songs = await getSongs('https://playground.4geeks.com/apis/fake/sound/songs');
            if (songs.length > 0) {
                setTracks(songs);
                setCurrentTrack(songs[0]);
            }
        }

        fetchSongs();
    }, []);

    // reference
    const audioRef = useRef();
    const progressBarRef = useRef();

    const handleNext = (ifRandom, ifRepeat) => {
        if (ifRandom){
            let randomIndex = (Math.floor(Math.random() * tracks.length))
            setTrackIndex(randomIndex);
            setCurrentTrack(tracks[randomIndex])
            return;
        }

        if (ifRepeat){
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            return;
        }

        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
        } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
        }
    };

    return (
        <>
            <Row className="overflow-auto align-items-center mx-auto pb-0 bg-dark" id="music-list">
                <Col xs="12" className='p-0'>
                    <DisplayTrackList {...{ tracks, setCurrentTrack, setTrackIndex, trackIndex, setIsPlaying }}></DisplayTrackList>
                </Col>
            </Row>
            <Row className="bg-dark align-items-center mx-auto p-3" id="controls">
                <Col xs="6" sm="3">
                    <DisplayTrack {...{ baseUrl, currentTrack, audioRef, setDuration, progressBarRef, handleNext, ifRandom, ifRepeat }} />
                </Col>
                <Col xs="6" sm="6">
                    <Row className='pb-3'>
                        <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress, tracks, trackIndex, setTrackIndex, setCurrentTrack, handleNext, isPlaying, setIsPlaying, ifRandom, setIfRandom,ifRepeat, setIfRepeat }} />
                    </Row>
                    <Row>
                        <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
                    </Row>
                </Col>
                <Col xs="12" sm="3">
                    <ControlsVolume {...{ audioRef }}></ControlsVolume>
                </Col>
            </Row>
        </>
    );
};
export default AudioPlayer;