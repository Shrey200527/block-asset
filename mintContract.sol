// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MintContract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    address public owner;  // State variable to track the contract owner

    // Modifier to restrict access to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner!");
        _;
    }

    // Constructor to set the initial owner (the deployer)
    constructor() ERC721("MyNFT", "NFT") {
        owner = msg.sender;  // Set the contract deployer as the owner
    }

    // Function to mint a new NFT (restricted to the owner)
    function mintNFT(string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenId.increment();  // Increment the token ID
        uint256 newId = _tokenId.current();  // Get the current token ID
        _mint(msg.sender, newId);  // Mint the token to the owner
        _setTokenURI(newId, tokenURI);  // Set the URI for the newly minted token
        return newId;  // Return the new token ID
    }

    // Function to transfer ownership (optional, if you want the ability to transfer ownership)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;  // Transfer ownership to the new owner
    }
}