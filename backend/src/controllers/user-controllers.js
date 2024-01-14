// const db = require("../../db")

const userModel = require("../models/user-model")

// User create

exports.createUser = async (req,res) =>{
    let reqBoyd = req.body;
    try{
        let data = await userModel.create(reqBoyd)
        res.status(201).json({
            status:"success",
            data : data
        })
    }catch(e){
        res.status(500).json({
            status:"fail",
            data : e.toString()
        })
    }

}

// Task Update

exports.updateUser = async (req,res) =>{
res.send(" update user ")
}

// Task Delete

exports.deleteUser = async (req,res) =>{
res.send("delete user ")
}

// Single Task

exports.singleUser = async (req,res) =>{
res.send("single user find")
}

// All Task

exports.allUser = async (req,res) =>{
res.send("all user find")
}