const { studentsSubjects: StudentsSubjectsModel } = require("../models/StudentsSubjects")

const studentsSubjectsController = {

    create: async(req,res) => {
        try {
            const user_role = req.role
            if (user_role !== "administrador") {
                res.status(401).json({msg : "Acesso negado"})
            }
            //VERIFICAR SE A DISCIPLINA E O USUARIO EXISTEM
            const studentsSubjects = {
                user_id: req.body.user_id,
                subject_id: req.body.subject_id,
                subject_name: req.body.subject_name
            };

            const response = await StudentsSubjectsModel.create(studentsSubjects);
            res.status(201).json({response, msg: "Aluno matriculado na disciplina!"})
        } catch (error) {
            console.log(error);
        }
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
        try {
            const studentID = req.user
            const subjects = await StudentsSubjectsModel.find({user_id: studentID})
            res.json(subjects)
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(req, res) => {
        console.log("chegou no back")
        try {
            const user_role = req.role
            if (user_role !== "administrador") {
                res.status(401).json({msg : "Acesso negado"})
            }

            const id = req.body.id
            console.log(id)

            const studentsSubjects = await StudentsSubjectsModel.deleteMany({subject_id: id})

            if(!studentsSubjects) {
                res.status(404).json({ msg: "Matricula não encontrada nessa disciplina"})
                return;
            }

            // const deletedstudentsSubjects = await SubjectModel.findByIdAndDelete(id)
            
            res.status(200).json({ studentsSubjects, msg: "Disciplina excluída com sucesso"})

        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        const studentsSubjects = {
            user_id: req.body.user_id,
            subject_id: req.body.subject_id,
            subject_name: req.body.subject_name
        };

        const id = req.params.id

        const updatedstudentsSubjects = await SubjectModel.findByIdAndUpdate(id, subject);

        if(!updatedstudentsSubjects) {
            res.status(404).json({ msg: "Usuário não encontrado."})
            return;
        }

        res.status(200).json({studentsSubjects, msg: "Usuário atualizado com sucesso"})
    }
}

module.exports = studentsSubjectsController