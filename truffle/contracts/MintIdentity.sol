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
        string description;
        string url;
        uint created;
        uint lastupdated;
        bool valid;
        uint validdate;
        uint validationscore;
    }

    mapping(uint256=> Identity) id_to_identity;

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
        string memory description,
        string memory url) private view returns(bytes32) {
        return keccak256(abi.encodePacked(name, aka, org, slogan, description, url, block.timestamp));
    }

    function getTokenIdentity(uint256 tokenId) public view returns(Identity memory ident) {
        ident = id_to_identity[tokenId];
    }

    function mintIdentity (
        string memory name,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory description,
        string memory url) internal {
            bytes32 uniqueId = createUniqueId(name, aka, org, slogan, description, url);
            id_to_identity[_tokenIds.current()] = Identity(uniqueId,name, aka, org, slogan, description,
                url, block.timestamp, block.timestamp, false, 0, 0);
            _safeMint(msg.sender,_tokenIds.current());
            _tokenIds.increment();
    }


    function claimIdentity(
        string memory name,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory description,
        string memory url) external payable {
        uint fee = identityFee * 0.001 ether;
        require(msg.value ==  fee, "claiming an identity costs finney");
        mintIdentity(name, aka, org, slogan, description, url);
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

    function changeDescription(uint256 tokenId, string memory newDescription)  public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this unique ID can change its title");
        id_to_identity[tokenId].description = newDescription;

    }

    function changeURL(uint256 tokenId, string memory newURL)  public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this unique ID can change its title");
        id_to_identity[tokenId].url = newURL;

        }

    //validate, have a transaction ID be a hexidecimal hash, have a data entry part of the transaciton

//changeLastUpdated(tokenId);
    //we need transfer ownership for companies
    //id_to_identity[tokenId].lastupdated = block.timestamp;

}