// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaperMastersNFI is ERC721, Ownable {

    string private _setBaseURI;
    uint256 private identityFee;

    struct identity
    {
        string name;
        string email;
        string profession;
        string organization;
        string slogan;
        string website;
        string uniqueYou;
        string backGroundRGB;
        uint originDate;
        string linkToFinishedAvatar;
    }

    //an array of type identity of the total identities minted
    identity[] totalIdentities;

    //just making a generic mapping of address to number
    mapping(address => uint256) public _dictionaryNFIs;

    //prevents ren-entry when modifier is added to a function
    bool internal locked;
    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

    constructor() ERC721("PaperMastersNFI", "NFI") {
        _setBaseURI = "www.papermasters.io/identity";
        identityFee = 5e16;
        totalIdentities.push(identity('','','','','','','','',0,'')); // This is needed to fill the 0 token. The 0 Token is an invalid token
    }

    function addressToTokenID(address walletAddress) public view returns(uint256) {
        return _dictionaryNFIs[walletAddress];
    }

    function tokenIDtoIdentity(uint256 _tokenid) public view returns(identity memory) {
        return totalIdentities[_tokenid];
    }


    function addressHasToken(address walletAddress) public view returns(bool) {
        uint256 _tokenId = addressToTokenID(walletAddress);
        return _tokenId >= 1;
    }

    function setBaseURI(string memory changeBaseURI) public onlyOwner{
        _setBaseURI = changeBaseURI;
    }


    function _baseURI() internal view virtual override returns (string memory) {
        return _setBaseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        address owner = ownerOf(tokenId);

        string memory baseURI = _baseURI();

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, owner)) : "";
    }

    function getIdentityFee() public view returns (uint256) {
        return identityFee;
    }

    function setIdentityFee(uint256 val) external onlyOwner {
        identityFee = val;
    }

    event Log(uint gas);

    // Fallback function must be declared as external.
    fallback() external payable {
        // send / transfer (forwards 2300 gas to this fallback function)
        // call (forwards all of the gas)
        emit Log(gasleft());
    }

    receive() external payable {}

    function deposit() public payable {}

    function getBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function withdraw() external noReentrant onlyOwner{
        // This forwards all available gas. Be sure to check the return value!
        uint amount = address(this).balance;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");
        emit Withdraw(amount, address(this).balance, msg.sender);
    }
    event Withdraw(uint256 amount, uint256 balance, address withdrawAddress);


    function totalSupply() public view returns (uint256) {
        return totalIdentities.length;
    }


    //contract Pausable is Ownable {
    event Pause();
    event Unpause();

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


    function unpause() onlyOwner whenPaused public {
        paused = false;
        emit Unpause();
    }

    function mintNFI (
        string memory _name,
        string memory _email,
        string memory _profession,
        string memory _organization,
        string memory _slogan,
        string memory _website,
        string memory _uniqueYou,
        string memory _backGroundRGB,
        uint _originDate,
        string memory _linkToFinishedAvatar
    ) public virtual noReentrant payable whenNotPaused

    {
        require(!addressHasToken(msg.sender)," Wallet already has an NFI! You get one per wallet account");
        require(msg.value >= identityFee, "Not enough ETH sent; check price!");

        identity memory _identity = identity({
        name: _name,
        email: _email,
        profession: _profession,
        organization: _organization,
        slogan: _slogan,
        website: _website,
        uniqueYou: _uniqueYou,
        backGroundRGB: _backGroundRGB,
        originDate: _originDate,
        linkToFinishedAvatar: _linkToFinishedAvatar
        });

        totalIdentities.push(_identity);

        uint256 newTokenID = totalIdentities.length - 1;

        _dictionaryNFIs[msg.sender] = newTokenID;

        _safeMint(msg.sender, newTokenID);

        emit NFIMinted(msg.sender, newTokenID);

    }

    event NFIMinted(address indexed _from, uint256 tokenId);

    function setApprovalForAll(address operator, bool approved) public virtual override onlyOwner{}
    function isApprovedForAll(address owner, address operator) public view virtual override onlyOwner returns (bool) {}
    function transferFrom(address from, address to, uint256 tokenId) public virtual override onlyOwner{}
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override  onlyOwner {}
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override onlyOwner {}
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal virtual override onlyOwner {}

}