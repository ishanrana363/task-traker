const mongoose = require('mongoose');

require("dotenv").config()
const db = process.env.DB
async function connectionDB() {
    const connectionString = db
    await mongoose.connect(connectionString);
    console.log(`DB is connected `)
}


module.exports = connectionDB

// const mongodb = require("mongodb");
// const { MongoClient } = mongodb;


// const databaseName = "task-traker";

// const uri = `mongodb+srv://test-user:test-1234@cluster0.t4eowrb.mongodb.net/`;

// const client = new MongoClient(uri);

// client.connect()
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch(err => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// const db = client.db(databaseName);

// module.exports = db;

