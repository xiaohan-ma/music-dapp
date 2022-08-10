import "../styles/MusicCard2.css";
import SongCover from "../image/BestBird.png";

function MusicCard2() {
  return (
    <div className="card2">
      <div className="musicCover2">
        <img alt="Music cover art" src={SongCover} />
      </div>
      <div className="musicDesc2">
        <h3>Artist Name</h3>
        <h2>Music Title</h2>
        <button className="play-btn">Play</button>
      </div>
    </div>
  );
}

export default MusicCard2;
