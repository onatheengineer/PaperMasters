// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract PaperMastersNFI is ERC721, Ownable {
//do I need to bring in SafeMath???
    string private _setBaseURI;
    uint256 private identityFee;
    struct identity
    {
        address walletAccount;
        string name;
        string email;
        string profession;
        string organization;
        string slogan;
        string website;
        string uniqueYou;
        string bgRGB;
        uint originDate;
    }
    identity[] _dictionaryNFIs;

    mapping(address => uint256) totalIdentities;
    mapping(address => uint256) _supportPMDonations;

    //prevents ren-entry when modifier is added to a function
    bool internal locked;
    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
    constructor() ERC721("papermasters.io", "NFI") {
        _setBaseURI = "www.papermasters.io/identity";
        identityFee = 100000000000000000;
        _dictionaryNFIs.push(identity(address(this),'','','','','','','','',0));
    }

    function addressToTokenID(address walletAddress) public view returns(uint256) {
        return totalIdentities[walletAddress];
    }

    function tokenIDtoIdentityStruct(uint256 _tokenid) public view returns(identity memory) {
        return _dictionaryNFIs[_tokenid];
    }

    function addressHasTokenBool(address walletAddress) public view returns(bool) {
        uint256 _tokenId = addressToTokenID(walletAddress);
        return _tokenId >= 1;
    }

    function addressToIdentityStruct(address walletAddress) public view returns(identity memory){
        uint256 tokenId = addressToTokenID(walletAddress);
        return _dictionaryNFIs[tokenId];
    }

    function allIdentityStructs() public view returns(identity[] memory){
        return _dictionaryNFIs;
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

        //string memory tokenURI = baseURI/identity[tokenId];
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

    function deposit() public payable {
        uint amount = msg.value;
        _supportPMDonations[msg.sender] += msg.value;
        emit DonationMade(amount, address(this).balance, msg.sender, _supportPMDonations[msg.sender]);
    }
        event DonationMade(uint256 amount, uint balance, address donationSender, uint totalDonationsBySender);

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
        return _dictionaryNFIs.length;
    }

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
        string memory _bgRGB,
        uint _originDate
    ) public virtual noReentrant payable whenNotPaused
    {
        require(!addressHasTokenBool(msg.sender)," Wallet already has an NFI! You get one per wallet account");
        require(msg.value >= identityFee, "Not enough ETH sent; check price!");

        identity memory _identity = identity({
        walletAccount: msg.sender,
        name: _name,
        email: _email,
        profession: _profession,
        organization: _organization,
        slogan: _slogan,
        website: _website,
        uniqueYou: _uniqueYou,
        bgRGB: _bgRGB,
        originDate: _originDate
        });

        _dictionaryNFIs.push(_identity);

        uint256 newTokenID = _dictionaryNFIs.length - 1;

        totalIdentities[msg.sender] = newTokenID;

        _safeMint(msg.sender, newTokenID);

        emit NFIMinted(newTokenID, block.timestamp, msg.value, _identity);
    }
    event NFIMinted(address indexed _from, uint256 tokenId, uint256 timeStamp, uint256 contractFee, identity identityStruct);

    function setApprovalForAll(address operator, bool approved) public virtual override onlyOwner{}
    function isApprovedForAll(address owner, address operator) public view virtual override onlyOwner returns (bool) {}
    function transferFrom(address from, address to, uint256 tokenId) public virtual override onlyOwner{}
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override  onlyOwner {}
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override onlyOwner {}
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal virtual override onlyOwner {}
}