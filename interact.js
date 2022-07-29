const API_KEY = "m7cDJP_XYg-57DHSggx3TTxe-vrI2chV";
const PRIVATE_KEY = "a88b0ffd0cbe40d8bfa767f9184de3deba17f7cefdda663d2f794999a29d1cf8"
const CONTRACT_ADDRESS = "0x7c20C4bF4388CbC3DA6AAcA554a1d786B0a56F24"

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/auction.sol/Auction.json");

//provider = Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

//signer = you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//contract instance
const auctionContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await auctionContract.highestBindingBid();
    console.log("The highest bid is: " + message);

    console.log("Updating the bid...")
    const tx = await auctionContract.placeBid(20);
    await tx.wait({
        gasLimit: 1,
      });

    const new_bid = await auctionContract.highestBindingBid();
    console.log("The new highest bid is: " + new_bid);
    //contract update



}


main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});