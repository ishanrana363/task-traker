const task = {
    create : "/task",
    update : "/task/:id", 
    delete : "/task/:id",
    singleTask : "/task/:id",
    allTask : "/tasks"
}

const user = {
    create : "/user",
    update : "/user/:id", 
    delete : "/user/:id",
    singleUser : "/user/:id",
    allUser : "/users"
}

module.exports = {
    task,
    user
}