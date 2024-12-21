import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaWallet } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "280px", height: "100vh" }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            Customers
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <img
            src="https://github.com/mdo.png"
            alt="profile"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
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
      <div className="container mt-5" style={{ marginLeft: "300px" }}>
        <h1>Welcome to BlockAsset!</h1>
        {account ? (
          <div className="wallet-info">
            <p>Connected Account: {account}</p>
            <button onClick={disconnectWallet} className="btn btn-danger">Disconnect Wallet</button>
          </div>
        ) : (
          <div>
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
