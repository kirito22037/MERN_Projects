//const router = require('./routes/authRote');
const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRouter');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header
const cors = require("cors");



//--config for passport-google------------------
passport.serializeUser((user , done)=>{
    done(null , user);
});

passport.deserializeUser((user , done)=>{
    done(null , user);
});


passport.use(
    new GoogleStrategy({
        callbackURL : '/auth/google/redirect',
        clientID :  '', 
        clientSecret: ''
    } , 
    (accessToken , refreshToken , profile , done)=>{
      console.log(profile);  
      //console.log(JSON.stringify(profile));
        //user = {...profile};
        return done(null ,profile);
    })
);


const app = express();
const port = process.env.PORT || 5000;


//-----setting up cookie-----------------
app.use(
    cookieSession({
      name: "session",
      keys: ["iamthekey"],
      maxAge: 24 * 60 * 60 * 100
    })
  );
  
// parse cookies
app.use(cookieParser());

//--config for gooogle auth
//initialize passport
app.use(passport.initialize());
app.use(passport.session());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// set up cors to allow us to accept requests from our client
app.use(
    cors({
      origin: 'http://localhost:3000', // allow to server to accept request from different origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true // allow session cookie from browser to pass through
    })
  );


//----------------URLS---------------------
app.use('/auth' , authRoutes);
app.get('/api/eg' ,(req,res)=>{

    res.json({
        name : "roshan",
        age : 19,
        hoppy : "developent"
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));