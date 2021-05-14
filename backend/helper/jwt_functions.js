const User = require("../models/user")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

function generateAccessToken(email) {
    console.log("inside generate tokken")
    console.log(process.env.SECRET_ACCESS_TOKEN);
    return jwt.sign(email, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '3600s' });
}

function isAuthorizedAsAdmin(req, res, next) {
    console.log(req.path);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    console.log(token);
    console.log(process.env.SECRET_ACCESS_TOKEN);

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, user) => {
        console.log(err)

        if (err) 
            return res.sendStatus(403)

        result = await User.findOne({email: user.email})
        if(result.isAdmin){
            req.user = user
            console.log(user);
            next()
        }else{
            console.log(result);
            console.log("not admin");
            return res.sendStatus(401)
        }
    })
}

function isAuthenticated(req, res, next) {
    console.log(req.path);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    console.log(token);
    console.log(process.env.SECRET_ACCESS_TOKEN);

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user
        console.log(user);
        next()
    })
}

module.exports = { isAuthorizedAsAdmin, isAuthenticated, generateAccessToken }