const { Subject: SubjectModel} = require("../models/Subject")

const subjectController = {

    create: async(req, res) => {
        try {
            const subject = {
                registration: req.body.registration,
                name: req.body.name,
                teacher_id : req.body.teacher_id
            };

            const response = await SubjectModel.create(subject);
            res.status(201).json({response, msg: "Disciplina criada com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async(req, res) => {
        try {
            const subjects = await SubjectModel.find().populate('teacher_id', "name");
            res.json(subjects);
        } catch (error) {
            console.log(error);
        }
    },
    get: async(req, res) => {
        try {
            
            const id = req.params.id
            const subject = await SubjectModel.findById(id)

            if(!subject) {
                res.status(404).json({ msg: "Disciplina não encontrada."})
                return;
            }

            res.json(subject)
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(req, res) => {
        try {
            
            const id = req.params.id

            const subject = await SubjectModel.findById(id)

            if(!subject) {
                res.status(404).json({ msg: "Disciplina não encontrada."})
                return;
            }

            const deletedSubject = await SubjectModel.findByIdAndDelete(id)
            
            res.status(200).json({ deletedSubject, msg: "Disciplina excluída com sucesso"})

        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        const subject = {
            registration: req.body.registration,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        
        const id = req.params.id

        const updatedSubject = await SubjectModel.findByIdAndUpdate(id, subject);

        if(!updatedSubject) {
            res.status(404).json({ msg: "Usuário não encontrado."})
            return;
        }

        res.status(200).json({subject, msg: "Usuário atualizado com sucesso"})
        
    }

}


module.exports = subjectController;