import axios from "axios";
import FormData from "form-data";
const PINATA_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET = process.env.REACT_APP_PINATA_SECRET;

export async function pinFileToIpfs(file) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();
  data.append("file", file);

  const metadata = JSON.stringify({
    name: "otofyplatform",
    keyvalues: {
      company: "Pinata",
    },
  });
  data.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  data.append("pinataOptions", options);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: PINATA_KEY,
        pinata_secret_api_key: PINATA_SECRET,
      },
    })
    .then(function (response) {
      console.log("file uploaded", response.data.IpfsHash);
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
}

export async function pinJSONToIpfs(json) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  return axios
    .post(url, json, {
      headers: {
        pinata_api_key: PINATA_KEY,
        pinata_secret_api_key: PINATA_SECRET,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
}
