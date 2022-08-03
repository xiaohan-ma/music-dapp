import "./App.css";
import React, { useEffect } from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
