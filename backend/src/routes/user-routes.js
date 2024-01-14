const express = require("express");
const router = express.Router();
const userRouter = router;
const apiEnpoints = require("../utility/api-enpoints");
const userController = require("../controllers/user-controllers");
const userEnpoint = apiEnpoints.user;

userRouter.post(userEnpoint.create,userController.createUser);
userRouter.put(userEnpoint.update,userController.updateUser)
userRouter.delete(userEnpoint.delete,userController.deleteUser)
userRouter.get(userEnpoint.singleUser,userController.singleUser)
userRouter.get(userEnpoint.allUser,userController.allUser)





module.exports =  userRouter