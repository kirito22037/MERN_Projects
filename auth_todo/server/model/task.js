const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskData : String,
    status : Boolean,
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
});

module.exports = mongoose.model('task' , TaskSchema);