const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')

async function main() {

    try {
        mongoose.set("strictQuery", true)

        const uri = process.env.DB_CONN;
        await mongoose.connect(uri)

        console.log("conectado ao banco");

    } catch (error) {
        console.log(error);
    }

}

module.exports = main
