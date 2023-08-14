import { Row, Button } from 'reactstrap';

const DisplayTrackList = ({ tracks, setCurrentTrack, setTrackIndex, trackIndex, setIsPlaying }) => {

    const setSong = (song) => {
        setTrackIndex(song.id - 1);
        setCurrentTrack(song);
        setIsPlaying(true);
    }

    return (
        <>
            <ul className="list-group list-group-numbered">
                {tracks &&
                    tracks.map(song => (
                        <a key={song.id} onClick={() => setSong(song)} className={"list-group-item list-group-item-action list-group-item-dark" + ((song.id - 1) === trackIndex ? " active" : "")} aria-current="true">
                            {song.name}
                        </a>
                    ))}
            </ul>
        </>
    )
}

export default DisplayTrackList