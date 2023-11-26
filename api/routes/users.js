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



  // Add newly created user into database
  let newuser = new users({
    address: req.body.address,
    name: req.body.name,

  });
  await newuser.save();
  res.sendStatus(200);
});



module.exports = router;
