const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName : { type : String , required : true },
    productPrice : { type : Number , required : true },
    productBrand : { type : String , required : true },
    imageUrl : { type : String , required : true },
    description : { type : String , required : true },
    trader : { type : Schema.Types.ObjectId ,
               ref : "User" }
});

module.exports = mongoose.model("Product" , productSchema );