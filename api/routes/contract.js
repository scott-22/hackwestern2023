var express = require('express');
var router = express.Router();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const VerificationContract = require('../../build/contracts/Verification.json');

// Set up web3 provider to represent the CRA (for verifying and unverifying users via the smart contract)
const provider = new HDWalletProvider({
  mnemonic: process.env.MINTER_MNEMONIC,
  providerOrUrl: "http://localhost:7545",
});


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

module.exports = router;
