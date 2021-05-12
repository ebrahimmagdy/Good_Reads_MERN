const { request, response } = require('express');
const express = require('express');
const Router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt_functions = require("../helper/jwt_functions") 

Router.get("/", async (request, response) => {
    try{
        const users = await User.find()
        response.json(users)
    } catch (e){

    }
})

Router.get("/:id", async (request, response) => {
    try{
        const id = request.params.id
        const user = await User.findById(id)
        response.json(user)
    } catch (e){

    }
})

Router.post("/", async (req, res, next) => {
    try{
        const userData = req.body
        const userInstance = new User({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            photo: userData.photo,
            isAdmin: userData.isAdmin,
        })
        const user = await userInstance.save()
        console.log(user);
        const token = jwt_functions.generateAccessToken({ email: req.body.email });
        console.log(token);
        res.json({'status': "user created", 'token': token});
    } catch (e){
        console.log(e);
        res.status(500).send("Error happend!")
    }
})

Router.post("/login", async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({email: req.body.email})
    console.log(user);
    if(user == null){
        return res.status(400).send("user not found")
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send("success")
            const token = jwt_functions.generateAccessToken({ email: req.body.email });
            console.log(token);
            res.json({token});
        }else{
            res.send("wrong mail or password")
        }
    } catch (error) {
        res.status(500).send()
    }
})


Router.patch("/update/:id", jwt_functions.isAuthenticated, async (request, response) => {
    try{
        const id = request.params.id
        console.log(`update spicefic user with id = ${id}`);
        const userData = request.body
        const user = await User.findByIdAndUpdate(id, userData)
        console.log(user);
        response.send("user updated")
    } catch (e){
        console.log(e);
    }
})

Router.delete("/:id", jwt_functions.isAuthenticated, async (request, response) => {
    try{
        const id = request.params.id
        const user = await User.findByIdAndDelete(id)
        response.send("user deleted")
    } catch (e){
        console.log(e);
    }
})

// Router.post('/logout', (req, res) => {
//     const token  = req.body;
//     refreshTokens = refreshTokens.filter(token => t !== token);

//     res.send("Logout successful");
// });

module.exports = Router