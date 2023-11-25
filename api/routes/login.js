var express = require('express');
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');

// MONGODB CONSTANTS
const username = process.env.DB_USER;
const password  = process.env.DB_PASSWORD;

/* GET login page. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify({ username : password }));
});

module.exports = router;
