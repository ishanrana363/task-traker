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
    try{
        const userEmail = req.query.email;
        let reqBoyd = req.body;
        const filter = {email:userEmail}
        const updateData = reqBoyd;
        let data = await userModel.updateOne(filter,updateData,{new:true})
        res.status(200).json({
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

// Task Delete

exports.deleteUser = async (req,res) =>{
    try {
        const userEmail = req.query.email;
        console.log(userEmail)
        const filter = {email:userEmail}
        const data = await userModel.deleteOne(filter);
        res.status(200).json({
            status:"success",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            data : e.toString()
        })
    }

}

// Single Task

exports.singleUser = async (req,res) =>{
    try {
        const userEmail = req.query.email;
        const filter = { email : userEmail }
        const data =  await userModel.findOne(filter)
        res.status(200).json({
            status:"success",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            data : e.toString()
        })
    }
}

// All Task

exports.allUser = async (req,res) =>{
    try {
        const data = await userModel.find();
        res.status(200).json({
            status:"success",
            data : data
        })

    } catch (error) {
        res.status(500).json({
            status:"fail",
            data : e.toString()
        })
    }
}