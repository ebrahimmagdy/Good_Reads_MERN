const express = require('express')
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/blogApp", {
     //useNewUrlParser = true,
     //useUnifiedTopology = true,
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