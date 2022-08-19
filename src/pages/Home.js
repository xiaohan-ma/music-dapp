//header
//footer
//nav
//playlist
//playercontrol
//connectwallet
//searchbar?

import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import PromoCover from "../image/moonbird.png";
import MusicCard from "../components/MusicCard";
import { ethers } from "ethers";

const Home = (props) => {
  const [tokens, getTokens] = useState(null);

  /** Retrieve all tokens listed on platform */
  async function getAllTokens() {
    const process = await props.platformContract.getAllTokens();

    const allTokens = await Promise.all(
      process.map(async (t) => {
        const tokenURI = await props.platformContract.tokenURI(t.tokenId);
        const response = await fetch(tokenURI + ".json");
        const metadata = await response.json();

        const price = ethers.utils.formatUnits(t.price.toString(), "ether");

        const token = {
          tokenId: t.tokenId.toNumber(),
          artist: metadata.artist,
          seller: t.seller,
          owner: t.owner,
          price,
          image: metadata.image,
          media: metadata.media,
          description: metadata.description,
        };
        return token;
      })
    );
    getTokens(allTokens);
  }

  useEffect(() => {
    !tokens && getAllTokens();
  }, []);

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
