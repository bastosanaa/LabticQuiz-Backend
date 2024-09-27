const { MongoClient } = require('mongodb')
require('dotenv').config()
const mongoose = require('mongoose')

async function main() {

    try {
        mongoose.set("strictQuery", true)

        // const uri = process.env.DB_CONN;
        const uri = 'mongodb://127.0.0.1:27017/Quiz'
        await mongoose.connect(uri)

        console.log("conectado ao banco");

    } catch (error) {
        console.log(error);
    }

}

module.exports = main
