const express = require('express')
const app = express()
const mongoose = require("mongoose")

const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb://localhost:27017/GoodReads", {
     useNewUrlParser: true,
     useCreateIndex: true,
}, (err) => {
    if (err)
        return console.log("can not connect to db");
    console.log("connected to db");
})

app.use(express.json())

app.listen(5000, (err) => {
    if(err)
        return console.log(err);
})

module.exports = mongoose