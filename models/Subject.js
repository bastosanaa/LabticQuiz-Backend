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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            default: null

        },
        description: {
            type: String,
            default: null
        },
        is_draft: {
            type: Boolean,
            default: null
        }

    }],
},
{timestamps: true}
);

subjectSchema.pre('deleteOne',{ document: true, query: false }, async function(next) {
    try {
        
        await mongoose.model('studentsSubjects').deleteMany({subject_id: this._id});
        next()
    } catch (error) {
        next(error)
    }
})

const Subject = mongoose.model("subjects", subjectSchema);

module.exports = {
    Subject,
    subjectSchema,
}