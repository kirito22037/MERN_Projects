const router =require('express').Router();
const User = require('../models/user');




//to get a list of all users
router.get('/' ,(req,res)=>{
    //get a list of all username
    User.find()
     .then(users=>res.json(users))
     .catch(err => res.status(400).json('Error : '+err))
});



//to add a new user
router.post('/add' , (req,res)=>{
    const username = req.body.username;

    const newUser = new User({username});
    newUser.save()
     .then(()=> res.json('User added!'))
     .catch((err)=> res.status(400).json('Error : '+err));
});

module.exports = router;