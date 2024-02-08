 const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const SendEmailUtility = require("../helper/emailHelper");
let otpModel = require("../models/otpModel")
exports.signIn = async (req,res) =>{
    try {
        let email = req.body.email;
        let password = req.body.password;
        let filter = {
            email : email,
            password : password
        }
        let resp = await userModel.findOne(filter);
        let authToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60*24),
            data: {
                email : resp.email,
                role : resp.role
            }
        }, process.env.AUTH_KEY);
        await userModel.findOneAndUpdate(filter,{authToken:authToken});
        res.status(201).json({
            status:"success",
            data : authToken
        })

    } catch (error) {
        res.status(404).send({
            status:"fail",
            msg : " User Not Found "
        })
    }
};

exports.signOut = async (req,res)=>{
    try {
        let authValue = req.headers.authorization;
        let authToken = authValue.split(' ')[1];
        let verifyToken = jwt.verify(authToken,process.env.AUTH_KEY);
        let filter = { email : verifyToken.data.email };
        await userModel.findOneAndUpdate(filter,{authToken:""});
        delete req.headers.authorization;
        res.status(200).send({
            status:"success",
            msg : " user logout successfully"
        })
    } catch (error) {
        res.status(404).send({
            status:"fail",
            msg : " User token not found "
        })
    }
}

exports.recoveryVerifyEmail  = async(req,res)=>{
    try {
        let email = req.body.email;

        let otpCode = Math.floor(100000 + Math.random()* 900000);

        let emailSubject = "Task traker otp code";

        let emailText = ` Your otp code is ${otpCode} `;

        let filter = { email: email };

        let user = await userModel.findOne(filter);
        

        let jwtToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60),
            email : email
        }, process.env.AUTH_KEY);

        if(user){
            await SendEmailUtility(email,emailText,emailSubject);
            await otpModel.findOneAndUpdate({email},{$set:{otp:otpCode,token:jwtToken}},{upsert:true});
            res.status(201).json({
                status:"success",
                msg : " 6 digits otp has been send successfully ",
            })
        }else{
            res.status(404).send({
                status:"fail",
                msg : "user not found",
            })
        }        
    } catch (error) {
        res.status(404).send({
            status:"fail",
            msg : "user not found"
        })
    }
}

exports.otpValidity = async (req,res)=>{
    try {
        let otp = req.body.otp;
        let status = 0;
        let email = req.body.email;
        let statusUpdate = 1;
        
        let result = await otpModel.findOne({otp:otp,email:email,status:status});
        let decodeEmail = jwt.verify(result.token,process.env.AUTH_KEY);
        let userDecodeEmail = decodeEmail.email;
        if(result){
            await otpModel.findOneAndUpdate({email:userDecodeEmail,otp:otp,status:status},{status:statusUpdate});
            res.status(200).send({
                status:"success",
                msg : " Otp verification sucessfully "
            })
        }else{
            res.status(404).send({
                status:"fail",
                msg : "otp not found",
            })
        }
    } catch (error) {
        res.status(419).send({
            status:"fail",
            msg : "invalid otp",
        })
    }

}

exports.resetPassword = async (req, res) => {
    try {
        let statusUpdate = 1;
        let email = req.body.email;
        let otp = req.body.otp;
        let data = await otpModel.findOne({otp:otp,email:email,status:statusUpdate});
        let decodeEmail = jwt.verify(data.token,process.env.AUTH_KEY);
        let userDecodedEmail = decodeEmail.email;
        let newPassword = req.body.newPassword;
        let statusData = 0;
        let otpData = 0;
        await userModel.findOneAndUpdate({email:userDecodedEmail},{password:newPassword});
        await otpModel.findOneAndUpdate({email:userDecodedEmail},{status:statusData,otp:otpData});
        res.status(200).send({
            status:"success",
            msg : " User password change succcessfully "
        })
    }catch(e){
        res.status(419).send({
            status:"fail",
            msg : "invalid otp",
        })
    }

}
