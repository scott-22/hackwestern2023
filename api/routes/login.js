var express = require('express');
var router = express.Router();

console.log(JSON.stringify({ "username" : "password" }))

/* GET login page. */
router.get('/', function(req, res, next) {
  res.send(username);
});

module.exports = router;




