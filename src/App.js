import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  /* State variables */
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
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
        <Route path="*" element={() => "404 Page Not Found"} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
