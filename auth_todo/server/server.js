const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
app.use(cors());

//to support json data though req
app.use(bodyParser.json());
//to support urlencoded data though req
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use('/auth',authRoutes);
app.use('/todo',taskRoutes);

mongoose.connect('mongodb://localhost/todo_auth',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("the DB is connected");
    app.listen(port , ()=>{
        console.log("the server is active at ", port);
    });
})
.catch(err=>{
    console.log("error occured while connecting to DB");
    console.log(err);
});

