const taskModel = require("../models/tasks-model")
const mongoose = require("mongoose");
// Task create

exports.createTask = async (req,res) =>{
        try {
            const taskData = {
                // ...req.body,
                title : req.body?.title,
                description : req.body?.description,
                status : req.body?.status,
                priority : req.body?.priority,
                assignee : req.body?.assignee,
                isDelete: false,
                createdBy : "ishanrana094@gamil.com"
            }
            const data = await taskModel.create(taskData);
            const {isDelete,...resData} = data._doc
            res.status(201).json({
                status:'success',
                data : resData
            })
        }catch (e) {
            res.status(500).json({
                status:"fail",
                data : e.toString()
            })
        }
}

// Task Update

exports.updateTask = async (req,res) =>{
    try {
        const userId = req.query.id;
        const reqBody = req.body;
        const updateData = reqBody;
        const filter = { _id : userId };
        const data = await taskModel.updateOne(filter,updateData);
        res.status(200).json({
            status: "success",
            data : data
        });
    }catch (e) {
        res.status(500).json({
            status:"fail",
            data : e.toString()
        });
    }
}

// Task Delete

exports.deleteTask = async (req, res) => {
    const taskId = req.query.id;
    const filter = { _id: taskId };
    const update = { isDelete: true };

    try {
        const data = await taskModel.updateOne(filter, update);
        res.send({
            msg: 'Task deleted!',
            data: data
        });
    } catch (e) {
        res.status(500).send('Something went wrong!');
    }

};


// Single Task

exports.singleTask = async (req,res) =>{
    try {
        let taskId =  req.query.id;
        let filter = { _id : taskId };
        let data = await taskModel.findOne(filter);
        const {isDelete,...resData} = data._doc

        if (data.isDelete) throw new Error();
        res.send({
            status: "success",
            data: resData
        });
    }catch (e) {
        res.status(500).send('Something went wrong!');
    }
}

// All Task


exports.allTask = async (req, res) => {
    try {
        let filter = { isDelete: false };
        let data = await taskModel.find(filter);

        // Check if data is an array and not empty
        const resData = Array.isArray(data) && data.length > 0
            ? data.map(doc => {
                const taskObject = doc.toObject();
                delete taskObject.isDelete;
                return taskObject;
            })
            : [];

        res.send({
            status: "success",
            data: resData
        });
    } catch (e) {
        res.status(500).send('Something went wrong!');
    }
}









// exports.allTask = async (req, res) => {
//     try {
//         // Extract user_id from query parameters
//         const user_id = new mongoose.Types.ObjectId(req.query.id);
//
//         // Log the extracted user_id
//         console.log(user_id);
//
//         // Define the match stage for the aggregation pipeline
//         const matchStage = { $match: { _id: user_id } };
//
//         // Log the match stage
//         console.log(matchStage);
//
//         // Define the joinWithUser stage for the aggregation pipeline
//         const joinWithUser = {
//             $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "userData" }
//         };
//
//         // Use aggregate to join tasks with user data
//         let data = await taskModel.aggregate([matchStage, joinWithUser]);
//
//         // Respond with a success status and the aggregated data
//         res.status(201).json({
//             status: 'success',
//             data: data
//         });
//     } catch (error) {
//         // Handle any errors that occur during the aggregation process
//         res.status(500).json({
//             status: "fail",
//             data: error.toString()
//         });
//     }
// };

// exports.allTask = async (req,res) =>{
//     try {
//         const id = req.params.id;
//         const data = await taskModel.find()
//         console.log(data)
//         res.status(200).json({
//              status: 'success',
//              data: data
//          });
//     }catch (e) {
//         res.status(500).json({
//              status: "fail",
//              data: e.toString()
//         });
//     }
// }

// exports.allTask = async (req,res) =>{
//     try {
//         const userId = req.query.id
//         const filter = { _id : userId };
//         let data =  await taskModel.findOne(filter)
//         res.status(200).json({
//               status: 'success',
//               data: data
//           });
//     }catch (e) {
//         res.status(500).json({
//               status: "fail",
//               data: e.toString()
//          });
//     }
// }
