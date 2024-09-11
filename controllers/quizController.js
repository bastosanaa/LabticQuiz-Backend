const { Quiz:QuizModel } = require('../models/Quiz.js')
const { Subject: SubjectModel } = require('../models/Subject.js')
const { Answer: AnswerModel } = require('../models/Answer.js')
const AppError = require("../appError.js")
const Errors = require("../constants/errorCodes.js")
const checkPermission = require("../utils/checkPermission.js");
const { response } = require('express');


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
            questions: questions,
        }

        const response = await QuizModel.create(quiz)

        const data = (response)

        const subject = await SubjectModel.findById(subject_id)
        subject.quizzes.push({
            quiz_id: data._id,
            description: data.title
        })
        subject.save()        

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
            questions: shuffleAlternatives(questions),
        }

        const response = await QuizModel.findByIdAndUpdate(quiz_id, quiz)        

        return res.status(200).json(response)
    },

    delete: async (req,res) => {
        console.log('aaa');
        
        const quiz_id = req.params.id

        console.log("chegou aq no delete", quiz_id);
        
        const deletedQuiz = await QuizModel.findByIdAndDelete(quiz_id)

        const answers = await AnswerModel.find({quiz_id})
        answers.delete()

        return res.json(deletedQuiz)
    },

    get: async (req, res) => {
        const quiz_id = req.params.id        

        const quiz  = await QuizModel.findById(quiz_id).populate('subject_id', 'name')

        //fazer tratamento de erro para quiz inexistent

        res.json(quiz)
    },

    getAllBySubject: async(req, res) => {

        const subject_id = req.params.id;        
        
        const quizzes = await QuizModel.find({subject_id: subject_id}, 'title date_end type _id is_draft' )

        res.json(quizzes)
    },
    

}

function shuffleAlternatives(questions) {
    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    return questions.map(question => {
        return {
            ...question,
            alternatives: shuffleArray(question.alternatives)
        };
    });
}

module.exports = quizController