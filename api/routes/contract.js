var express = require('express');
var router = express.Router();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const VerificationContract = require('../../build/contracts/Verification.json');

// Set up web3 provider to represent the CRA (for verifying and unverifying users via the smart contract)
const provider = new HDWalletProvider({
  mnemonic: process.env.MINTER_MNEMONIC,
  providerOrUrl: "http://127.0.0.1:7545",
});
var web3 = new Web3(provider);
var myContract = new web3.eth.Contract(VerificationContract["abi"], process.env.CONTRACT_ADDRESS);


// Send the contract address
router.get('/contract-address', (req, res, next) => {
  res.send(JSON.stringify({address: process.env.CONTRACT_ADDRESS}));
});

// Send the minter (CRA) address
router.get('/minter-address', (req, res, next) => {
  res.send(JSON.stringify({address: process.env.MINTER_ADDRESS}));
});

// Send the contract ABI
router.get('/abi', function(req, res, next) {
  res.send(VerificationContract["abi"]);
});

// Send all test addresses for visualization
router.get('/all-addresses', function(req, res, next) {
  res.send(process.env.ALL_ADDRESSES);
});

// Verifies an address  
router.post('/verify', async function(req, res, next) {
  await myContract.methods.verify(req.body.address).send(
    { from: process.env.MINTER_ADDRESS },
    (res => {console.log(res)})
  );
  
  res.send(200);
});

// Unverifies an address 
router.post('/unverify', async function(req, res, next) {
  await myContract.methods.unverify(req.body.address).send(
    { from: process.env.MINTER_ADDRESS },
    (res => {console.log(res)})
  );

  res.send(200);
});

// Sets the user info 
router.post('/setData', async function(req, res, next) {
  await myContract.methods.setData(req.body.address, req.body.info).send(
    { from: process.env.MINTER_ADDRESS },
    (res => {console.log(res)})
  );

  res.send(200);
});

module.exports = router;
