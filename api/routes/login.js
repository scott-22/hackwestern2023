var express = require('express');
require('dotenv').config();
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');


// MONGODB CONSTANTS
const username = process.env.DB_USER;
const password  = process.env.DB_PASSWORD;

console.log(JSON.stringify({ username : password }))

/* GET login page. */
router.get('/', function(req, res, next) {
  res.send(username);
});

module.exports = router;

const uri = "mongodb+srv://" + username + ":" + password + "@cluster0.rulvrss.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);



