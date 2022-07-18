
var userAddress;
var provider;
var signer;

async function connectWallet () {
    console.log('Connect Wallet clicked');

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    console.log(provider);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = provider.getSigner();

    let userAddress = await signer.getAddress();
    let net = await provider.getNetwork();
    let netName = net.name;
    console.log(netName);
    let balance = await provider.getBalance(userAddress);

    document.getElementById("wallet").innerText = 
        `${userAddress}   Network: ${netName}   Bal: ${(+ethers.utils.formatEther(balance)).toFixed(4)}`;

    setUpContract();

}

// original - wo event
//const contractAddress = "0x571702de91449f3c9dc76003ec40d44b3162089e";
// 2nd one - w event
//const contractAddress = "0xD14F8223d4254ea781c611AFEDe1aaFB30d2Bcf6";
// greeterf
//const contractAddress = "0x646Ff94436760740E185060772CEBf99dB2A54b0";
// 20220713
const contractAddress = "0x2f9DCb9347919c74611280b02eb41928af2A61Eb";

var contract;

async function setUpContract () {

    //import abi from "../abis/contract.json";
    //const contractabi = JSON.parse('../abis/contract.json'); // the ABI
    
    const contractABI = require("../AuctionAbi.json");
    contractABI = JSON.parse(contractABI)

    console.log(contractABI);

    //const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner()); 
    console.log('Create contract obj');
    contract = new ethers.Contract(contractAddress, contractABI, signer);   
    console.log(contract);
    console.log('contract ready for interaction');


    document.getElementById("cAddress").innerText = contractAddress;
}


async function placeBid () {
    let b = document.getElementById('currentBid').value
    console.log(`Bidding with an amount of ${b} ...`);

    const tx = await contract.placeBid(b);
    const txReceipt = await tx.wait();
    if (txReceipt.status !== 1) {
        alert('Setting new bid failed');
    } else {
        console.log(`Successfully bidded with amount ${b}`)
        console.log(txReceipt);
        console.log(BigInt(txReceipt.gasUsed));
        console.log(txReceipt.effectiveGasPrice);
        console.log(BigInt(txReceipt.cumulativeGasUsed));
        //const gasUsed = receipt.getTransactionReceipt().gasUsed;
        //console.log('Gas fee used: \t', ethers.utils.formatEther(txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice)))
    }
}

async function getHighestBid () {

    console.log('Fetching the highest bid info...');
    const highestBid = await contract.getHighestBidder();
    const highestBindingBid = await contract.highestBindingBid();

    console.log("The highest bid is:", highestBid);
    console.log("The highest binding bid is:", highestBindingBid);

    document.getElementById("hb").innerText = highestBid;
    document.getElementById("hbb").innerText = highestBindingBid;


}

