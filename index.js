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
const contractAddress = "0x6C7BEbe2611a3404136BeB30Ccf34633172ea56C";

var contract;

async function setUpContract () {

    //import abi from "../abis/contract.json";
    //const contractabi = JSON.parse('../abis/contract.json'); // the ABI

    
    
    const contractABI = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_bidAmount",
            "type": "uint256"
          }
        ],
        "name": "bidEvent",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "addresses",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "alreadyBidded",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "bidAmounts",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "bids",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "endAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "element",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "arr",
            "type": "address[]"
          }
        ],
        "name": "findElementInArray",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAddresses",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getBids",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getHighestBid",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_bidAmt",
            "type": "uint256"
          }
        ],
        "name": "placeBid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    console.log(contractABI);

    //const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner()); 
    console.log('Create contract obj');
    contract = new ethers.Contract(contractAddress, contractABI, signer);   
    console.log(contract);
    console.log('contract ready for interaction');

    contract.on("bidEvent", (event, _bidAmount) => {
      console.log('Event placeBid received: the bid is ' , _bidAmount);
      console.log('Event bidEvent received: event obj is ', event);
      loadTable();
  });


    document.getElementById("cAddress").innerText = contractAddress;
}


async function placeBid () {

    let b = document.getElementById('bid').value
    console.log(`Bidding with an amount ${b} ...`);
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

async function loadTable () {
  let bids = [];
  const addresses = await contract.getAddresses();
  const bidAmounts = await contract.getBids();


  for (let i = 0; i < addresses.length; i++) {
    newBid = {
      "addr": addresses[i],
      "bid": bidAmounts[i]
    }
    bids.push(newBid);
  }

  const tableBody = document.getElementById('tableData');
  let dataHTML = '';

  for(let bidder of bids) {
    dataHTML += `<tr><td>${bidder.addr}</td><td>${bidder.bid}</td></tr>`;
  }
  console.log(dataHTML);

  tableBody.innerHTML = dataHTML;
}



async function getHighestBid () {


  console.log('Fetching the highest bid info...');
  const highestBid = await contract.getHighestBid();
  const highestBindingBid = await contract.getHighestBindingBid();

  console.log("The highest bid is:", highestBid);
  console.log("The highest binding bid is:", highestBindingBid);

  document.getElementById("hb").innerText = highestBid;
  document.getElementById("hbb").innerText = highestBindingBid;


}



