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
        default: null
    },
    //quiz = nova entidade
    quizzes: [{
        quiz_id: {
            type: ObjectId,
            ref: "Quiz",
            default: null

        },
        description: {
            type: String,
            default: null
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