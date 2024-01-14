const task = {
    create : "/task",
    update : "/task/:id", 
    delete : "/task/:email",
    singleTask : "/task/:id",
    allTask : "/tasks"
}

const user = {
    create : "/user",
    update : "/user", 
    delete : "/user",
    singleUser : "/user/:id",
    allUser : "/users"
}

module.exports = {
    task,
    user
}