const express = require('express');
const app = express();
const authorRouter = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).single('image')

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && filetypes)
        return cb(null, true)
    else {
        cb('Images Only !!')
    }
}



authorRouter.post('/', async(req, res) => {
    const user = User.findOne({email: req.body.email})
        if(user == null){
            return res.status(400).send("user not found")
        }
        else{
            Author.findOne({ firstName: req.body.firstName, lastName: req.body.lastName }).then(author => {
            if (author) 
                return res.status(400).json({massege: 'Your Author is already exists !' });
                 else {
                    const author = new Author({
                    photo: req.file || 'No photo till the moment',
                    photo: req.body.photo,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dateOfBirth: req.body.dateOfBirth,
                    description: req.body.description || ''
                    } );          
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

authorRouter.get('/', async(req, res) => {
    try {
        let authors = await Author.find({}).populate('author');
        res.json({
            message: "Authors list",
            data: authors
        });
    } catch (err) {
        return res.status(403).send({ message: 'can not get all authors' })
    }
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

authorRouter.delete('/:id',  async(req, res) => {
    try {
        let author = await Author.findByIdAndRemove(req.params.id);
        res.json({
            message: "author removed successfully",
            data: author
        });
    } catch (err) {
        res.status(403).send({ message: 'author removed Failed' });
    }
});

authorRouter.patch('/:id', async(req, res) => {

    try {
        const author = await Author.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json({
            message: "author updated successfully",
            data: author
        });

    } catch (err) {
        res.status(403).send({ message: 'author Updated Failed' });
    }
});

module.exports = authorRouter;