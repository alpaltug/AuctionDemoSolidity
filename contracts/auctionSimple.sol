pragma solidity >=0.7.3;

contract Auction {

    // Create a structure to store information about an item in the auction house
	struct Item{			
		uint id;
        bool ended;
    }

    // Creating hash tables for storing information
    address highestBidder;
    uint second;
    mapping(address => uint) public bids;
    Item item;
    address _owner;
    uint public bindingBid;
    uint bidIncrement;

	// Constructor
	constructor() {	
        item = Item(1, false);
        highestBidder = msg.sender;
        bids[highestBidder] = 0;
        second = 0;
        _owner = msg.sender;
        bidIncrement = 1;
    }
		
    // Function to place a bid
    function placeBid (uint _bidAmt) public {
        require(item.ended == false);
        bool temp = false;
        bool temp1 = false;
        if (bids[msg.sender] > 0) {
            if (_bidAmt <= bids[msg.sender]) {
                temp = true;
            }
            else {
                if (highestBidder == msg.sender) {
                    temp1 = true;
                }
            }
        }
        if (temp == false) {
            if (_bidAmt > bids[highestBidder]) {
                if (temp1 == false) {
                    second = bids[highestBidder];
                }
                highestBidder = msg.sender;
                bindingBid = second + bidIncrement;
            }
            else if (_bidAmt > second){
                second = _bidAmt;
                bindingBid = _bidAmt + bidIncrement;
            }	
            bids[msg.sender] = _bidAmt;
        }
    }

    function endAuction() public {
        require(msg.sender == _owner);
        item.ended = true;
    }

    function getHighestBid() view public returns(uint){
        return bids[highestBidder];
    }
    function getHighestBindingBid() view public returns(uint){
        if (second == 0) {
            return bidIncrement;
        }
        return second+1;
    }
}
