const { request, response } = require('express');
const express = require('express');
const Router = express.Router();
const User = require("../models/user");
const Category = require("../models/category");
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const jwt_functions = require("../helper/jwt_functions") 

dotenv.config();

Router.post("/", async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({email: req.body.email})
    console.log(user);
    if(user == null){
        return res.status(400).send("user not found")
    }
    if(user.isAdmin != true){
        return res.status(400).send("you are not authorized to access this page")
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            console.log("ok1");
            const token = jwt_functions.generateAccessToken({ email: req.body.email });
            console.log(token);
            res.json({token});
            // jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: 3600 }, (err, token) => {
            //     console.log(token);
            //     if (!err){
            //         console.log("ok2");
            //         res.send({ token: "Bearer" + token })
            //         res.send("success");
            //     }else {
            //         console.log("You Are Not Authorized to access the site ! ");
            //         res.json({ err: err });
            //         res.send("failed");
            //     }
            // });
        }else{
            res.json("wrong mail or password")
        }
    } catch (error) {
        res.status(500).send()
    }
})

Router.post("/create_category", jwt_functions.isAuthorizedAsAdmin, async (request, response, next) => {
    try{
        const categoryData = request.body
        const categoryInstance = new Category({
            name: categoryData.name,
        })
        const category = await categoryInstance.save()
        console.log(category);
        response.send("category created")
    } catch (e){
        console.log(e);
        response.status(500).send("Error happend!")
    }
})

module.exports = Router