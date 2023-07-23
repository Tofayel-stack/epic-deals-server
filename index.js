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
const usersCollection = client.db("epic-deals-e-commerce").collection("users");
const productCollection = client.db("epic-deals-e-commerce").collection("product");






// Get API 


// get a user by _id
app.get('/user',async(req,res)=>{
  try {
    const email = req.query.email;
    const query = {email:email}
    const result = await usersCollection.findOne(query)

    if (result) {
      res.status(200).send({
        success: true,
        message: `successfully found`,
        data: result,
      });
    } else {
      res.status(200).send({
        success: false,
        message: `Not found`,
        data: [],
      });
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      message: "failed! for some issue!",
      data: null,
    });
  }
})
//...
// get selling product of a seller
app.get('/sellingProduct',async(req,res)=>{
  try {
    const email = req.query.email;
    const query = {sellerEmail:email}
    const result = await productCollection.find(query).toArray()

    if (result) {
      res.status(200).send({
        success: true,
        message: `successfully found`,
        data: result,
      });
    } else {
      res.status(200).send({
        success: false,
        message: `Not found`,
        data: [],
      });
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      message: "failed! for some issue!",
      data: null,
    });
  }
})
//...

// get type of alluser seller/buyer   
app.get('/typeOfUser',async(req,res)=>{
  try {
    const type = req.query.type;
    const query = {userType:type}
    const result = await usersCollection.find(query).toArray()

    if (result) {
      res.status(200).send({
        success: true,
        message: `successfully found`,
        data: result,
      });
    } else {
      res.status(200).send({
        success: false,
        message: `Not found`,
        data: [],
      });
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      message: "failed! for some issue!",
      data: null,
    });
  }
})
//...
// get categori of products    
app.get('/categoriProduct/:categori',async(req,res)=>{
  try {
    const categori = req.params.categori;
    const query = {categories:categori}
    const result = await productCollection.find(query).toArray()

    if (result) {
      res.status(200).send({
        success: true,
        message: `successfully found`,
        data: result,
      });
    } else {
      res.status(200).send({
        success: false,
        message: `Not found`,
        data: [],
      });
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      message: "failed! for some issue!",
      data: null,
    });
  }
})
//...








//  Post API 

// create a user When he/she register frist time
app.post('/createUser',async(req,res)=>{
  try {
    const userData = req.body;

    const result = await usersCollection.insertOne(userData)
     if (result.acknowledged) {
      res.send({
        message: "user creation successfully ",
        data: result,
      });
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      message: "creation failed! for some issue!",
      data: null,
    });
  }
})
//...

// add a product by a seller in Database
app.post('/addProduct',async(req,res)=>{
  try {
    const productData = req.body;

    const result = await productCollection.insertOne(productData)
     if (result.acknowledged) {
      res.send({
        message: "product added successfully ",
        data: result,
      });
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      message: "creation failed! for some issue!",
      data: null,
    });
  }
})
//...



// PUT oparation 


// update the seller by verify   

app.put('/verifyUser',async(req,res)=>{
  try {
    const id = req.query.id
    const query = {_id:new ObjectId(id)}

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        verify: true
      },
    };

    const result = await usersCollection.updateOne(query,updateDoc,options)

    if (result) {
      res.status(200).send({
        success: true,
        message: `successfully updated`,
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      message: "failed! for some issue!",
      data: null,
    });
  }
})
//...





// Delete API 


// delete specific user
app.delete('/user',async(req,res)=>{
  try {
    const id = req.query.id
    const query = {_id:new ObjectId(id)}
    const result = await usersCollection.deleteOne(query)

    if (result) {
      res.status(200).send({
        success: true,
        message: `successfully updated`,
        data: result,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      message: "failed! for some issue!",
      data: null,
    });
  }
})
//...







app.get('/', (req, res) => {
  res.send('epic deals server is running !!! ')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})