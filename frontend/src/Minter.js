import { useEffect, useState } from "react";
import axios from 'axios'
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";
import { Button } from "./components/Button.js";
import ImageFlasher from "./components/ImageFlasher.js";


const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  useEffect(() => {
    async function initialiseWallet() {
      const { address, status } = await getCurrentWalletConnected();

      setWallet(address);
      setStatus(status);

      addWalletListener();
    }
    initialiseWallet()
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          // setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    setStatus('getting random nft')
    const BACKEND_URL = process.env.NODE_ENV === 'production' ? 'https://lazyminter.herokuapp.com' : 'http://localhost:8000'
    const response = await axios.get(`${BACKEND_URL}/getRandomNFT`)
    console.log(response)
    const { secure_url } = response.data

    setStatus('minting NFT...')

    const { success, status } = await mintNFT(secure_url);
    setStatus(status);
    if (success) {
      setURL(secure_url)
    }
  };

  return (
    <div className="Minter">
      <Button
        onClick={connectWalletPressed}
        btnType={'outline'}
        text={
          walletAddress.length > 0 ?
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
            :
            "Connect Wallet"
        } />

      <br></br>
      {url && <img alt="minted nft" src={url} />}
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <ImageFlasher images={['https://res.cloudinary.com/daqgugk5f/image/upload/v1641987238/ynwl59gj6gtgdateob2t.png', 'https://res.cloudinary.com/daqgugk5f/image/upload/v1641984304/bvdpqso5rhhtnogez2r4.png', 'https://res.cloudinary.com/daqgugk5f/image/upload/v1641735603/wjvvtebcm9uh1ah1pltx.png']} />
      <Button
        onClick={onMintPressed}
        text="Mint NFT">
      </Button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Minter;
