const mongoose = require("mongoose")

const { Schema } = mongoose

const answerSchema = new Schema ({


    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    score: {
        type: Number,
        default: null
    },
    question_answer: [{
        question_id: {
            type: mongoose.Schema.Types.ObjectId
        },
        alternative: {
            type: mongoose.Schema.Types.ObjectId
        }
        
    }]
})

const Answer = mongoose.model('answers', answerSchema )

module.exports = {
    Answer,
    answerSchema
}