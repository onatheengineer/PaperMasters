// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "./governance/Governor.sol";
import "./governance/compatibility/GovernorCompatibilityBravo.sol";
import "./governance/extensions/GovernorVotes.sol";
import "./governance/extensions/GovernorVotesQuorumFraction.sol";
import "./governance/extensions/GovernorTimelockControl.sol";
import "hardhat/console.sol";

contract PaperMastersNFI is ERC721, Ownable {
    //do I need to bring in SafeMath???
    string private _setBaseURI;
    uint256 private identityFee;
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
        _dictionaryNFIs.push(identity(block.chainid, address(this),'','','','','','','','',block.timestamp));
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

    function getChainID() external view returns (uint256) {
        return block.chainid;
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
        string memory _bgRGB
    ) public virtual noReentrant payable whenNotPaused
    {
        require(!addressHasTokenBool(msg.sender)," Wallet already has an NFI! You get one per wallet account");
        require(msg.value >= identityFee, "Not enough ETH sent; check price!");

        identity memory _identity = identity({
        chainId: block.chainid,
        walletAccount: msg.sender,
        name: _name,
        email: _email,
        profession: _profession,
        organization: _organization,
        slogan: _slogan,
        website: _website,
        uniqueYou: _uniqueYou,
        bgRGB: _bgRGB,
        originDate: block.timestamp
        });

        _dictionaryNFIs.push(_identity);

        uint256 newTokenID = _dictionaryNFIs.length - 1;

        totalIdentities[msg.sender] = newTokenID;

        _safeMint(msg.sender, newTokenID);

        emit NFIMinted(block.chainid, msg.sender, newTokenID, block.timestamp, msg.value, _identity);
    }
    event NFIMinted( uint256 chainId, address indexed _from, uint256 tokenId, uint256 timeStamp, uint256 contractFee, identity identityStruct);

    function setApprovalForAll(address operator, bool approved) public virtual override onlyOwner{}
    function isApprovedForAll(address owner, address operator) public view virtual override onlyOwner returns (bool) {}
    function transferFrom(address from, address to, uint256 tokenId) public virtual override onlyOwner{}
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override  onlyOwner {}
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override onlyOwner {}
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory _data) internal virtual override onlyOwner {}

    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        bool validator;
        bool reporter;
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    address public chairperson;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;

    /// Create a new ballot to choose one of `proposalNames`.
    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
            name: proposalNames[i],
            voteCount: 0
            }));
        }
    }

    // Give `voter` the right to vote on this ballot.
    // May only be called by `chairperson`.
    function giveRightToVote(address voter) external {
        // If the first argument of `require` evaluates
        // to `false`, execution terminates and all
        // changes to the state and to Ether balances
        // are reverted.
        // This used to consume all gas in old EVM versions, but
        // not anymore.
        // It is often a good idea to use `require` to check if
        // functions are called correctly.
        // As a second argument, you can also provide an
        // explanation about what went wrong.
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    /// Delegate your vote to the voter `to`.
    function delegate(address to) external {
        // assigns reference
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");

        require(to != msg.sender, "Self-delegation is disallowed.");

        // Forward the delegation as long as
        // `to` also delegated.
        // In general, such loops are very dangerous,
        // because if they run too long, they might
        // need more gas than is available in a block.
        // In this case, the delegation will not be executed,
        // but in other situations, such loops might
        // cause a contract to get "stuck" completely.
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }

        // Since `sender` is a reference, this
        // modifies `voters[msg.sender].voted`
        Voter storage delegate_ = voters[to];

        // Voters cannot delegate to wallets that cannot vote.
        require(delegate_.weight >= 1);
        sender.voted = true;
        sender.delegate = to;
        if (delegate_.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate_.weight += sender.weight;
        }
    }

    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() public view
    returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() external view
    returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}