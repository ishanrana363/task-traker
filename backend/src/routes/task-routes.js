const express = require("express");
const router = express.Router();
const taskRouter = router;
const taskController = require("../controllers/task-controllers");
const apiEnpoint = require("../utility/api-enpoints");
let taskEndPoint = apiEnpoint.task;
const authMiddleware = require("../middlewares/authMiddleware");

// Task Routes

taskRouter.post(taskEndPoint.task,authMiddleware.isValidUser,taskController.createTask);
taskRouter.put(taskEndPoint.task,authMiddleware.isValidUser,taskController.updateTask);
taskRouter.delete(taskEndPoint.task,authMiddleware.isValidUser,taskController.deleteTask);
taskRouter.get(taskEndPoint.task,authMiddleware.isValidUser,taskController.singleTask);
// taskRouter.get(taskEndPoint.allTask ,taskController.allTaskDataUser);
taskRouter.get(taskEndPoint.allTask , authMiddleware.isValidUser,taskController.allTaskData);
taskRouter.get(taskEndPoint.search , authMiddleware.isValidUser,taskController.taskSearch);



module.exports = taskRouter