import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import UploadPage from "./pages/UploadPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

function App() {
  /** State variables */
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState(false);
  const [playing, isPlaying] = useState(false);
  const [marketContract, setMarketContract] = useState({});

  return (
    <div className="App">
      <Nav
        setStatus={setStatus}
        setWallet={setWallet}
        walletAddress={walletAddress}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />

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
}

export default App;
