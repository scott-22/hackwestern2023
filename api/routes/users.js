var express = require('express');
var router = express.Router();
const forge = require('node-forge');
var { users } = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const entitySecret = forge.util.hexToBytes(process.env.CIRCLE_ENTITY_SECRET)
    const publicKey = forge.pki.publicKeyFromPem(process.env.CIRCLE_PUBLIC_KEY)
    const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    })
    
    const ciphertext = forge.util.encode64(encryptedData);
    console.log(ciphertext)
});

router.get('/getuser/:addr', async (req, res, next) => {
  const query = await users.findOne({address: req.params.addr});
  if (query)
    res.status(200).send(JSON.stringify(query));
  else
    res.status(404).send(JSON.stringify({error: "User not found"}));
});

router.post('/adduser', async (req, res, next) => {
  // Check if user exists
  const query = await users.findOne({address: req.body.addr});
  if (query) {
    res.status(400).send(JSON.stringify({error: "User already exists"}));
    return;
  }

  // Create Circle wallet, get associated data
  const entitySecret = forge.util.hexToBytes(process.env.CIRCLE_ENTITY_SECRET)
  const publicKey = forge.pki.publicKeyFromPem(process.env.CIRCLE_PUBLIC_KEY)
  const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  })
  const ciphertext = forge.util.encode64(encryptedData);

  const walletRes = await fetch('https://api.circle.com/v1/w3s/developer/wallets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CIRCLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idempotencyKey: '0189bc61-7fe4-70f3-8a1b-0d14426397cb',
      accountType: 'EOA',
      blockchains: [
        'ETH-GOERLI',
      ],
      count: 1,
      entitySecretCiphertext: ciphertext,
      walletSetId: process.env.CIRCLE_WALLET_SET_ID,
    }),
  });

  if (!walletRes.ok) {
    res.status(500).send(JSON.stringify({error: "Circle wallet creation error"}));
    return;
  }

  let circleWallet = await walletRes.json();
  console.log(circleWallet);

  // Add newly created user into database
  let newuser = new users({
    address: req.body.address,
    name: req.body.name,
    personalInfo: req.body.identity,
    circleAddress: circleWallet.data.wallets[0].address,
    circleId: circleWallet.data.wallets[0].id,
  });
  await newuser.save();
  res.sendStatus(200);
});



module.exports = router;
