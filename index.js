const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require ('cors')                                             
const jwt = require('jsonwebtoken')
const app= express()
require('dotenv').config()
const port = process.env.PORT||5000

// middleWare

app.use(cors());
app.use(express.json())

// mongoDB connection

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hvwcwlz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)





async function run(){
    try{
        const billingCollection=client.db("Power-Hack").collection("billing")
        const usersCollection=client.db("Power-Hack").collection("users")


        // Billing - api
        app.get('/billing-list/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = {_id:ObjectId(id)}
            const result = await billingCollection.findOne(filter);
            res.send(result);
        })
        app.get('/billing-list', async(req,res)=>{
            const query ={};
            const billingList = await billingCollection.find(query).toArray();
            const count = await billingCollection.estimatedDocumentCount();
            res.send(billingList)      
        })
        app.put('update-billing/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = {_id:ObjectId(id)};
            const result = await billingCollection.updateOne(filter)
            res.send(result);
        })
        app.post('/add-billing', async(req, res)=>{
            const billing = req.body;
            const result = await billingCollection.insertOne(billing);
            res.send(result)
        })
        app.delete('/delete-billing/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            result = await billingCollection.deleteOne(filter);
            res.send(result);
        })

        // user API

        app.post('/login', async (req,res)=>{
            const id = req.params.id;
            const filter = {_id:ObjectId(id)}
            const result = await usersCollection.findOne(filter);
            res.send(result)
        })

        app.post('/registration', async (req,res)=>{
            const user=req.body;
            const result = await usersCollection.insertOne(user);
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