const { studentsSubjects: StudentsSubjectsModel } = require("../models/StudentsSubjects")
const AppError = require("../appError.js")
const Errors = require("../constants/errorCodes.js")

const studentsSubjectsController = {

    create: async(req,res) => {

        const user_role = req.role
        if (!user_role) {
            const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.NOT_PROVIDED
            throw new AppError(statusCode, errorCode, message)
        }
        if (user_role !== "administrador") {

            const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.FORBIDDEN_ACCESS
            throw new AppError(statusCode, errorCode, message)
        }
        //VERIFICAR SE A DISCIPLINA E O USUARIO EXISTEM
        const studentsSubjects = {
            user_id: req.body.user_id,
            subject_id: req.body.subject_id,
            subject_name: req.body.subject_name
        };

        const response = await StudentsSubjectsModel.create(studentsSubjects);
        return res.status(201).json({response, msg: "Aluno matriculado na disciplina!", success : true})

    },
    // getStudentsBySubject: async (req, res) => {
    //     try {
    //         const subjectID = req.params.id

    //         const students = await StudentsSubjectsModel.find({subject_id: subjectID})
            
    //         if(!students) {
    //             res.status(404).json({ msg: "Nenhum aluno matriculado nesta disciplina."})
    //             return;
    //         }

    //         res.json(students)

    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    getSubjectsByStudent: async (req, res) => {
            const studentID = req.user
            const subjects = await StudentsSubjectsModel.find({user_id: studentID})
            if(!subjects) {
                const {statusCode, errorCode, message} = Errors.RELATION_ERROR.DOESNT_EXIST
                throw new AppError(statusCode, errorCode, message)
            }
            res.json(subjects)
    },
    delete: async(req, res) => {
        const user_role = req.role
        if (!user_role) {
            const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.NOT_PROVIDED
            throw new AppError(statusCode, errorCode, message)
        }
        if (user_role !== "administrador") {
            const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.FORBIDDEN_ACCESS
            throw new AppError(statusCode, errorCode, message)
        }

        const id = req.body.id
        console.log(id)

        const studentsSubjects = await StudentsSubjectsModel.deleteMany({subject_id: id})

        if(!studentsSubjects) {
            const {statusCode, errorCode, message} = Errors.RELATION_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }
        
        res.status(200).json({ studentsSubjects, msg: "Disciplina excluída com sucesso"})

    },
    update: async (req, res) => {

        const user_role = req.role
        if (!user_role) {
            const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.NOT_PROVIDED
            throw new AppError(statusCode, errorCode, message)
        }
        if (user_role !== "administrador") {
            const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.FORBIDDEN_ACCESS
            throw new AppError(statusCode, errorCode, message)
        }
        const studentsSubjects = {
            user_id: req.body.user_id,
            subject_id: req.body.subject_id,
            subject_name: req.body.subject_name
        };

        const id = req.params.id

        const updatedstudentsSubjects = await SubjectModel.findByIdAndUpdate(id, subject);

        if(!updatedstudentsSubjects) {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        res.status(200).json({studentsSubjects, msg: "Usuário atualizado com sucesso"})
    }
}

module.exports = studentsSubjectsController