import { BsMusicNoteBeamed } from 'react-icons/bs';
import { Row, Col } from "reactstrap";

const DisplayTrack = ({ baseUrl, currentTrack, audioRef, setDuration, progressBarRef, handleNext, ifRandom, ifRepeat }) => {

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    return (
        <Row>
            <audio src={baseUrl + currentTrack.url} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={() => handleNext(ifRandom, ifRepeat)} />
            <Col xs="6" style={{ background: "#1e1e1e" }}>
                <div className="audio-image">
                    {currentTrack.thumbnail ? (
                        <img src={currentTrack.thumbnail} alt="audio avatar" />
                    ) : (
                        <div className="icon-wrapper">
                            <span className="audio-icon">
                                <BsMusicNoteBeamed />
                            </span>
                        </div>
                    )}
                </div>
            </Col>
            <Col xs="6">
                <Row>
                    <p className="title">{currentTrack.name}</p>
                    <p className="title">{currentTrack.category}</p>
                </Row>
            </Col>
        </Row>
    );
};
export default DisplayTrack;