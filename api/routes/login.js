var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.send('{"message": "test message"}');
});

module.exports = router;
