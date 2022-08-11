import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import Protected from "./utils/protected";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  /* State variables */
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  return (
    <div className="App">
      <Nav
        setStatus={setStatus}
        setWallet={setWallet}
        walletAddress={walletAddress}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/account"
          element={
            <Protected
              redirectTo="/"
              walletAddress={walletAddress}
              status={status}
            >
              <ProfilePage walletAddress={walletAddress} />
            </Protected>
          }
        />
        <Route path="*" element={() => "404 Page Not Found"} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
