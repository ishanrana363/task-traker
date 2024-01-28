const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        validate: {
        validator: function (v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email !`,
    },
        required: [true, "User email required"],
    },
    password : {
        type : String,
        required : true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        validate: {
        validator: function (v) {
            return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
    },
        required: [true, "User phone number required"],
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    age: {
        type:Number
    },
    },
    { timestamps: true, versionKey: false }
);

// // Manually create the unique index for the email field
// userSchema.index({ email: 1 }, { unique: true });

const userModel = model("users", userSchema);

module.exports = userModel;
