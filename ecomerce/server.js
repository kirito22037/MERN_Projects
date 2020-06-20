const express= require('express')
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
//const dummyData = require('./data');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/prodctRoutes');

const PORT = 5000;
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors());
app.use('/src' , express.static(path.join(__dirname , 'src' ) ) );


//routes for user
app.use('/user' , userRoutes);
app.use('/product' , productRoutes);


//---connect mongodb-----
mongoose.connect(process.env.DB_URI , ()=>{
    console.log("the database is connected");
});


app.listen(PORT , ()=>{
    console.log("the server is active " , PORT);
});
