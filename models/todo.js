const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    phone:{
        type:String,
        required: true
    }
});

const todo =mongoose.model('todo',todoSchema);

module.exports = todo;