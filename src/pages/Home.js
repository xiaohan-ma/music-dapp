//header
//footer
//nav
//playlist
//playercontrol
//connectwallet
//searchbar?

import React from "react";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import PromoCover from "../image/moonbird.png";
import MusicCard from "../components/MusicCard";

const Home = () => {
  return (
    <div className="container">
      <div className="promoSection">
        <div className="promoAlbumCover">
          <img alt="Song Cover" src={PromoCover} />
        </div>
        <div className="promoDetails">
          <div className="promoAlbumDesc">
            <h3>Artist Name</h3>
            <h1>Song Title</h1>
          </div>
          <button className="mint-btn">Mint Music</button>
        </div>
      </div>
      <div className="sectionOne">
        <div className="sectionTitle">
          <h1>Explore music</h1>
          <p>Find new artists, songs and albums</p>
        </div>
        <div className="cardContainer">
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
          <MusicCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
