const mongoose = require('mongoose');

require("dotenv").config()
const db = process.env.DB
async function connectionDB() {
    const connectionString = db
    await mongoose.connect(connectionString);
    console.log(`DB is connected `)
}


module.exports = connectionDB