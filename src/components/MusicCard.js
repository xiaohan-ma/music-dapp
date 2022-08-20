import React from "react";
import Buzzard from "../image/buzzard.png";
import "../styles/MusicCard.css";

function MusicCard(data) {
  return (
    <div className="card">
      <div className="musicCover">
        <img alt="Music cover art" src={data.data.image} />
      </div>
      <div className="musicDesc">
        <h3>{data.data.artist}</h3>
        <h2>{data.data.name}</h2>
        <button className="mint-btn">Purchase Music</button>
      </div>
    </div>
  );
}

export default MusicCard;
