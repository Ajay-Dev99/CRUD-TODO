const mongoose = require("mongoose")


const ToDoSchema = new mongoose.Schema({
    toDo:{
        type:String
    },

})

module.exports = new mongoose.model("todo",ToDoSchema)