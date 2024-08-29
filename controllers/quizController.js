const { Quiz:QuizModel } = require('../models/Quiz.js')
const AppError = require("../appError.js")
const Errors = require("../constants/errorCodes.js")
const checkPermission = require("../utils/checkPermission.js");


const quizController = {

    create: async(req,res) => {
        
        const title = req.body.title
        const subject_id = req.body.subject_id
        const time = req.body.time
        const attempts = req.body.attempts
        const dateStart = req.body.date_start
        const dateEnd = req.body.date_end
        const instructions = req.body.instructions
        const type = req.body.type
        const is_draft = req.body.is_draft
        const questions = req.body.questions

        const quiz = {
            subject_id: subject_id,
            title: title,
            time: time,
            attempts: attempts,
            date_start:dateStart,
            date_end: dateEnd,
            instructions: instructions,
            type: type,
            is_draft: is_draft,
            questions: questions
        }

        const response = await QuizModel.create(quiz)

        return res.status(200).json(response)

    },

    update: async(req,res) => {

        const quiz_id = req.params.id
        
        const title = req.body.title
        const subject_id = req.body.subject_id
        const time = req.body.time
        const attempts = req.body.attempts
        const dateStart = req.body.date_start
        const dateEnd = req.body.date_end
        const instructions = req.body.instructions
        const type = req.body.type
        const is_draft = req.body.is_draft
        const questions = req.body.questions

        const quiz = {
            subject_id: subject_id,
            title: title,
            time: time,
            attempts: attempts,
            date_start:dateStart,
            date_end: dateEnd,
            instructions: instructions,
            type: type,
            is_draft: is_draft,
            questions: questions
        }

        const response = await QuizModel.findByIdAndUpdate(quiz_id, quiz)

        return res.status(200).json(response)
    }

}

module.exports = quizController