require("@nomicfoundation/hardhat-toolbox");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const ALCHEMY_API_KEY = "m7cDJP_XYg-57DHSggx3TTxe-vrI2chV";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "a88b0ffd0cbe40d8bfa767f9184de3deba17f7cefdda663d2f794999a29d1cf8";
ETHERSAN_APIKEY = "MVJ1DYCY27MAH6QDURZ3PSQA4STK7XG8BK";

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSAN_APIKEY,
    gas: 2100000,
    gasPrice: 8000000000
  }
};