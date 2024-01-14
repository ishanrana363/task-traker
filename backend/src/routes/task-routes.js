const express = require("express");
const router = express.Router();
const taskRouter = router;
const taskController = require("../controllers/task-controllers");
const apiEnpoint = require("../utility/api-enpoints");
let taskEndPoint = apiEnpoint.task;

// Task Routes

taskRouter.post(taskEndPoint.task,taskController.createTask);
taskRouter.put(taskEndPoint.task,taskController.updateTask);
taskRouter.delete(taskEndPoint.task,taskController.deleteTask);
taskRouter.get(taskEndPoint.task,taskController.singleTask);
taskRouter.get(taskEndPoint.allTask,taskController.allTask);



module.exports = taskRouter