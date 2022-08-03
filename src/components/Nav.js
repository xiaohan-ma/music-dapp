import React from "react";
import WalletConnect from "./WalletConnect";
import "../styles/Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <h3>Otofy</h3>
      <WalletConnect />
    </nav>
  );
}

export default Nav;
