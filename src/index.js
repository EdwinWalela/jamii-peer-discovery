require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const Peer = require("./models/peer");


mongoose.connect(DB_URI,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log('DB connection successful');
});


app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get('/peers',async (req,res)=>{
    let peers = await Peer.find({},{_id:0});

    res.status(200).send({
        peers
    })
})

app.post('/peers',async(req,res)=>{
    let url = req.url

    try{
    await new Peer({
        url:peer
    }).save()

    res.status(201).send({
        msg:"peer registered"
    })
    return
    }catch(err){
        console.log(err)
        res.status(500).send({
            msg:"failed to register peer"
        })
    }
})

app.delete('/peers',async(req,res)=>{
    let url = req.url

    try{
        await Peer.findOneAndDelete({url:url});
        res.status(200).send({
            msg:"deregistered peer"
        })
        return
    }catch(err){
        res.status(500).send({
            msg:"failed to deregister peer"
        })
        return
    }
})

app.listen(PORT,()=>{
    console.log(`Listening for requests on port ${PORT}`);
})