const mongoose = require("mongoose")

const { Schema } = mongoose

const userSchema = new Schema({

    registration: {
        type:Number,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required: true
    },
},
{timestamps: true}
);

const User = mongoose.model("users", userSchema);

module.exports = {
    User,
    userSchema,
};