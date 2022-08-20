//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MusicNFT is Ownable, ERC721URIStorage {

   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;
   uint256 public totalSupply;
   uint256 private _price;
   string _tokenURI;

   constructor() ERC721("MusicNFT", "AUDIO"){}

   function mint(uint256 num) public payable{
        require(msg.value >= _price * num, "Incorrect ether amount sent");

        for(uint256 i; i<num; i++){
            uint256 newItemId = _tokenIds.current();
            _safeMint(msg.sender, newItemId);
            _setTokenURI(newItemId, _tokenURI);
            _tokenIds.increment();
        }

   }
}
