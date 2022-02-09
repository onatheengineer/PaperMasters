// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



//web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
//.once('sending', function(payload){ ... })
//.once('sent', function(payload){ ... })
//.once('transactionHash', function(hash){ ... })
//.once('receipt', function(receipt){ ... })
//.on('confirmation', function(confNumber, receipt, latestBlockHash){ ... })
//.on('error', function(error){ ... })
//.then(function(receipt){
//// will be fired once the receipt is mined
//});


contract NFI is ERC721Enumerable, Ownable {
using Counters for Counters.Counter;
Counters.Counter private _tokenIds;

struct Identity {
bytes32 uniqueid;
string name;
string email;
string profession;
string organization;
string slogan;
string uniqueYou;
string website;
uint originDate;
}

string baseURL = 'papermasters.io';


constructor() ERC721("MintIdentity", "IDENT") {

}



}



