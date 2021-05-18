const express = require('express')
const app = express()
const mongoose = require("mongoose")
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const bookRouter = require('./routes/book')
const rateRouter = require('./routes/rate')
const reviewRouter = require('./routes/review')
const userBookRouter = require('./routes/userBook')
const User = require("./models/user")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const uri = process.env.ATLAS_URI
const validPaths = ["/admin/", "/users/", "/users/login"]
const cors = require("cors");
const authorRouter = require('./routes/author')

mongoose.connect("mongodb://localhost:27017/GoodReads", {
     useNewUrlParser: true,
     useCreateIndex: true,
}, (err) => {
    if (err){
        console.log(err);
        return console.log("can not connect to db");
    }
    console.log(uri);
    console.log("connected to db");
})

////////////////////////////////////////in client side///////////////////////
// get token from fetch request
// const token = await res.json();
//
// // set token in cookie
// document.cookie = `token=${token}`
/////////////////////////////////////////////////////////////////////////////


app.use(express.json())
app.use(cors());

app.use("/admin", adminRouter)
app.use("/users", userRouter)
app.use("/books", bookRouter)
app.use("/categories", categoryRouter)
app.use("/rates", rateRouter)
app.use("/reviews", reviewRouter)
app.use("/userbooks", userBookRouter)
app.use("/authors", authorRouter)

app.listen(5000, (err) => {
    if(err)
        return console.log(err);
})

module.exports = mongoose