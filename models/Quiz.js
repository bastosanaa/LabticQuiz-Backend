const mongoose = require ("mongoose")

const { Schema } = mongoose

const questionSchema = new Schema ({

})

const quizSchema = new Schema({
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required:true,
    },
    title: {
        type: String,
        required:true
    },
    time: {
        type: Number,
        required: 'true'
    },
    attempts: {
        type: Number,
        required: 'true',
        default: 999
    },
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Number,
        required: true
    },
    instructions: {
        type:String,
    },
    type: {
        type:String,
    },
    show_answer: {
        type: Boolean,
        default: true
    },
    questions: [{
        title: {
            type: String,
            required:true
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
