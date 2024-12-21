import { ethers } from "ethers";

async function connectWallet() {
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      return accounts[0]; // Return the connected wallet address
    } catch (error) {
      console.error("User rejected request", error);
      return null;
    }
  } else {
    alert("MetaMask is not installed. Please install it to use this feature.");
    return null;
  }
}

export default connectWallet;
