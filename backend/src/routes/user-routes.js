const express = require("express");
const router = express.Router();
const userRouter = router;
const apiEnpoints = require("../utility/api-enpoints");
const userController = require("../controllers/user-controllers");
const userEnpoint = apiEnpoints.user;

userRouter.post(userEnpoint.user,userController.createUser);
userRouter.put(userEnpoint.user,userController.updateUser)
userRouter.delete(userEnpoint.user,userController.deleteUser)
userRouter.get(userEnpoint.user,userController.singleUser)
userRouter.get(userEnpoint.allUser,userController.allUser)





module.exports =  userRouter