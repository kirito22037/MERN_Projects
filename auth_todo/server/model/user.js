const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : String,
    email : String,
    password : String,
    tasks : [{
        type : Schema.Types.ObjectId,
        ref : "task"
    }]
});

module.exports = mongoose.model('user', UserSchema);