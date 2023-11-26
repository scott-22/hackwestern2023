var express = require('express');
var router = express.Router();
const forge = require('node-forge');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("works so far")
    console.log(process.env.CIRCLE_ENTITY_SECRET)
    console.log(process.env.CIRCLE_PUBLIC_KEY)
    const entitySecret = forge.util.hexToBytes(process.env.CIRCLE_ENTITY_SECRET)
    const publicKey = forge.pki.publicKeyFromPem(process.env.CIRCLE_PUBLIC_KEY)
    console.log(entitySecret)
    console.log(publicKey)
    const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    })
    
    console.log(forge.util.encode64(encryptedData))
});

module.exports = router;
