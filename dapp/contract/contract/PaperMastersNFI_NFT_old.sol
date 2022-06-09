// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract PaperMastersNFI is ERC721, Ownable {
    string private _setBaseURI;
    uint256 private identityFee;
    uint256 private swanFeePaperMasters;
    uint256 private swanFeeReceiver;

    struct identity
    {
        uint256 chainId;
        address walletAccount;
        string name;
        string email;
        string profession;
        string organization;
        string slogan;
        string website;
        string uniqueYou;
        string bgRGB;
        uint256 originDate;
    }

    identity[] _dictionaryNFIs;
    mapping(address => uint256) totalIdentities;
    mapping(address => uint256) _supportPMDonations;

    struct swanNFT {
        address giver;
        address receiver;
        bool tokenType;
        string comment;
        uint256 timeStamp;
    }

    swanNFT[] _swanStructs;
    //    mapping(address => uint256[]) _swanNFTGiver;
    //    mapping(address => uint256[]) _swanNFTReceiver;
    //    mapping(address => address[]) private _swanNFThasGiver;
    mapping(address => mapping(address => uint256[])) private _swanNFTGiver;
    mapping(address => mapping(address => uint256[])) private _swanNFTReceiver;


    //prevents ren-entry when modifier is added to a function
    bool internal locked;
    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
    //    modifier onlyOwner() {
    //        require(msg.sender == owner, "Message sender must be the contract's owner.");
    //        _;
    //    }
    constructor() ERC721("papermasters.io", "NFI") {
        _name = name_;
        _symbol = symbol_;
        _setBaseURI = "www.papermasters.io";
        identityFee = 100000000000000000;
        swanFeePaperMasters = 100000000000000000;
        swanFeeReceiver = 100000000000000000;
        _dictionaryNFIs.push(identity(block.chainid, address(this), '', '', '', '', '', '', '', '', block.timestamp));
        _swanStructs.push(swanNFT(address(this), address(this), true, '', block.timestamp));
    }
    function getChainId(address walletAddress) public view returns (uint256) {
        return getChainId();
    }

    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    function addressToTokenID(address walletAddress) public view returns (uint256) {
        return totalIdentities[walletAddress];
    }

    function tokenIDtoIdentityStruct(uint256 _tokenid) public view returns (identity memory) {
        return _dictionaryNFIs[_tokenid];
    }

    function addressHasTokenBool(address walletAddress) public view returns (bool) {
        uint256 _tokenId = addressToTokenID(walletAddress);
        return _tokenId >= 1;
    }

    function addressToIdentityStruct(address walletAddress) public view returns (identity memory){
        uint256 tokenId = addressToTokenID(walletAddress);
        return _dictionaryNFIs[tokenId];
    }

    function allIdentityStructs() public view returns (identity[] memory){
        return _dictionaryNFIs;
    }

    function allSwanGiver(address giver) public view returns (uint256){
        return _swanNFTGiver;
    }

    function allSwanGReceiver(address receiver) public view returns (uint256){
        return _swanNFTReceiver;
    }

    function alreadyGiven(address giver) public view returns(bool memory){
for(unit i = 0; i<)
if(_swanNFTGiver[msg.sender][i] >= 1){
return true
}
return false
}

//metadata extension tokenURI, name and symbol
function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
address owner = ownerOf(tokenId);
string memory baseURI = _baseURI();
return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, owner)) : "";
}

function name() external view returns (string memory){
return PaperMastersNFI;
}

function symbol() external view returns (string memory){
return NFI;
}

function setBaseURI(string memory changeBaseURI) public onlyOwner {
_setBaseURI = changeBaseURI;
}

function _baseURI() internal view virtual override returns (string memory) {
return _setBaseURI;
}

function getIdentityFee() public view returns (uint256) {
return identityFee;
}

function setIdentityFee(uint256 val) external onlyOwner {
identityFee = val;
}

function getSwanFeePaperMasters() public view returns (uint256) {
return swanFeePaperMasters;
}

function getSwanFeeReceiver() public view returns (uint256) {
return swanFeeReceiver;
}

function setSwanFeePaperMasters(uint256 val) external onlyOwner {
swanFeePaperMasters = val;
}

function setSwanFeeReceiver(uint256 val) external onlyOwner {
swanFeeReceiver = val;
}
// Fallback function must be declared as external.
fallback() external payable {
// send / transfer (forwards 2300 gas to this fallback function)
// call (forwards all of the gas)
emit Log(gasleft());
}

event Log(uint256 gasLeftLeft);

receive() external payable {}

