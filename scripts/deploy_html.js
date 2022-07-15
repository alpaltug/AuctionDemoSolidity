const { ethers } = require("hardhat");

async function main() {
    const Auction = await ethers.getContractFactory("contracts/auction.sol:Auction")

    const _auction = await Auction.deploy()
    console.log("Contract deployed to address: ", _auction.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});