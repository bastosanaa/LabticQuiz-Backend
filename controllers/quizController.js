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

        const quiz = {
            subject_id: subject_id,
            title: title,
            time: time,
            attempts: attempts,
            date_start:dateStart,
            date_end: dateEnd,
            instructions: instructions,
            type: type
        }

        const response = await QuizModel.create(quiz)

    }


}