function deposit() public payable {
uint256 amount = msg.value;
_supportPMDonations[msg.sender] += msg.value;
emit DonationMade(amount, address(this).balance, msg.sender, _supportPMDonations[msg.sender]);
}

event DonationMade(uint256 amount, uint256 balance, address donationSender, uint256 totalDonationsBySender);

function getBalance() public view onlyOwner returns (uint) {
return address(this).balance;
}

function withdraw() external noReentrant onlyOwner {
// This forwards all available gas. Be sure to check the return value!
uint256 amount = address(this).balance;
(bool success,) = msg.sender.call{value : amount}("");
require(success, "Transfer failed.");
emit Withdraw(amount, address(this).balance, msg.sender);
}

event Withdraw(uint256 amount, uint256 balance, address withdrawAddress);

function totalSupply() public view returns (uint256) {
return _dictionaryNFIs.length;
}

function totalSwanSupply() public view returns (uint256, uint256) {
uint256 totalValidations == 0;
uint256 totalReports == 0;
while( swanStructs.tokenType == true){
totalValidations += totalValidation;
}
while( swanStructs.tokenType == false){
totalReports += totalReports;
}
return totalValidations;
return totalReports;
}

bool public paused = false;

modifier whenNotPaused() {
require(!paused);
_;
}
modifier whenPaused() {
require(paused);
_;
}
function pause() onlyOwner whenNotPaused public {
paused = true;
emit Pause();
}

event Pause();

function unpause() onlyOwner whenPaused public {
paused = false;
emit Unpause();
}

event Unpause();

function mintNFI(
string memory _name,
string memory _email,
string memory _profession,
string memory _organization,
string memory _slogan,
string memory _website,
string memory _uniqueYou,
string memory _bgRGB
) public virtual noReentrant payable whenNotPaused
{
require(!addressHasTokenBool(msg.sender), " Wallet already has an NFI! You get one per wallet account");
require(msg.value >= identityFee, "Not enough ETH sent; check price!");

identity memory _identity = identity({
chainId : block.chainid,
walletAccount : msg.sender,
name : _name,
email : _email,
profession : _profession,
organization : _organization,
slogan : _slogan,
website : _website,
uniqueYou : _uniqueYou,
bgRGB : _bgRGB,
originDate : block.timestamp
});

_dictionaryNFIs.push(_identity);
uint256 newTokenID = _dictionaryNFIs.length - 1;
totalIdentities[msg.sender] = newTokenID;
_safeMint(msg.sender, newTokenID);

emit NFIMinted(block.chainid, msg.sender, newTokenID, block.timestamp, msg.value, _identity);
}

event NFIMinted(uint256 chainId, address indexed _from, uint256 tokenId, uint256 timeStamp, uint256 contractFee, identity identityStruct);

function swanNFTMint(
address memory receiver,
bool memory tokenType,
string memory comment
) public virtual noReentrant payable whenNotPaused
{
require(msg.sender != receiver, "Giver cannot also be the Receiver");
require(msg.value >= swanFeePaperMasters, "Not enough ETH sent; check price!");
require(msg.value >= swanFeeReceiver, "Not enough ETH sent; check price!");
require(!alreadySwanAddress(receiver), " Giver already gave to this Receiver");

swanNFT memory _swanNFT = swanNFT({
giver : msg.sender,
receiver : receiver,
tokenType : false || true,
comment : comment,
timeStamp : block.timestamp
});

_swanStructs.push(_swanNFT);
uint256 newTokenID = _swanStructs.length - 1;
_swanNFTGiver[msg.sender][receiver].push(newTokenID);
_swanNFTReceiver[receiver][msg.sender].push(newTokenID);
_safeMint(msg.sender, newTokenID);

emit swanNFTMinted(msg.sender, receiver, tokenType, comment, block.timestamp, newTokenID, msg.value, _swanNFT);
}

event swanNFTMinted(address indexed _from, address receiver, bool tokenType, string comment, uint256 timeStamp, uint256 tokenId, uint256 swanFee, swanNFT swanNFT);

function setApprovalForAll(address operator, bool approved) public virtual override onlyOwner {
return "sorry only owner";
}

function isApprovedForAll(address owner, address operator) public view virtual override onlyOwner returns (bool) {
return "sorry only owner";
}

function transferFrom(address from, address to, uint256 tokenId) public virtual override onlyOwner {
return "sorry only owner";
}

function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override onlyOwner {
return "sorry only owner";
}

function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override onlyOwner {
return "sorry only owner";
}

function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal virtual override onlyOwner {
return "sorry only owner";
}
}