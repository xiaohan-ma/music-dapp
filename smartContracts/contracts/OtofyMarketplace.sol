//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OtofyMarketplace is ERC721URIStorage, Ownable{
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;
   address payable contractOwner;
   uint256 royaltyFee = 0.01 ether;

   struct MarketToken {
    address payable contractOwner;
    address payable seller;
    uint256 price;
    uint256 tokenId;
    bool isListed;
   }

   event TokenIsListed (
    uint256 indexed tokenId,
    address indexed contractOwner,
    address indexed seller,
    uint256 price,
    bool isListed
   );

   event TokenIsBought (
    uint256 indexed tokenId,
    address buyer,
    address indexed seller,
    uint256 price,
    bool isListed
   );

   mapping(uint256 => MarketToken) private items;

   constructor() ERC721("OtofyMarketplace", "OTOFY"){
        contractOwner = payable(msg.sender);
   }

   /* Retrieve all tokens listed on the platform */
   function getAllTokens() public view returns(MarketToken[] memory){
    uint total = _tokenIds.current();
    MarketToken[] memory tokens = new MarketToken[](total);
    
    for(uint i; i<total; i++){
        MarketToken storage currentToken = items[i];
        tokens[i] = currentToken;
    }

    return tokens;
   }

   /* Retrieve user tokens */
   function getUserTokens() public view returns(MarketToken[] memory){
    uint generalTotal = _tokenIds.current();
    uint userTotal;
    
    for(uint i; i<generalTotal; i++){
        if(items[i].contractOwner == msg.sender || items[i].seller == msg.sender){
            userTotal += 1;
        }
    }

    MarketToken[] memory tokens = new MarketToken[](userTotal);

    if(userTotal == 0) return tokens;

    for(uint i; i<generalTotal; i++){
        if(items[i].contractOwner == msg.sender || items[i].seller == msg.sender){
            MarketToken storage currentToken = items[i];
            tokens[i] = currentToken;
        }
    }

    return tokens;
   }
   
   /* Buy token function - transfer ownership of NFT between seller to buyer */
   function buyToken(uint256 _tokenId) public payable {
        uint price = items[_tokenId].price;
        address seller = items[_tokenId].seller;
        require(msg.value == price, "Not enough eth for this purchase");

        /* Update token details - change owner */
        items[_tokenId].isListed = false;
        items[_tokenId].seller = payable(msg.sender);
        
        /* Transfer token to new owner */
        _transfer(address(this), msg.sender, _tokenId);

        /* Approve the new owner address to transfer the token */
        approve(address(this), _tokenId);
    
        /* Send revenue accordingly */
        payable(seller).transfer(msg.value);
        payable(contractOwner).transfer(royaltyFee);
        
   }

   /* Retrieve token through its token id */
   function getListedToken(uint256 _tokenId) public view returns (MarketToken memory){
        return items[_tokenId];
   }

   /* Retrieve current token*/
   function getCurrentToken() public view returns(MarketToken memory){
        uint256 currTokenId = _tokenIds.current();
        return items[currTokenId];
   }

    /* Retrieve royalty fee of marketplace*/
   function getTokenPrice() public view returns(uint256) {
        return royaltyFee;
   }

   /* Update royalty fee of marketplace*/
    function updateRoyalty(uint256 _royaltyFee) public onlyOwner {
        royaltyFee = _royaltyFee;
    }

    /* Mint new token */
    function mintToken(string memory _tokenURI, uint256 _price, uint256 _quantity) public payable{

        require(_price >= 0, "Make sure price is at least 0 ether");
        require(msg.value >= royaltyFee * _quantity, "Not enough eth to pay platform fees");
        require(_quantity > 0, "Quantity has to be more than zero ");

        for(uint256 i; i<_quantity;i++){
            uint256 newItemId = _tokenIds.current();
            _safeMint(msg.sender, newItemId);
            _setTokenURI(newItemId, _tokenURI);

            //List token
            listToken(newItemId, _price);
            _tokenIds.increment();
        }
    }

    /* List minted token on platform */
    function listToken(uint256 _tokenId, uint256 _price) private {
        items[_tokenId] = MarketToken(payable(address(this)), payable(msg.sender), _price, _tokenId, true);

        _transfer(msg.sender, address(this), _tokenId);

        emit TokenIsListed(_tokenId, address(this), msg.sender, _price, true);
    }

    /* Withdraw funds */
    function withdrawAll() public payable onlyOwner {
        require(payable(contractOwner).send(address(this).balance));
    }


}