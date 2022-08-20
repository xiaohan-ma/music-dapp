import "../styles/UploadPage.css";
import { useState } from "react";
import { Contract, ethers } from "ethers";
import { pinFileToIpfs, pinJSONToIpfs } from "../utils/pinata";
import PlatformContract from "../json/OtofyMarketplace.json";

const UploadPage = () => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [media, setMedia] = useState("");
  const [artist, setArtist] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(null);

  /** IPFS upload for cover image */
  async function coverIpfsUpload(event) {
    event.preventDefault();
    const file = event.target.files[0];

    try {
      const result = await pinFileToIpfs(file);
      console.log(result);
      setImage(result.pinataURL);
    } catch (error) {
      console.log(error);
    }
  }

  /** IPFS upload for audio/mp3 file */
  async function mediaIpfsUpload(event) {
    event.preventDefault();
    const file = event.target.files[0];

    try {
      const result = await pinFileToIpfs(file);
      console.log(result);
      setMedia(result.pinataURL);
    } catch (error) {
      console.log(error);
    }
  }

  /** Mint NFT function */
  async function createToken() {
    if (
      !image ||
      !price ||
      !media ||
      !name ||
      !description ||
      !quantity ||
      !artist
    )
      return;
    const json = {
      name,
      image,
      media,
      description,
      price,
      artist,
    };
    try {
      const result = await pinJSONToIpfs(json);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /* Mint token then list on platform */
  async function mintListToken(e) {
    e.preventDefault();
    try {
      if (window.ethereum) {
        const url = await createToken();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const otofyContract = new ethers.Contract(
          PlatformContract.address,
          PlatformContract.abi,
          signer
        );

        const tokenPrice = ethers.utils.parseUnits(price, "ether");
        const tokenQuantity = ethers.BigNumber.from(quantity);
        let listPrice = await otofyContract.getTokenPrice();
        listPrice = listPrice.toString();

        let process = await otofyContract.mintToken(
          url,
          tokenPrice,
          tokenQuantity,
          { value: listPrice }
        );

        await process.wait();

        console.log("Token minted!");
      } else {
        console.log("Ethereum object doesn't exist");
      }

      setName("");
      setArtist("");
      setPrice(null);
      setMedia("");
      setImage("");
      setQuantity(null);
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="uploadSection">
        <h1>Upload New Music</h1>
        <form className="uploadForm">
          <div className="name-sec">
            <label htmlFor="name">Music Title</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Music title"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="artist-sec">
            <label htmlFor="artist">Artist Name</label>
            <input
              type="text"
              name="artist"
              id="artist"
              placeholder="Artist name"
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          <div className="media-cover-sec">
            <label htmlFor="mediaCover">Music cover art</label>
            <input
              type="file"
              name="mediaCover"
              id="mediaCover"
              onChange={coverIpfsUpload}
              required
            />
          </div>
          <div className="media-file-sec">
            <label htmlFor="media">Audio or MP3 file</label>
            <input
              type="file"
              name="media"
              id="media"
              onChange={mediaIpfsUpload}
              required
            />
          </div>
          <div className="media-desc-sec">
            <label htmlFor="desc">Description (not required)</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Provide a detailed description of your music/audio"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="media-quantity-sec">
            <label htmlFor="quantity">Supply</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              placeholder="1"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="media-price-sec">
            <label htmlFor="price">Price in Eth</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="0.1"
              step="any"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button className="create-btn" onClick={mintListToken}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
