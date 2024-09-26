const mongoose = require("mongoose")

const { Schema } = mongoose

const userSchema = new Schema({

    registration: {
        type:String,
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

userSchema.pre('deleteOne',{ document: true, query: false }, async function(next) {
    try {        
        await mongoose.model('studentsSubjects').deleteMany({user_id: this._id});
        next()
    } catch (error) {
        next(error)
    }
})


const User = mongoose.model("users", userSchema);

module.exports = {
    User,
    userSchema,
};