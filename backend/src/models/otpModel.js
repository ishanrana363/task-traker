const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const otpSchema = new Schema({
    token : {
        type : String
    },
    email : {
        type : String
    },
    otp:{
        type : Number,
        required : true,
        unique : true
    },status:{
        type : String,
        default : 0
    }
},{versionKey:false,timestamps:true});

const otpModel = model("otps",otpSchema);

module.exports = otpModel;