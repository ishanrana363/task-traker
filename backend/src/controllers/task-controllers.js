
// Task create

exports.createTask = async (req,res) =>{
        res.send("Task Create")
}

// Task Update

exports.updateTask = async (req,res) =>{
    res.send("Task update")
}

// Task Delete

exports.deleteTask = async (req,res) =>{
    res.send("Task delete")
}

// Single Task

exports.singleTask = async (req,res) =>{
    res.send("single task find")
}

// All Task

exports.allTask = async (req,res) =>{
    res.send("all task find")
}