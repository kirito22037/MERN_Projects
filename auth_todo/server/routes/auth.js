const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register',(req,res)=>{

    const hashedPassword = bcrypt.hashSync(req.body.password , 8);

    //store in db
    const newuser = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
    newuser.save()
    .then(doc=>{
        //user is registered , now send a web token
        const token = jwt.sign({id : doc._id} , 'raisecretkey', {
            expiresIn : 86400
        });
        res.status(200).json({
            auth : true,
            token : token,
            name : doc.name,
            email : doc.email
        });
    })
    .catch(err=>{
        res.status(500).send("there was a problem while registering the user");
    });
});


router.post('/login' , (req,res)=>{
    User.findOne({email : req.body.email})
    .then(user=>{
        if(!user)
        {
            res.status(404).send("No User Found");
        }
        else
        {
            //check for password
            const checkPassword = bcrypt.compareSync(req.body.password , user.password);
            if(checkPassword)
            {
                const token = jwt.sign({id : user._id},'raisecretkey',{
                    expiresIn : 86400
                });
                res.status(200).json({
                    auth : true,
                    token : token,
                    name : user.name,
                    email : user.email
                });
            }
            else
            {
                res.status(401).send({
                    auth : false,
                    token : null
                });
            }
        }
    })
    .catch(err=>{
        res.status(500).send("error while loging In");
    });
});

router.get('/logout',(req,res)=>{
    res.status(200).send({
        auth : false,
        token : null,
        name : "beta",
        gmail : "beta@gmail.com",
    });
});

module.exports = router;