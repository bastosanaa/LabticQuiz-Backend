const { studentsSubjects: StudentsSubjectsModel } = require("../models/StudentsSubjects")
const { User: UserModel } = require("../models/User");
const { Subject: SubjectModel } = require("../models/Subject");
const checkPermission = require("../utils/checkPermission.js");
const AppError = require("../appError.js")
const Errors = require("../constants/errorCodes.js")

const studentsSubjectsController = {

    create: async(req,res) => {

        const user_role = req.role
        
        checkPermission(user_role)

        //Check if user AND subject exists before creating relation
        const user_id = req.body.user_id
        
        const user = await UserModel.findById(user_id)
        if (!user) {
            const {statusCode, errorCode, message} = Errors.USER_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const subject_id = req.body.subject_id
        
        const subject = await SubjectModel.findById(subject_id, "name")
        if (!subject) {
            const {statusCode, errorCode, message} = Errors.SUBJECT_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const studentsSubjects = {
            user_id: user_id,
            subject_id: subject_id,
            subject_name: subject.name
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
            const studentID = req.params.id
            console.log(studentID);
            
            const subjects = await StudentsSubjectsModel.find({user_id: studentID}, "-user_id -_id")
            if(!subjects) {
                const {statusCode, errorCode, message} = Errors.RELATION_ERROR.DOESNT_EXIST
                throw new AppError(statusCode, errorCode, message)
            }

            console.log(subjects);
            
            res.json(subjects)

    },
    deleteOne: async(req, res) => {
        const user_role = req.role
        checkPermission(user_role)

        const user_id = req.body.user_id
        const subject_id = req.body.subject_id     

        const studentsSubjects = await StudentsSubjectsModel.findOneAndDelete({subject_id, user_id})

        if(!studentsSubjects) {
            const {statusCode, errorCode, message} = Errors.RELATION_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }
        
        res.status(200).json({ studentsSubjects, msg: "Disciplina excluída com sucesso"})

    },

    update: async (req, res) => {

        const user_role = req.role
        checkPermission(user_role)

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