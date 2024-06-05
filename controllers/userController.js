const { User: UserModel } = require("../models/User");

const userController = {

    create: async(req, res) => {
        try {
            const user = {
                registration: req.body.registration,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            };

            const response = await UserModel.create(user);
            res.status(201).json({response, msg: "Serviço criado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async(req, res) => {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    },
    get: async(req, res) => {
        try {
            
            const id = req.params.id
            const user = await UserModel.findById(id)

            if(!user) {
                res.status(404).json({ msg: "Usuário não encontrado."})
                return;
            }

            res.json(user)
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(req, res) => {
        try {
            
            const id = req.params.id

            const user = await UserModel.findById(id)

            if(!user) {
                res.status(404).json({ msg: "Usuário não encontrado."})
                return;
            }

            const deletedUser = await UserModel.findByIdAndDelete(id)
            
            res.status(200).json({ deletedUser, msg: "Usuário excluído com sucesso"})

        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        const user = {
            registration: req.body.registration,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };
        
        const id = req.params.id

        const updatedUser = await UserModel.findByIdAndUpdate(id, user);

        if(!updatedUser) {
            res.status(404).json({ msg: "Usuário não encontrado."})
            return;
        }

        res.status(200).json({user, msg: "Usuário atualizado com sucesso"})

    }

}

module.exports = userController;

