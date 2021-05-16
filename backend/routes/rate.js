const { request, response } = require('express');
const express = require('express');
const Router = express.Router();
const Rate = require("../models/rate");
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const jwt_functions = require("../helper/jwt_functions") 

Router.post("/", jwt_functions.isAuthenticated, async (request, response, next) => {
    try{
        const rateData = request.body
        const rateInstance = new Rate({
            rate: rateData.rate,
            userId: rateData.userId,
            bookId: rateData.bookId,
        })
        const rate = await rateInstance.save()
        console.log(rate);
        response.send("rate created")
    } catch (e){
        console.log(e);
        response.status(500).send("Error happend!")
    }
})

Router.get("/", jwt_functions.isAuthenticated, async (request, response) => {
    try{
        const rates = await Rate.find()
        response.json(rates)
    } catch (e){

    }
})

Router.get("/:id", jwt_functions.isAuthenticated, async (request, response) => {
    try{
        const id = request.params.id
        const rate = await Rate.findById(id)
        response.json(rate)
    } catch (e){

    }
})

Router.get("/book/:id", jwt_functions.isAuthenticated, async (request, response) => {
    try{
        const id = request.params.id
        const rate = await Rate.find({bookId: id})
        response.json(rate)
    } catch (e){

    }
})

Router.patch("/update/:id", jwt_functions.isAuthenticated, async (request, response) => {
    try{
        const id = request.params.id
        console.log(`update spicefic rate with id = ${id}`);
        const rateData = request.body
        const rate = await Rate.findByIdAndUpdate(id, rateData)
        console.log(rate);
        response.send("rate updated")
    } catch (e){
        console.log(e);
    }
})

Router.delete("/:id", jwt_functions.isAuthorizedAsAdmin, async (request, response) => {
    try{
        const id = request.params.id
        const rate = await Rate.findByIdAndDelete(id)
        response.send("rate deleted")
    } catch (e){
        console.log(e);
    }
})

module.exports = Router