const { Subject: SubjectModel} = require("../models/Subject")
const { Quiz: QuizModel, Quiz } = require("../models/Quiz.js")
const { Answer: AnswerModel } = require("../models/Answer.js")
const AppError = require("../appError.js")
const Errors = require("../constants/errorCodes.js")
const checkPermission = require("../utils/checkPermission.js")


const subjectController = {

    create: async(req, res) => {

        const user_role = req.role

        checkPermission(user_role)
        
        const subject = {
            name: req.body.name,
            teacher_id : req.body.teacher_id,
            quizzes: []
        };

        const subject_registared = await SubjectModel.findOne({'name' : subject.name})
        if (subject_registared) {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.ALREADY_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const response = await SubjectModel.create(subject);
        res.status(201).json({response, msg: "Disciplina criada com sucesso!"});
    },
    
    getAll: async(req, res) => {

        const subjects = await SubjectModel.find().populate('teacher_id', "name");
        if (!subjects) {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }
        res.json(subjects);

    },
    get: async(req, res) => {        

        const id = req.params.id
        
        const subject = await SubjectModel.findById(id)

        if(!subject) {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }
        console.log(subject);
        res.json({subject_name: subject.name, subject_teacher: subject.teacher_id})

    },
    getAllWithoutTeacher: async(req, res) => {
        
        const subjects = await SubjectModel.find({'teacher_id': null});
        console.log(subjects);
        
        // if (subjects.length === 0 ) {
        //     const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
        //     throw new AppError(statusCode, errorCode, message)
        // }
        res.json(subjects);

    },

    getByTeacher: async(req, res) => {
        
        const teacher_id = req.params.id

        const subjects = await SubjectModel.find({'teacher_id': teacher_id});
        console.log(subjects);
        
        // if (subjects.length === 0 ) {
        //     const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
        //     throw new AppError(statusCode, errorCode, message)
        // }
        res.json(subjects);

    },


    delete: async(req, res) => {

        const user_role = req.role
        checkPermission(user_role)

        const id = req.body.id

        const subject = await SubjectModel.findById(id)

        if(!subject) {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const quizzes = subject.quizzes.map(quiz => (quiz.quiz_id))
        console.log("QUIZZESSSSSS", quizzes);
        
        for (const quiz of quizzes) {
            console.log(quiz);
            
            await AnswerModel.deleteMany({quiz_id: quiz})
        }

        await QuizModel.deleteMany({subject_id: id})

        await subject.deleteOne({_id: id})


        
        res.status(200).json({subject,  msg: "Disciplina excluída com sucesso"})

    },
    update: async (req, res) => {
        

        const user_role = req.role
        checkPermission(user_role)

        const subject = {
            name: req.body.name,
            teacher_id: req.body.teacher_id
        };
        if (subject.teacher_id == '') {
            subject.teacher_id = null
        }
        const id = req.params.id

        const updatedSubject = await SubjectModel.findByIdAndUpdate(id, subject);

        if(!updatedSubject) {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        res.status(200).json({subject, msg: "Usuário atualizado com sucesso"})
        
    },

    updateTeacherToNull: async (req, res) => {
        

        const user_role = req.role
        checkPermission(user_role)

        const teacher_id = req.body.teacher_id
        console.log(teacher_id);
        

        const subjects = await SubjectModel.find({teacher_id:teacher_id});

        if(!subjects) {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const updatedSubjects = await SubjectModel.updateMany({ teacher_id:teacher_id, }, {
            $set: { teacher_id: null }
        })

        res.status(200).json({updatedSubjects, msg: "Usuário atualizado com sucesso"})
        
    },


}
module.exports = subjectController;