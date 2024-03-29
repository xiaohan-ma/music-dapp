import React from "react";
import Login from "./Login";
import Account from "./Account";
import Upload from "./Upload";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

function Nav(props) {
  return (
    <nav className="nav">
      <Link to="/" className="link">
        <h3>Otofy</h3>
      </Link>
      <div className="nav-btn">
        {props.walletAddress.length > 0 && (
          <>
            <Upload /> <Account />
          </>
        )}
        <Login
          setStatus={props.setStatus}
          setWallet={props.setWallet}
          walletAddress={props.walletAddress}
        />
      </div>
    </nav>
  );
}

export default Nav;
