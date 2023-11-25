import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ServerApiVersion } from 'mongodb'


// MONGODB CONSTANTS
const username = process.env.DB_USER;
const password  = process.env.DB_PASSWORD;
const uri = "mongodb+srv://" + username + ":" + password + "@cluster0.rulvrss.mongodb.net/?retryWrites=true&w=majority";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  client.connect();

  // (findUser address) produces null if there does not exist a user with address, address in the database and produces the address otherwise.
  // findUser: address -> Promise
  // Note: to resolve this promise, call findUser(...).then(data => console.log(data)).
async function findUser(address) {
    try {
        // Connect the client to the server	(optional starting in v4.7)

        
        const database = client.db("user-info");
        const users = database.collection("users");

        const user = await users.findOne({ address: address }, {}); // finds user with address of the given address in the parameter
        return user;

    } finally {
        // Ensures that the client will close when you finish/error
        
        await client.close();
    }
}


// addUser(address) adds a user into the db with address of address. 
// addUser: address -> (anyof true false)
async function addUser(address) {
    try {
        const database = client.db("user-info");
        const users = database.collection("users");

        const user = await users.insertOne({ address: address });
        return true;
    } catch(e) {
        console.log(e);
        return false;
    } finally {
        await client.close();
    }
}

export { findUser, addUser };