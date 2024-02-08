const task = {
    task : "/task",
    allTask : "/tasks",
    search:"/task/search"
}

const user = {
    user : "/user",
    allUser : "/users",
    search : "/search/users"
}
const auth = {
    signin : "/auth/signin",
    signout : "/auth/signout",
    otpVerify : "/auth/otp-verify",
    otpValidity : "/auth/otp-validity",
    resetPassword : "/auth/reset-password"
}

module.exports = {
    task,
    user,
    auth
}