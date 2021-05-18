const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const adminRouter = require("./routes/admins");
const userRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");
const bookRouter = require("./routes/books");
const rateRouter = require("./routes/rates");
const reviewRouter = require("./routes/reviews");
const userBookRouter = require("./routes/userBooks");
const authorRouter = require("./routes/authors");


const dotenv = require("dotenv").config();
const uri = process.env.ATLAS_URI;
const validPaths = ["/admin/", "/users/", "/users/login"];

const app = express();

const PORT = 5000;

const MONGODB_PORT = 27017;
const MONGODB_DB = "GoodReads";

mongoose.connect(
  `mongodb://localhost:${MONGODB_PORT}/${MONGODB_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) 
        return console.error(err);
        
    console.log(uri);
    console.log(`Connected to mongodb on port ${MONGODB_PORT}.`);
  }
);

////////////////////////////////////////in client side///////////////////////
// get token from fetch request
// const token = await res.json();
//
// // set token in cookie
// document.cookie = `token=${token}`
/////////////////////////////////////////////////////////////////////////////

app.use(express.json());
app.use(cors());

// server requests logger
app.use((req, res, next) => {
  console.log(req.method, req.path, new Date());
  next();
});

app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);
app.use("/rates", rateRouter);
app.use("/reviews", reviewRouter);
app.use("/userbooks", userBookRouter);
app.use("/authors", authorRouter);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Started server on port ${PORT}`);
});

module.exports = mongoose;
