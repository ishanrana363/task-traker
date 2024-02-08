const mongoose =  require("mongoose");

const {Schema,model} = mongoose

const taskSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique:true,
    },
    description : {
        type : String
    },
    status : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        required : true
    },
    assignee : {
        type : String
    },
    isDelete : {
        type :Boolean,
        required : true
    },
    createdBy : {
        type : String,
        required : true
    },
    
},{timestamps:true,versionKey:false})


const taskModel = model("tasks",taskSchema)

module.exports = taskModel