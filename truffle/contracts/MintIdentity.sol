// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MintIdentity {

    struct  Identity  {
        string dna;
        string firstname;
        string lastname;
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

    constructor() {

    }
    /*function mint(uint16 year, uint8 month, uint8 day, uint8 color, string memory title) internal {
        uint256 tokenId = id(year, month, day);

        id_to_date[tokenId] = Metadata(year, month, day, color, title);
        _safeMint(msg.sender, tokenId);
    }
    */
    function minIdentity(
        string memory first,
        string memory last,
        string memory org,
        string memory slogan,
        string memory descr,
        string memory url,
        string memory bio) internal {

        // Create the Token and get the Id
        dna = abi.encode();
        uint256 tokenId = Identity(first, last, org, slogan, descr, url, bio, block.timestamp, block.timestamp, false, 0,0 );
    }

}
