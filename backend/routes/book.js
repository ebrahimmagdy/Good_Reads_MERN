const { request, response } = require('express');
const express = require('express');
const Router = express.Router();
const Book = require("../models/book");
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const jwt_functions = require("../helper/jwt_functions") 

// Router.post("/", jwt_functions.isAuthorizedAsAdmin, async (request, response, next) => {
//     try{
//         const bookData = request.body
//         const bookInstance = new Book({
//             name: bookData.name,
//         })
//         const book = await bookInstance.save()
//         console.log(book);
//         response.send("book created")
//     } catch (e){
//         console.log(e);
//         response.status(500).send("Error happend!")
//     }
// })

Router.get("/", jwt_functions.isAuthorizedAsAdmin, async (request, response) => {
    try{
        const books = await Book.find()
        response.json(books)
    } catch (e){

    }
})

Router.get("/:id", jwt_functions.isAuthorizedAsAdmin, async (request, response) => {
    try{
        const id = request.params.id
        const book = await Book.findById(id)
        response.json(book)
    } catch (e){

    }
})

Router.patch("/update/:id", jwt_functions.isAuthorizedAsAdmin, async (request, response) => {
    try{
        const id = request.params.id
        console.log(`update spicefic book with id = ${id}`);
        const bookData = request.body
        const book = await Book.findByIdAndUpdate(id, bookData)
        console.log(book);
        response.send("book updated")
    } catch (e){
        console.log(e);
    }
})

Router.delete("/:id", jwt_functions.isAuthorizedAsAdmin, async (request, response) => {
    try{
        const id = request.params.id
        const book = await Book.findByIdAndDelete(id)
        response.send("book deleted")
    } catch (e){
        console.log(e);
    }
})

module.exports = Router