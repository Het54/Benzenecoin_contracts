const ethers = require('ethers')
const contract = require('./config');
require('dotenv').config();

const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", "_avJ-9qv9MNiuws-3Y8k0_3wxuhbDkW-");
//Signer
const signer = new ethers.Wallet("109b563fb3a28cf86de55b38a969a3dfbfc3421d10e763c2343cac9a81c23e01", alchemyProvider);

// Contract
const BContract = new ethers.Contract(contract.CONTACT_ADDRESS_BT, contract.CONTACT_ABI_BT, signer);
    
async function main() {
    const message = await BContract.name();
    console.log("The name of coin is: " + message);
    const bb = await BContract.balanceOf("0xE1e83Ff40a436b38720632843254188ed446B6DD")
    console.log("The balance is: "+bb)

    // const tt = await BContract.transferFrom("0xFdcd021B3103DBd26497DD46fa06619d2e07c51E","0xe4c30ef788ace1000ea08c2b9eeb0af4ba373fab",100)
    // console.log("The balance is: "+tt)

    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const benzeneToken_Contract = new web3.eth.Contract(contract.CONTACT_ABI_BT, contract.CONTACT_ADDRESS_BT);
    
    const myAddress = '0xe1e83ff40a436b38720632843254188ed446b6dd' //TODO: replace this address with your own public address
   
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x66a4662167d65255821d3611b8dad6d8822cdf73', // faucet address to return eth
     'value': web3.utils.toHex(web3.utils.toWei('0', 'gwei')),
     'gas': 53577,
     'maxPriorityFeePerGas': 1000000108,
     'nonce': nonce,
     'data': benzeneToken_Contract.methods.transfer("0xDaae870770dde934B28D47052fAb634257724AF1", 1).encodeABI()
     // optional data field to send message or execute smart contract
    };
   
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
  }
  main();