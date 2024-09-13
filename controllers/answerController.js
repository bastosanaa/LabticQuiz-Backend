const { Answer:AnswerModel } = require('../models/Answer.js')
const { Quiz: QuizModel } = require('../models/Quiz.js')

const answerController = {

    create: async(req,res) => {
        
        const quiz_id = req.body.quiz_id
        const student_id = req.user        
        const question_answer = req.body.question_answer
        let score = 0
        
        console.log("respostas do user", question_answer);
        

        const quiz = await QuizModel.findById(quiz_id)
        console.log("quizzz", quiz);

        question_answer.forEach(quizQuestion => {
            let question_id = quizQuestion.question_id            

            const questionFound = quiz.questions.find(question => String(question._id) === question_id)
            const correctAlt = questionFound.alternatives.find(alt => alt.correct)         
            
            if (String(correctAlt._id) === quizQuestion.alternative) {
                score++
            }
        })

        const answer = {
            quiz_id: quiz_id,
            student_id: student_id,
            question_answer: question_answer,
            score: score
        }

        const response = await AnswerModel.create(answer)




        return res.status(200).json(response)

    },
    get:async (req,res) => {

        const attempt_id = req.params.id

        const response = await AnswerModel.findById(attempt_id).populate('quiz_id', 'title subject_id').populate('student_id', 'name')  

        return res.status(200).json(response)
    },

    getStudentAttempts: async (req,res) => {

        const student_id = req.user
        const quiz_id = req.params.id

        const response = await AnswerModel.find({quiz_id: quiz_id, student_id:student_id})        

        return res.status(200).json(response)
    },

    getQuizAnswers: async (req,res) => {
        const quiz_id = req.params.id
        console.log(quiz_id);

        const response = await AnswerModel.find({quiz_id: quiz_id}).populate('student_id', 'name quiz_id')

        return res.status(200).json(response)
    }

}

module.exports = answerController