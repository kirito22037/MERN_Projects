const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');

const app= express();
app.use(cors());
const port= 5000;


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));


mongoose.connect('mongodb://localhost/gql_rai',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("the mongodb is connected");
});

app.listen(port,()=>{
    console.log("the server is active at "+port);
});