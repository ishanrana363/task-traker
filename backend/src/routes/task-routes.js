const express = require("express");
const router = express.Router();
const taskRouter = router;
const taskController = require("../controllers/task-controllers");
const apiEnpoint = require("../utility/api-enpoints");
let taskEndPoint = apiEnpoint.task;

// Task Routes

taskRouter.post(taskEndPoint.create ,taskController.createTask);
taskRouter.put(taskEndPoint.update,taskController.updateTask);
taskRouter.delete(taskEndPoint.delete,taskController.deleteTask);
taskRouter.get(taskEndPoint.singleTask,taskController.singleTask);
taskRouter.get(taskEndPoint.allTask,taskController.allTask);



module.exports = taskRouter