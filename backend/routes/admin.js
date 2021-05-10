const { request, response } = require('express');
const express = require('express');
const Router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt')

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
            res.send("success")
            jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: 3600 }, (err, token) => {
                if (!err)
                    res.json({ token: token });
                else {
                    console.log("You Are Not Authorized to access the site ! ");
                    res.json({ err: err });
                }
            });
        }else{
            res.send("wrong mail or password")
        }
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = Router