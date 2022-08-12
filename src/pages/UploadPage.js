import "../styles/UploadPage.css";

const UploadPage = () => {
  return (
    <div className="container">
      <div className="uploadSection">
        <h1>Upload New Music</h1>
        <form className="uploadForm">
          <div className="name-sec">
            <label for="name">Music Title</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Music name"
              required
            />
          </div>
          <div className="media-cover-sec">
            <label for="mediaCover">Music cover art</label>
            <input type="file" name="mediaCover" id="mediaCover" required />
          </div>
          <div className="media-file-sec">
            <label for="media">Audio or MP3 file</label>
            <input type="file" name="media" id="media" required />
          </div>
          <div className="media-desc-sec">
            <label for="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Provide a detailed description of your music/audio"
            ></textarea>
          </div>
          <div className="media-quantity-sec">
            <label for="quantity">Supply</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              placeholder="1"
              required
            />
          </div>
          <div className="media-price-sec">
            <label for="price">Price in Eth</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="0.1"
              step="any"
              required
            />
          </div>
          <button className="create-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
