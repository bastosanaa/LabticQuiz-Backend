const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const { Schema } = mongoose

const subjectSchema = new Schema({

    name: {
        type:String,
        required: true
    },
    teacher_id: {
        type:ObjectId,
        ref: "users",
        required: true
    },
    //quiz = nova entidade
    quizzes: [{
        quiz_id: {
            type: ObjectId,
            ref: "Quiz"
        },
        description: {
            type: String
        }

    }],
},
{timestamps: true}
);

const Subject = mongoose.model("subjects", subjectSchema);

module.exports = {
    Subject,
    subjectSchema,
}