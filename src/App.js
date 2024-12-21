import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaWallet } from 'react-icons/fa';

import Cars from './pages/Cars';
import Properties from './pages/Properties';
import Rental from './pages/Rental';
import Collectibles from './pages/Collectibles';
import Learn from './pages/Learn';
import { Link } from 'react-router-dom';
// Sidebar component
function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "280px", height: "100vh" }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-wallet" viewBox="0 0 16 16">
       <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1"/>
      </svg>
        <span className="fs-4">.           Assets</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/Cars" className="nav-link active">
            Cars
            </Link>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Properties
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            Rental
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#grid"></use>
            </svg>
            Colletibles
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#people-circle"></use>
            </svg>
            Learn
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
}

function App() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Wallet connected:", address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  const disconnectWallet = () => {
    setAccount(""); // Clear the connected wallet
    console.log("Wallet disconnected");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5" style={{ marginLeft: "300px", height: "100vh" }}>
        <h1>Welcome to BlockAsset!</h1>
        {account ? (
          <div className="wallet-info mt-3">
            <p>Connected Account: {account}</p>
            <button onClick={disconnectWallet} className="btn btn-danger">Disconnect Wallet</button>
          </div>
        ) : (
          <div className="mt-3">
            <button onClick={connectWallet} className="btn btn-primary">
              <FaWallet /> Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;