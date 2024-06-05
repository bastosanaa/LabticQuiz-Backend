const mongoose = require("mongoose")

const { Schema } = mongoose

const subjectSchema = new Schema({

    name: {
        type:String,
        required: true
    },
    teacher_id: {
        type:String,
        // required: true
    },
    //quiz = nova entidade
    quizzes: {
        type: String
    },
},
{timestamps: true}
);

const Subject = mongoose.model("subjects", subjectSchema);

module.exports = {
    Subject,
    subjectSchema,
}