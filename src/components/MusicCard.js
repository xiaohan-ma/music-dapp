import React from "react";
import "../styles/MusicCard.css";
import Buzzard from "../image/buzzard.png";

function MusicCard() {
  return (
    <div className="card">
      <div className="musicCover">
        <img alt="Music cover art" src={Buzzard} />
      </div>
      <div className="musicDesc">
        <h3>Artist Name</h3>
        <h2>Music Title</h2>
        <button className="mint-btn">Mint Music</button>
      </div>
    </div>
  );
}

export default MusicCard;
