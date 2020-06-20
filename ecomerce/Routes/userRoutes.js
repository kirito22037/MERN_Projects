const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

//------------util function-------------------------
const createToken = (id)=>{
    return jwt.sign({ id : id } , process.env.SECRET_KEY , { expiresIn : 86400 });
};

const verifyAuth = (token , res)=>{
    jwt.verify(token , process.env.SECRET_KEY , (err, decoded)=>{
        if(err){ 
            res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }); }

        //now find if the user exist in DB or not
        User.findById(decoded.id , { password : 0 })
        .then(doc=>{
            console.log("result doc : ", doc);
            if(doc === null)
            {
                res.status(401).json({ auth : false , message : "No such user exist"});
            }
            res.status(201).json({ auth : true , data : doc });
        })
    });
};


//--------------------routes---------------------------------
router.post('/signup' , (req, res)=>{

    const hashedPassword = bcrypt.hashSync(req.body.password , 8);
    const user = new User({
        name : req.body.userName,
        email : req.body.email,
        password : hashedPassword
    });
    user.save()
    .then(userDoc=>{
        console.log("user save data : " , userDoc );
        console.log("token : ", );
        res.status(201).json({ auth : true , token : createToken(userDoc._id) });
    })
    .catch(err=>{
        res.status(501).json({ auth : false , message : "server side error" });
    });
});

router.get('/me' , (req, res)=>{
    console.log(req.headers);
    const token = req.headers['x-access-token'];
    console.log("token : ", token);
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    verifyAuth(token , res);
});

router.post('/login' , (req, res)=>{
    User.findOne({ email : req.body.email })
    .then(user=>{
        if(!user){ return res.status(404).json({ auth: false , message : 'No user found.'} ) };

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, message : "invalid password " , token: null });
        
        res.status(201).json({ auth : true , token : createToken(user._id) }); 
    })
    .catch(err=>{
        if(err){ return res.status(500).send({ auth : false , message : 'Error on the server.'} ) };
    })
});

module.exports = router;

