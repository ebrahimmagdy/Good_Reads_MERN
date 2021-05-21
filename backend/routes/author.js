const express = require('express');
const app = express();
const authorRouter = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const jwt_functions = require("../helper/jwt_functions") 

/**
 * Adding a new Author
 */

 authorRouter.post("/", jwt_functions.isAuthorizedAsAdmin, async (request, response, next) => {
    try{
        const authorData = request.body
        const authorInstance = new Author({
            firstName: authorData.firstName,
            lastName: authorData.lastName,
            dateOfBirth: authorData.dateOfBirth,
            description: authorData.description,
            photo: authorData.photo,
        })
        const author = await authorInstance.save()
        console.log(author);
        response.send("author created")
    } catch (e){
        console.log(e);
        response.status(500).json({event:e})
    }
})
/**
 * Return Authors
 */
authorRouter.get('/', (req, res) => {
    Author.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send('Error while getting Author info');
    });
});

/**
 * Return Author with a specific id
 */



authorRouter.get('/:id', async(req, res) => {
    try {
        let author = await Author.findOne({ _id: req.params.id });
        res.json({
            message: "authors details",
            data: author
        });
    } catch (err) {
        return res.status(404).send({ message: 'can not get author !!' })
    }
});








authorRouter.patch("/update/:id", jwt_functions.isAuthorizedAsAdmin, async (request, response) => {
    try{
        const id = request.params.id
        console.log(`update spicefic author with id = ${id}`);
        const authorData = request.body
        const author = await Author.findByIdAndUpdate(id, authorData)
        console.log(author);
        response.send("author updated")
    } catch (e){
        console.log(e);
    }
})

authorRouter.delete("/:id", jwt_functions.isAuthorizedAsAdmin, async (request, response) => {
    try{
        const id = request.params.id
        const author = await Author.findByIdAndDelete(id)
        response.send("author deleted")
    } catch (e){
        console.log(e);
    }
})

module.exports = authorRouter;
