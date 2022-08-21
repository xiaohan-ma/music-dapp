import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import PlayBar from "./components/PlayBar";
import ProfilePage from "./pages/ProfilePage";
import UploadPage from "./pages/UploadPage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { loadContract, retrieveAllTokens } from "./utils/contract";

const App = () => {
  /** State variables */
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState(false);
  const [playing, isPlaying] = useState(false);
  const [platformContract, setPlatformContract] = useState({});
  const [tokens, getTokens] = useState([]);
  const [currentSong, setCurrentSong] = useState();
  const [songIndex, setSongIndex] = useState(0);
  const [songProgress, setSongProgress] = useState(0);

  const audioRef = useRef(
    new Audio(
      "https://gateway.pinata.cloud/ipfs/QmSY7S2xz17z6QxVN4aTFpNbQsh9C4jdweAE5Jh7NsrTFe"
    )
  );
  const intervalRef = useRef();
  const isReady = useRef(false);

  async function getContract() {
    const contract = await loadContract();
    setPlatformContract(contract);
  }

  useEffect(() => {
    getContract();
  }, []);

  async function getAllTokens() {
    const allTokens = await retrieveAllTokens();
    getTokens(allTokens);
  }
  useEffect(() => {
    getAllTokens();
  }, []);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

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
          element={
            <Home
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              platformContract={platformContract}
              tokens={tokens}
              getTokens={getTokens}
              playing={playing}
              isPlaying={isPlaying}
            />
          }
        />

        {walletAddress !== "" ? (
          <Route
            path="/account"
            element={
              <ProfilePage
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                walletAddress={walletAddress}
                playing={playing}
                isPlaying={isPlaying}
              />
            }
          />
        ) : (
          <Route
            path="/"
            exact
            element={
              <Home
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                platformContract={platformContract}
                tokens={tokens}
                getTokens={getTokens}
                playing={playing}
                isPlaying={isPlaying}
              />
            }
          />
        )}
        <Route
          path="/upload"
          element={
            <UploadPage
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              playing={playing}
              isPlaying={isPlaying}
            />
          }
        />
        <Route path="*" element={() => "404 Page Not Found"} />
      </Routes>
      <PlayBar
        tokens={tokens}
        playing={playing}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
};

export default App;
