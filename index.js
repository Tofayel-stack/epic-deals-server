const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
// mongodb 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// middleware 
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWARD}@cluster0.dcb0xdp.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// database connection check by this function 
async function dbConnect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      console.log('connected with mongodb');
    }
    catch{err => console.log(err)}
  }
dbConnect()

// collections
const usersCollection = client.db("epic-deals-e-commerce").collection("regular-users");


// hi



//  Here will start all API calls 


//...

app.get('/', (req, res) => {
  res.send('epic deals server is running !!! ')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})