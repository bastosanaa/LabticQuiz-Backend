const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')

async function main() {

    try {
        mongoose.set("strictQuery", true)

        const uri = "mongodb://0.0.0.0:27017/Quiz";
        await mongoose.connect(uri)

        console.log("conectado ao banco");

    } catch (error) {
        console.log(error);
    }

}

module.exports = main
