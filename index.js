const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.port || 5000;

// middleWare

app.use(cors());
app.use(express.json())

// mongoDB connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hvwcwlz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run(){
    try{
        const billingCollection=client.db("Power-Hack").collection("billing")
        app.get('/billing-list', async(req,res)=>{
            
        })
        app.post('/add-billing', async(req, res)=>{
            const billing = req.body;
            const result = await billingCollection.insertOne(billing);
            res.send(result)
        })

    }
    finally{

    }
}
run()
.catch(err => console.log(err))

app.get('/', (req,res)=>{
    res.send('Power-hack server is running')
})
app.listen(port, ()=>{
    console.log(`My API is running on port${port}`)
})