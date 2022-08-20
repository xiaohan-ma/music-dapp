import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import UploadPage from "./pages/UploadPage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import PlatformContract from "./json/OtofyMarketplace.json";

const App = () => {
  /** State variables */
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState(false);
  const [playing, isPlaying] = useState(false);
  const [platformContract, setPlatformContract] = useState({});

  useEffect(() => {
    !platformContract && loadContract();
    console.log(platformContract);
  });

  async function loadContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const otofyContract = new ethers.Contract(
      PlatformContract.address,
      PlatformContract.abi,
      signer
    );
    setPlatformContract(otofyContract);
  }

  return (
    <div className="App">
      <Nav
        setStatus={setStatus}
        setWallet={setWallet}
        walletAddress={walletAddress}
      />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home platformContract={platformContract} />}
        />

        {walletAddress !== "" ? (
          <Route
            path="/account"
            element={<ProfilePage walletAddress={walletAddress} />}
          />
        ) : (
          <Route path="/" exact element={<Home />} />
        )}
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={() => "404 Page Not Found"} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
