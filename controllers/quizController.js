const { Quiz:QuizModel } = require('../models/Quiz.js')
const { Subject: SubjectModel } = require('../models/Subject.js')
const { Answer: AnswerModel } = require('../models/Answer.js')
const Errors = require("../constants/errorCodes.js")



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

        const subject = await SubjectModel.findById(subject_id)
        if (subject) {
            const response = await QuizModel.create(quiz)
            const data = (response)
    
            subject.quizzes.push({
                quiz_id: data._id,
                description: data.title,
                is_draft: is_draft
            })
            subject.save()        
            return res.status(200).json(response)
        } else {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)


        }


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
        let questions = req.body.questions

        console.log(questions);
        
        if (questions) {
            questions = shuffleAlternatives(questions)
        }

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

        const response = await QuizModel.findByIdAndUpdate(quiz_id, quiz)

        if (!response) {
            const {statusCode, errorCode, message} = Errors.QUIZ_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        // WIP 🚧
        await SubjectModel.updateOne({
            "quizzes.quiz_id": quiz_id
        },
        {
            $set: {
                "quizzes.$.description": title,
                "quizzes.$.is_draft": is_draft
            }
        },
        { new: true })        

        return res.status(200).json(response)
    },

    delete: async (req,res) => {        
        const quiz_id = req.params.id        

        const deletedQuiz = await QuizModel.findByIdAndDelete(quiz_id)

        if (!deletedQuiz) {
            const {statusCode, errorCode, message} = Errors.QUIZ_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        console.log('deleted',deletedQuiz.subject_id.toString());
        
        const subject_id = deletedQuiz.subject_id.toString()
        const sub = await SubjectModel.findById(subject_id);
        console.log("SUB" , sub);
        
        const answers = await AnswerModel.deleteMany({quiz_id:quiz_id})

        await SubjectModel.updateOne({
            _id: subject_id
        },
        {
            $pull: {
                quizzes: {quiz_id: quiz_id}
            }
        })
        
        return res.json(deletedQuiz)
    },

    get: async (req, res) => {
        const quiz_id = req.params.id        

        const quiz  = await QuizModel.findById(quiz_id).populate('subject_id', 'name')

        if (!quiz) {
            const {statusCode, errorCode, message} = Errors.QUIZ_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }
        res.json(quiz)
    },

    getAnswerKey:async (req,res) => {

        const quiz_id = req.params.id
        
        const quiz = await QuizModel.findById(quiz_id)

        if (!quiz) {
            const {statusCode, errorCode, message} = Errors.QUIZ_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const quiz_key = quiz.questions.map(question => {            
            const answer = question.alternatives.filter(alternative => alternative.correct === true)
            return {
                id: question._id,
                answer_id: answer[0]._id
            }

        })

        return res.status(200).json(quiz_key)
    },

    getAllBySubject: async(req, res) => {

        const subject_id = req.params.id;        
        
        const quizzes = await QuizModel.find({subject_id: subject_id}, 'title date_end type _id is_draft' )

        res.json(quizzes)
    },
    
    getAllPostedBySubject: async(req, res) => {

        const subject_id = req.params.id;        

        const quizzes = await QuizModel.find({subject_id: subject_id, is_draft:false}, 'title date_end type _id' )
        
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