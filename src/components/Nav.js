import React from "react";
import Login from "./Login";
import "../styles/Nav.css";

function Nav(props) {
  return (
    <nav className="nav">
      <h3>Otofy</h3>
      <Login
        setStatus={props.setStatus}
        setWallet={props.setWallet}
        walletAddress={props.walletAddress}
      />
    </nav>
  );
}

export default Nav;
