pragma solidity >=0.8.0;

contract Auction {

    // Create a structure to store information about an item in the auction house
	struct Item{			
		uint id;
        bool ended;
    }

    // Creating hash tables for storing information
    address[] public addresses;
    uint[] public bidAmounts;
    address highestBidder;
    mapping(address => uint) public bids;
    Item item;
    address _owner;

    event bidEvent(uint _bidAmount);

	// Constructor
	constructor() {	
        item = Item(1, false);
        highestBidder = msg.sender;
        bids[highestBidder] = 0;
        _owner = msg.sender;
    }
		
    // Function to place a bid
    function placeBid (uint _bidAmt) public {
        require(item.ended == false, "The auction has ended");
        if (alreadyBidded()) {
            if (bids[msg.sender] < _bidAmt) {
                uint index = findElementInArray(msg.sender, addresses);
                bidAmounts[index] = _bidAmt;
            }
        }
        else {
            addresses.push(msg.sender);
            bidAmounts.push(_bidAmt);
        }
        emit bidEvent(_bidAmt);
    }

    function findElementInArray(address element, address[] memory arr) public returns(uint) {
    for (uint i = 0 ; i < arr.length; i++) {
        if (element == arr[i]) {
            return i;
        }
    }
    return 0;
}

    function alreadyBidded() view public returns (bool) {
        if (bids[msg.sender] > 0) {
            return true;
        }
        return false;
    }

    function endAuction() public {
        require(msg.sender == _owner);
        item.ended = true;
    }

    function getHighestBid() view public returns(uint){
        return bids[highestBidder];
    }
    function getAddresses() view public returns(address[] memory){
        return addresses;
    }
    function getBids() view public returns(uint[] memory){
        return bidAmounts;
    }



}
