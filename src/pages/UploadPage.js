import "../styles/UploadPage.css";
import { useState } from "react";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";

/**
 * Infura IPFS API access
 */
const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const UploadPage = () => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [media, setMedia] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(null);

  /** IPFS upload for cover image */
  async function coverIpfsUpload(event) {
    event.preventDefault();
    const file = event.target.files[0];

    try {
      const result = await client.add(file);
      console.log(result);
      setImage(`https://otofy.infura-ipfs.io/ipfs/${result.path}`);
    } catch (error) {
      console.log(error);
    }
  }

  /** IPFS upload for audio/mp3 file */
  async function mediaIpfsUpload(event) {
    event.preventDefault();
    const file = event.target.files[0];

    try {
      const result = await client.add(file);
      console.log(result);
      setMedia(`https://otofy.infura-ipfs.io/ipfs/${result.path}`);
    } catch (error) {
      console.log(error);
    }
  }

  /** Mint NFT function */
  async function mintNFT() {
    if (!image || !price || !media || !name || !description || !quantity)
      return;
    try {
      const result = await client.add(
        JSON.stringify({ name, image, media, description, quantity, price })
      );
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
              placeholder="What are you most interested in about this role?"
              onChange={(e) => setName(e.target.value)}
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
          <button className="create-btn" onClick={mintNFT}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
