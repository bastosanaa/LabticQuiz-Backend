const { Answer:AnswerModel } = require('../models/Answer.js')

const answerController = {

    create: async(req,res) => {
        
        const quiz_id = req.body.quiz_id
        const student_id = req.user        
        const question_answer = req.body.question_answer

        const answer = {
            quiz_id: quiz_id,
            student_id: student_id,
            question_answer: question_answer
        }

        const response = await AnswerModel.create(answer)

        return res.status(200).json(response)

    },
    
}

module.exports = answerController