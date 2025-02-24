const { MongoClient } = require('mongodb')
require('dotenv').config()
const mongoose = require('mongoose')

async function main() {

    try {
        mongoose.set("strictQuery", true)

        // const uri = process.env.DB_CONN;
        const uri = 'mongodb+srv://bastosanaa11:labtic123@labticcluster.mav3b.mongodb.net/?retryWrites=true&w=majority&appName=LabticCluster'
        await mongoose.connect(uri)

        console.log("conectado ao banco");

    } catch (error) {
        console.log(error);
    }

}

module.exports = main
