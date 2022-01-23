require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;


mongoose.connect(DB_URI,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log('DB connection successful');
});


app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send({
        docs:"https://documenter.getpostman.com/view/4654837/UVXesJR2"
    })
})

app.listen(PORT,()=>{
    console.log(`Listening for requests on port ${PORT}`);
})