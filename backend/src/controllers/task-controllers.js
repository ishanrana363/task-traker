const taskModel = require("../models/tasks-model");
const {parseToken} = require("../utility/tokenHelper")
// Task create

exports.createTask = async (req,res) =>{
        try {
            let userData = parseToken(req);
            const taskData = {
                // ...req.body,
                title : req.body?.title,
                description : req.body?.description,
                status : req.body?.status,
                priority : req.body?.priority,
                assignee : req.body?.assignee,
                isDelete: false,
                createdBy : userData.email
            };
            const data = await taskModel.create(taskData);
            // const {isDelete,...resData} = data._doc
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
        const taskId = req.query.id;
        const updatedTaskData = req.body;
    
        const filter = { _id: taskId,isDelete:false };
        const update = updatedTaskData;
        const userData = parseToken(req);
    
        const taskData = await taskModel.findOne(filter);
    
        if (!taskData) res.status(404).send('Task not found.');
    
        if ((taskData.createdBy !== userData.email) && (userData.role !== 'admin')) {
            res.status(403).send('You do not have enough permission');
        } else {
            const resp = await taskModel.findOneAndUpdate(filter, update);
                res.send({
                msg: 'Task updated!',
                data: resp
            });
        }
    } catch (e) {
        res.status(500).send('Someting went wrong!');
    }
}

// Task Delete

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.query.id;
        const filter = { _id: taskId };
        const update = { isDelete: true };
        const userData = parseToken(req);
        const taskData = await taskModel.findOne(filter);
    
        if (!taskData) res.status(404).send('Task not found.');
        if ((taskData.createdBy !== userData.email) && (userData.role !== 'admin')) {
            res.status(403).send('You do not have enough permission');
        } else if (userData.role === 'admin') {
            const resp = await taskModel.findOneAndDelete(filter);
        res.send({
            msg: 'admin deleted!',
            data: resp
        });
        } else {
            if(taskData.isDelete){
                res.status(404).send({
                    status : "fail",
                    msg : "Task not found"
                })
            }else{
                const resp = await taskModel.updateOne(filter, update);
                res.send({
                msg: 'user deleted!',
                data: resp
            });
            }
        }
    } catch (e) {
        console.log("error is ",e)
        res.status(500).send('Something went wrong!');
    }
    
        

};


// Single Task

exports.singleTask = async (req,res) =>{
    try {
        let taskId = req.query.id;
        let userData = parseToken(req);
        let filter = {_id:taskId};
        let data =await taskModel.findOne(filter);
        if(!data){
            res.status(404).send({
                status:"fail",
                msg:"Task not found"
            })
        }
        if((data.createdBy!==userData.email) && ( userData.role !=="role")){
            res.status(403).send({
                status:"Fail",
                msg : " You do not have enough permission "
            })
        }else if((data.isDelete==false) && ( (data.createdBy===userData.email) ) ){
            let data = await taskModel.findOne(filter);
            res.status(403).send({
                status:"User data find",
                msg : data
            })
        }else if(( userData.role ==="admin") && (( data.isDelete===true )|| (data.isDelete===false) ) ){
            let data = await taskModel.findOne(filter);
            res.status(403).send({
                status:"Admin data find",
                msg : data
            })
        }else{
            res.status(404).send({
                status:"Fail",
                msg:"Task not found"
            })
        }

        
    }catch (e) {
        console.log(`error is ${e}`)
        res.status(500).send('Something went worng!');
    }
}




// All Task 


exports.allTaskData = async (req, res) => {
    try {
        let userData = parseToken(req)
        let filter = {}
        if(userData.role!=="admin"){
            filter.isDelete = false,
            filter.createdBy = userData.email
        }
        let data = await taskModel.find(filter);
        res.status(404).send({
            status:"success",
            data : data
        });
        
    } catch (e) {
        console.log("error is ",e)
        res.status(404).send('Tasks not found.');
    }
}

exports.taskSearch = async (req, res) => {
    try {
        let keyword = '';
        if (req.query.keyword) keyword = decodeURI(req.query.keyword);
        
    
        const filter = {};
        const userData = parseToken(req);
    
        if (userData.role !== 'admin') {
          filter.createdBy = userData.email;
          filter.isDeleted = false;
        }
    
        if(req.query.keyword===keyword){
            let resp = await taskModel.find(filter);
        resp = resp.filter(task => task.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
    
        res.send({
          msg: 'Searched tasks',
          data: resp
        });
        }else{
            res.status(404).send({
                status:"fail",
                msg:"data not found"
            })
        }
      } catch (e) {
        res.status(500).send('Something went wrong!');
      }
};


// all task for user

// exports.allTaskDataUser = async (req, res) => {
//     try {
//         let filter = { isDelete: false, createdBy : req.query.createdBy };
//         let data = await taskModel.find(filter);

//         // Check if data is an array and not empty
//         const resData = Array.isArray(data) && data.length > 0
//             ? data.map(doc => {
//                 const taskObject = doc.toObject();
//                 delete taskObject.isDelete;
//                 return taskObject;
//             })
//             : [];

//         res.send({
//             status: "success",
//             data: resData
//         });
//     } catch (e) {
//         console.log("error is ",e)
//         res.status(404).send('Tasks not found.');
//     }
// }



// Check if data is an array and not empty
// const resData = Array.isArray(data) && data.length > 0
// ? data.map(doc => {
//     const taskObject = doc.toObject();
//     delete taskObject.isDelete;
//     return taskObject;
// })
// : [];

// res.send({
// status: "success",
// data: resData
// });








// const {isDelete,...resData} = data._doc
//         res.send({
//             status: "success",
//             data: resData
//         });