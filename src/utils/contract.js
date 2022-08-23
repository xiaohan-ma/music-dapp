import PlatformContract from "../json/OtofyMarketplace.json";
import { ethers } from "ethers";
import axios from "axios";

export const loadContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const otofyContract = new ethers.Contract(
    PlatformContract.address,
    PlatformContract.abi,
    signer
  );
  return otofyContract;
};

export const retrieveAllTokens = async () => {
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
      return token;
    })
  );
  return allTokens;
};

export const retrieveOwnTokens = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const otofyContract = new ethers.Contract(
    PlatformContract.address,
    PlatformContract.abi,
    signer
  );

  let process = await otofyContract.getUserTokens();

  const userTokens = await Promise.all(
    process.map(async (t) => {
      const uri = await otofyContract.tokenURI(t.tokenId);
      let metadata = await axios.get(uri);
      metadata = metadata.data;

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
      return token;
    })
  );
  console.log(userTokens);
  return userTokens;
};
