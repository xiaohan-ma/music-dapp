import "../styles/Button.css";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
import { useEffect } from "react";

function Login(props) {
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    props.setStatus(walletResponse.status);
    props.setWallet(walletResponse.address);
  };

  const disconnectWalletPressed = () => {
    props.setStatus("");
    props.setWallet("");
  };

  /* Render connect wallet button */
  const renderConnect = () => {
    return (
      <button className="connect-btn" onClick={connectWalletPressed}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
        </svg>
        <span>Connect Wallet</span>
      </button>
    );
  };

  /* Render disconnect wallet button */
  const renderDisconnect = () => {
    return (
      <button className="connect-btn" onClick={disconnectWalletPressed}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
        </svg>
        <span>Logout</span>
      </button>
    );
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          props.setWallet(accounts[0]);
          props.setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          props.setWallet("");
          props.setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      props.setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      const { address, status } = await getCurrentWalletConnected();
      props.setWallet(address);
      props.setStatus(status);
    }
    fetchData();
    addWalletListener();
  }, []);

  return (
    <div className="btnContainer">
      {props.walletAddress.length > 0 ? renderDisconnect() : renderConnect()}
    </div>
  );
}

export default Login;
