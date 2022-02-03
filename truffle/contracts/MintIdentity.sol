// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintIdentity is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Identity {
        bytes32 uniqueid;
        string name;
        string aka;
        string organization;
        string slogan;
        string uniqueYou;
        string Website;
        uint created;
        uint lastupdated;
        bool valid;
        uint validdate;
        uint validationscore;
    }

    mapping(address=> uint256 ) public nfi;

    string private _currentBaseURI;
    uint private identityFee; // In Finney
    constructor() ERC721("MintIdentity", "IDENT") {
        setBaseURI("https://papermasters.io/mintidentity/");
        setIdentityFee(500);
        mintIdentity("Andrew N.",
            "H-street",
            "PaperMasters",
            "Oh Yeah!",
            "",
            "http://ramonajenny.com");

        mintIdentity("Ramona",
            "ramonajenny",
            "PaperMasters",
            "All things Wave",
            "",
            "http://ramonajenny.com");
    }

    function setBaseURI(string memory baseURI) public onlyOwner() {
        _currentBaseURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _currentBaseURI;
    }

    function setIdentityFee(uint fee) public {
        identityFee = fee;
    }

    function getIdentityFee() public view returns (uint) {
        return identityFee;
    }

    function createUniqueId(
        string memory name,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory uniqueYou,
        string memory Website) private view returns(bytes32) {
        return keccak256(abi.encodePacked(name, aka, org, slogan, uniqueYou, Website, block.timestamp));
    }

    function getTokenIdentity(uint256 tokenId) public view returns(Identity memory ident) {
        ident = id_to_identity[tokenId];
    }

    function mintIdentity (
        string memory name,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory uniqueYou,
        string memory Website) internal {
            bytes32 uniqueId = createUniqueId(name, aka, org, slogan, uniqueYou, Website);
            id_to_identity[_tokenIds.current()] = Identity(uniqueId,name, aka, org, slogan, uniqueYou,
                Website, block.timestamp, block.timestamp, false, 0, 0);
            _safeMint(msg.sender,_tokenIds.current());
            _tokenIds.increment();
    }


    function claimIdentity(
        string memory name,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory uniqueYou,
        string memory Website) external payable {
        uint fee = identityFee * 0.001 ether;
        require(msg.value ==  fee, "claiming an identity costs finney");
        mintIdentity(name, aka, org, slogan, uniqueYou, Website);
        payable(owner()).transfer(fee);
    }

    function changeName(uint256 tokenId, string memory newName)  public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this unique ID can change its title");
        id_to_identity[tokenId].name = newName;

    }

    function changeAKA(uint256 tokenId, string memory newAKA)  public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this unique ID can change its title");
        id_to_identity[tokenId].aka = newAKA;

    }

    function changeSlogan(uint256 tokenId, string memory newSlogan)  public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this unique ID can change its title");
        id_to_identity[tokenId].slogan = newSlogan;

    }

    function changeuniqueYou(uint256 tokenId, string memory newuniqueYou)  public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this unique ID can change its title");
        id_to_identity[tokenId].uniqueYou = newuniqueYou;

    }

    function changeWebsite(uint256 tokenId, string memory newWebsite)  public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this unique ID can change its title");
        id_to_identity[tokenId].Website = newWebsite;

        }

    //validate, have a transaction ID be a hexidecimal hash, have a data entry part of the transaciton

//changeLastUpdated(tokenId);
    //we need transfer ownership for companies
    //id_to_identity[tokenId].lastupdated = block.timestamp;

}