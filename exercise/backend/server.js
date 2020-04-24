const express = require('express');
const cors = require('cors');   //to make request of deferent domain
const mongoose = require('mongoose');
const bodyParser = require('body-parser');






const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());   //to process json files
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/exercise' , {useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true });
//--------study about connection---------
const connection = mongoose.connection;
connection.once('open' , ()=>{
    console.log("MongoDB database connected");
});


const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user');
app.use('/exercise' , exerciseRouter);
app.use('/users' , userRouter);

app.listen(port , ()=>{
    console.log(`the server is active at ${port}`);
});
