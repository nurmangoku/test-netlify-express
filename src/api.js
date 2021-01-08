const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Schema = require("./schema/schema.js")
const serverless = require("serverless-http")

const router = express.Router()

const runDb = async ()=>{
    try{
        const db = await mongoose.connect("mongodb+srv://nurman:kimia345@cluster0.kkeyk.mongodb.net/test?retryWrites=true&w=majority",
        {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
    }
    catch(err){
        console.log(err);
    }
}

app.use(express.json())
runDb().then(()=>console.log("database ok"))

router.get("/",async (req,res)=>{
    try {
        const text = await Schema.find()
        res.json(text)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.post("/", async (req,res)=>{
    try{
        const tes = {
            text: req.body.text
        }
        const tesSaved = await Schema.create(tes)
        res.send(tesSaved);
    }
    catch(err){
        res.send(err)
    }
})

app.use(`/.netlify/functions/app`, router)

// app.listen(3000,()=> console.log("server run"))

module.exports = app
module.exports.handler = serverless(app)