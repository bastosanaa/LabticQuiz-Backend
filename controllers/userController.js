const { User: UserModel, User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const checkToken = require("../middleware/checkToken");

const userController = {

    create: async(req, res) => {
        try {
            const user = {
                registration: req.body.registration,
                name: req.body.name,
                email: req.body.email,
                password: await hashPassword(req.body.password),
                role: req.body.role
            };

            const response = await UserModel.create(user);
            res.status(201).json({response, msg: "Usuário registrado com sucesso!"});
        } catch (error) {
            console.log(error);
        }
    },
    getAllTeachers: async(req, res) => {
        try {
            const users = await UserModel.find({ role: 'professor'}, "name");
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    },
    //utilizar token de autenticacao
    get: async(req, res) => {
        try {
            const id = req.user
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
            
            const id = req.user

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
        
        const id = req.user

        const updatedUser = await UserModel.findByIdAndUpdate(id, user);

        if(!updatedUser) {
            res.status(404).json({ msg: "Usuário não encontrado."})
            return;
        }

        res.status(200).json({user, msg: "Usuário atualizado com sucesso"})
    },

    login: async (req, res) => {
        const {email, password} = req.body
        try {
            const userExists = await UserModel.findOne({email});
            console.log(userExists);
            if (!userExists) {
                return res.status(404).json({msg: "Usuário não encontrado"});
            }

            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) {
                return res.status(401).json({ msg: "Senha inválida."})
            }
            //JWT
            const payload = {user_id: userExists._id, user_role: userExists.role}
            const token = jwt.sign( payload , process.env.SECRET, { expiresIn: 30000 });
            res.json({ msg: "Login bem-sucedido", auth:true, token})
        } catch (error) {
            res.status(500)
        }
    },

    tokenToUserRole: async (req, res) => {
        try {
            const user_role = req.role
            console.log("tokenToUserRole", user_role);
            res.status(200).json({user_role : user_role})
        } catch (error) {
            res.status(500)
        }

    }

}
//create hashPassword
async function hashPassword(password) {
    
    const salt = await bcrypt.genSalt(12)
    const passwordHashed = await bcrypt.hash(password, salt)
    return passwordHashed
}
module.exports = userController;

