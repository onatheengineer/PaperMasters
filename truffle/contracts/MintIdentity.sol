// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintIdentity is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Identity {
        bytes32 identity;
        string firstname;
        string lastname;
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

    constructor() ERC721("MintIdentity", "MINTIDENTITY") {
        setBaseURI("https://papermasters.io/mintidentity/");

        //mint Ramona Andrew and kids
    }

    function setBaseURI(string memory baseURI) public onlyOwner() {
        _currentBaseURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _currentBaseURI;
    }

    function createIdentity(
        string memory first,
        string memory last,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory description,
        string memory url,
        string memory bio) private view returns(bytes32) {
        return keccak256(abi.encodePacked(first, last, aka, org, slogan, description, url, bio, block.timestamp));
    }

    function mintIdentity (
        string storage first,
        string memory last,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory description,
        string memory url,
        string memory bio) internal {
            uint256 tokenId =  _tokenIds.current();
            bytes32 identity = createIdentity(first, last, aka, org, slogan, description, url, bio);
            id_to_identity[tokenId] = Identity(identity,first, last, aka, org, slogan, description,
                url, bio, block.timestamp, block.timestamp, false, 0, 0);
            _tokenIds.increment();

    }
}
