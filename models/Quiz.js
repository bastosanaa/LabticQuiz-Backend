const mongoose = require ("mongoose")

const { Schema } = mongoose

const questionSchema = new Schema ({

})

const quizSchema = new Schema({
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    attempts: {
        type: Number,
        default: 999
    },
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Date,
        required: true
    },
    instructions: {
        type:String,
        required: true
    },
    type: {
        type:String,
        required: true
    },
    show_answer: {
        type: Boolean,
        default: true
    },
    is_draft: {
        type: Boolean,
        required: true
    },
    questions: [{
        title: {
            type: String,
        },
        alternatives: [
            {   
                correct: {
                    type: Boolean
                },
                
                content: {
                    type:String
                }

            }
        ]
    }]
});

const Quiz = mongoose.model('quizzes', quizSchema);

module.exports = {
    Quiz,
    quizSchema
}

