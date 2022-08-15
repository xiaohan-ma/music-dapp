import "../styles/ProfilePage.css";
import MusicCard2 from "../components/MusicCard2";
import ProfileIcon from "../image/moonbird.png";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const ProfilePage = (props) => {
  const [tokens, setTokens] = useState(false);

  /** Display tokens owned by user */
  async function displayOwnedTokens() {}

  useEffect(() => {
    if (!tokens) {
      displayOwnedTokens();
    }
  });

  return (
    <div className="container">
      <div className="profileSection">
        <div className="profileHeader">
          <div className="profileIcon">
            <img alt="Profile Icon" src={ProfileIcon} />
          </div>
          <div className="profileDetails">
            <h3>COLLECTOR PROFILE</h3>
            <h1>Username</h1>
            <div id="walletDetails">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
              </svg>
              <h3>
                {props.walletAddress ? props.walletAddress : "Wallet Address"}
              </h3>
            </div>
          </div>
        </div>
        <div className="profileMain">
          <div className="profileCollection">
            <h2>Collection</h2>
            <div className="profileAssets">
              <MusicCard2 />
              <MusicCard2 />
              <MusicCard2 />

              <MusicCard2 />

              <MusicCard2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
