
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
const contractAddress = "0xF696670247d5Bb25AE1920093ba2083975bF1867";
const petersonAddress = "0xF10CA6F1152f4FB138A939fb930050BeAdE02a51";

var contract;

var H_x = "82312525796946441549129366266799795483742779648232635156512444711477421427795";
var H_y = "100058829365969444434628394808037827260453106098122001630194601423097368410992";
var _r = "34271761935775149130412598735157757976663328381407114892535133063593588044481";
var _v = "20";

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
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
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
          "name": "getBid",
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
          "name": "getWinner",
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
          "name": "getWinningBid",
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
              "name": "_pedersonCommitment",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_r",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_v",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_hx",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_hy",
              "type": "uint256"
            }
          ],
          "name": "openBid",
          "outputs": [],
          "stateMutability": "nonpayable",
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
          "name": "opened_bids",
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
              "name": "x1",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "y1",
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
        console.log('Event openBid received: the bid is ' , _bidAmount);
        console.log('Event bidEvent received: event obj is ', event);
        loadTable();
    });


    document.getElementById("cAddress").innerText = contractAddress;
}

async function loadTable () {
    let bids = [];
    const addresses = await contract.getAddresses();
    const bidAmounts = await contract.getBids();
    console.log('Fetching the highest bid info...');
    const bid = await contract.getBid();

    console.log("Your bid is:", (bid));

    document.getElementById("hb").innerText = bid;

    const winner = await contract.getWinner();
    const winning_bid = await contract.getWinningBid();
    document.getElementById("_winner").innerText = winner;
    document.getElementById("_bid").innerText = winning_bid;
  
  
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


async function placeBid () {

    let b1 = document.getElementById('b1').value
    let b2 = document.getElementById('b2').value
    console.log(`Bidding with an amount for x ${b1} ...`);
    console.log(`Bidding with an amount for y ${b2} ...`);
    const tx = await contract.placeBid(b1, b2);
    const txReceipt = await tx.wait();
    if (txReceipt.status !== 1) {
        alert('Setting new bid failed');
    } else {
        console.log("Successfully bidded")
        console.log(txReceipt);
        console.log(BigInt(txReceipt.gasUsed));
        console.log(txReceipt.effectiveGasPrice);
        console.log(BigInt(txReceipt.cumulativeGasUsed));
        //const gasUsed = receipt.getTransactionReceipt().gasUsed;
        //console.log('Gas fee used: \t', ethers.utils.formatEther(txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice)))
    }
}

async function openBid () {

    const tx = await contract.openBid(petersonAddress, _r, _v, H_x, H_y);
    console.log("The opened bid is:", (tx));
    const txReceipt = await tx.wait();
    console.log("hx is:", (H_x));
    console.log("hy is:", (H_y));
    console.log("r is:", (_r));
    console.log("v is:", (_v));
    if (txReceipt.status !== 1) {
        alert('Setting new bid failed');
    } else {
        console.log("Successfully bidded")
        console.log(txReceipt);
        console.log(BigInt(txReceipt.gasUsed));
        console.log(txReceipt.effectiveGasPrice);
        console.log(BigInt(txReceipt.cumulativeGasUsed));
    
        //const gasUsed = receipt.getTransactionReceipt().gasUsed;
        //console.log('Gas fee used: \t', ethers.utils.formatEther(txReceipt.gasUsed.mul(txReceipt.effectiveGasPrice)))
    }
    const winner = await contract.getWinner();
    const winning_bid = await contract.getWinningBid();
    document.getElementById("_winner").innerText = winner;
    document.getElementById("_bid").innerText = winning_bid;

}




async function endAuction () {

    console.log('Ending auction...');
    const highestBid = await contract.endAuction();
}



