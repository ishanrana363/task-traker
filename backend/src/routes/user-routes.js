const express = require("express");
const router = express.Router();
const userRouter = router;
const apiEnpoints = require("../utility/api-enpoints");
const userController = require("../controllers/user-controllers");
const authMiddleware = require("../middlewares/authMiddleware");
const userEnpoint = apiEnpoints.user;

userRouter.post(userEnpoint.user,userController.createUser);
userRouter.put(userEnpoint.user,authMiddleware.isValidUser,userController.updateUser);
userRouter.delete(userEnpoint.user,authMiddleware.isValidUser,userController.deleteUser);
userRouter.get(userEnpoint.user,authMiddleware.isAdmin,userController.singleUser);
userRouter.get(userEnpoint.allUser,authMiddleware.isAdmin,userController.allUserData);
userRouter.get(userEnpoint.search,authMiddleware.isAdmin,userController.searchUser);




module.exports =  userRouter