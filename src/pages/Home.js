//header
//footer
//nav
//playlist
//playercontrol
//connectwallet
//searchbar?

import { useEffect, useState } from "react";
import "../styles/Home.css";
import PromoCover from "../image/moonbird.png";
import MusicCard from "../components/MusicCard";
import { ethers } from "ethers";
import axios from "axios";
import PlatformContract from "../json/OtofyMarketplace.json";
const Home = () => {
  const [tokens, getTokens] = useState([]);

  /** Retrieve all tokens listed on platform */
  async function getAllTokens() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const otofyContract = new ethers.Contract(
      PlatformContract.address,
      PlatformContract.abi,
      signer
    );

    let process = await otofyContract.getAllTokens();

    const allTokens = await Promise.all(
      process.map(async (t) => {
        const uri = await otofyContract.tokenURI(t.tokenId);
        let metadata = await axios.get(uri);

        metadata = metadata.data;
        console.log(metadata);
        console.log(t.tokenId);
        const price = ethers.utils.formatUnits(t.price.toString(), "ether");

        let token = {
          price,
          tokenId: t.tokenId.toNumber(),
          artist: metadata.artist,
          seller: t.seller,
          name: metadata.name,
          owner: t.contractOwner,
          image: metadata.image,
          media: metadata.media,
          description: metadata.description,
        };
        console.log(token);
        return token;
      })
    );
    getTokens(allTokens);
  }
  useEffect(() => {
    getAllTokens();
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
          {tokens.map((value, index) => {
            return <MusicCard data={value} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
