const router = require('express').Router();
const passport = require('passport');

router.get('/login/google',passport.authenticate('google' , 
                                            { 
                                                scope: ['profile'] 
                                            }));

router.get('/google/redirect' ,passport.authenticate('google'), (req, res)=>{
    //res.send(req.user);   //req.user is cookie data
    res.redirect('http://localhost:3000/profile');
});

//when profile component is render 
router.get('/google/user' , (req , res)=>{
    if(req.user){
        res.json(req.user);
    }
    else
    {
        //throw new Error;
        res.json({
            err : "NO user is loged in"
        });  
    }
});

router.get('/logout' , (req, res)=>{
    req.logout();


    console.log("logout");
    res.redirect('//localhost:3000/');
});
module.exports = router;