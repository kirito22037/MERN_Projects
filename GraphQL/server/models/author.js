const mongoose = require('mongoose');

const schema = mongoose.Schema;
const authSchema = new schema({
    name : String,
    age : Number
});

module.exports = mongoose.model('Author' , authSchema);