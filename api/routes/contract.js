var express = require('express');
var router = express.Router();

// const Contract = require('../../build/contracts/Contract.json');

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
  // res.send(Contract["abi"]);
});

module.exports = router;
