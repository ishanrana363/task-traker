const express = require("express");
const authControllers = require("../controllers/auth-controllers");
const apiEndPoints = require("../utility/api-enpoints");
const authRouter = express.Router();
const authEndPoints = apiEndPoints.auth;
authRouter.post(authEndPoints.signin,authControllers.signIn);
authRouter.post(authEndPoints.signout,authControllers.signOut);
authRouter.post(authEndPoints.otpVerify,authControllers.recoveryVerifyEmail);
authRouter.post(authEndPoints.otpValidity,authControllers.otpValidity);
authRouter.post(authEndPoints.resetPassword,authControllers.resetPassword);



module.exports = authRouter;