// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
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
        string bio;
        uint create;
        uint lastupdated;
        bool valid;
        uint validdate;
        uint validationscore;
    }

    mapping(uint256=> Identity) id_to_identity;

    string private _currentBaseURI;

    constructor() ERC721("MintIdentity", "IDENT") {
        setBaseURI("https://papermasters.io/mintidentity/");
        //mint Ramona Andrew and kids
        mintIdentity("Ramona","Aka Awesome","Awesome", "All Things Wave", "CEO", "pm", "Engineer");
        mintIdentity("Andrew","Aka Super","Super", "All Things Wave", "CTO", "pm", "Software");
        mintIdentity("Nautica","Aka Nothing","little", "Girl Power", "", "", "Engineer");
        mintIdentity("Ammon","Arm Chopper","boy", "Pokemon", "", "", "Trainer");
    }


    function setBaseURI(string memory baseURI) public onlyOwner() {
        _currentBaseURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _currentBaseURI;
    }

    function createUniqueId(
        string memory name,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory description,
        string memory url,
        string memory bio) private view returns(bytes32) {
        return keccak256(abi.encodePacked(name, aka, org, slogan, description, url, bio, block.timestamp));
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
        string memory url,
        string memory bio) internal {
            bytes32 uniqueId = createUniqueId(name, aka, org, slogan, description, url, bio);
            id_to_identity[_tokenIds.current()] = Identity(uniqueId,name, aka, org, slogan, description,
                url, bio, block.timestamp, block.timestamp, false, 0, 0);
            _safeMint(msg.sender,_tokenIds.current());
            _tokenIds.increment();

    }




    function changeFirstName(uint256 tokenId, string memory newName)  public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this date can change its title");
        id_to_identity[tokenId].name = newName;
        changeLastUpdated(tokenId);
    }

    function changeLastUpdated(uint256 tokenId) private {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this date can change its title");
        id_to_identity[tokenId].lastupdated = block.timestamp;
    }
}
