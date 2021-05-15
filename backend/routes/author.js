const express = require('express');
const app = express();
const authorRouter = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
    
/**
 * Adding a new Author
 */
authorRouter.post('/',(req, res, next) => {
    const user = User.findOne({email: req.body.email})
    if(user == null){
        return res.status(400).send("user not found")
    }
    else{
        Author.findOne({ firstName: req.body.firstName, lastName: req.body.lastName }).then(author => {
        if (author) 
            return res.status(400).json({massege: 'Your Author is already exists !' });
        else{
            const author = new Author({
                // photo: req.file.path || 'No photo till the moment',
                photo: req.body.photo,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                description: req.body.description || '',
            });

        author.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "Author Was Created Successfully..",
            });
        }).catch(err => {
            console.log("You got an error : " + err);
            res.status(500).json({error: err})
            });
    }
        })
    }
});


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
authorRouter.get('/:id', (req, res) => {
    Author.findById(req.params.id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send('Error While getting data : ' + err);
    });
});



module.exports = authorRouter;