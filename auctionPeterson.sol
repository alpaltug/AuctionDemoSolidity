pragma solidity ^0.8.0;

interface Pederson {
    function verifyWithH( uint256 _r , uint256 _v , uint256 _x1 , uint256 _y1 , uint256 _hx , uint256 _hy) external view returns (bool);
} 

contract Auction {

    // Create a structure to store information about an item in the auction house

    // Creating hash tables for storing information
    mapping(address => uint[2]) public bids;
    address _owner;
    bool ended;
    mapping(address => uint) public opened_bids;
    uint winningBid;
    address winner;
    address[] public addresses;
    uint[] public bidAmounts;

    event bidEvent(uint _bidAmount);

	// Constructor
	constructor() public{	
        _owner = msg.sender;
        ended = false;
        winningBid = 0;
    }
		
    // Function to place a bid
    function placeBid (uint x1, uint y1) public {
        require(ended == false);
        bids[msg.sender][0] = x1;
        bids[msg.sender][1] = y1;
    }

    function endAuction() public {
        require(msg.sender == _owner);
        ended = true;
    }

    function openBid(address _pedersonCommitment, uint _r, uint _v, uint _hx, uint _hy) external{
        require(ended == true);
        uint x = bids[msg.sender][0];
        uint y = bids[msg.sender][1];

        bool valid = Pederson(_pedersonCommitment).verifyWithH(_r, _v, x, y, _hx, _hy);
        if (valid) {
            opened_bids[msg.sender] = _v;
            addresses.push(msg.sender);
            bidAmounts.push(_v);
            if (_v > winningBid) {
                winningBid = _v;
                winner = msg.sender;
            }
            emit bidEvent(_v);
        }

    }

    function getBid() view public returns(uint){
        return opened_bids[msg.sender];
    }
    function getWinner() view public returns(address){
        return winner;
    }
    function getWinningBid() view public returns(uint){
        return winningBid;
    }
    function getAddresses() view public returns(address[] memory){
        return addresses;
    }
    function getBids() view public returns(uint[] memory){
        return bidAmounts;
    }

}
