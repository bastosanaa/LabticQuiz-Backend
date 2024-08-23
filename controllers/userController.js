const { User: UserModel, User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const AppError = require("../appError.js")
const Errors = require("../constants/errorCodes.js")
const checkPermission = require("../utils/checkPermission.js")



const userController = {

    create: async(req, res) => {

        const user_role = req.role
        
        checkPermission(user_role)
        const user = {
            registration: req.body.registration,
            name: req.body.name,
            email: req.body.email,
            password: await hashPassword(req.body.password),
            role: req.body.role
        };

        const user_registered = await UserModel.find({name: user.name})
        if (user_registered.length > 0) {
            console.log("USUARIO JA EXISTE");
            const {statusCode, errorCode, message} = Errors.USER_ERROR.ALREADY_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const response = await UserModel.create(user);

        
        res.status(201).json({response, msg: "Usuário registrado com sucesso!", _id:response._id});
    
    },
    getAllTeachers: async(req, res) => {

        const users = await UserModel.find({ role: 'professor'}, "name");
        

        if (!users){
            const {statusCode, errorCode, message} = Errors.USER_ERROR.DOESNT_EXIST
            throw new AppError(statusCode,errorCode,message)
        }
        res.json(users);
        
    },
    getAllStudents: async(req, res) => {

        const users = await UserModel.find({ role: 'estudante'}, "name registration");
        

        if (!users){
            const {statusCode, errorCode, message} = Errors.USER_ERROR.DOESNT_EXIST
            throw new AppError(statusCode,errorCode,message)
        }
        res.json(users);
    },
    //utilizar token de autenticacao
    getIDByToken: async(req, res) => {

            console.log(req.user);
            
            const id = req.user
            const user = await UserModel.findById(id).select('_id')
            
            if(!user) {
                const {statusCode, errorCode, message} = Errors.USER_ERROR.DOESNT_EXIST
                throw new AppError(statusCode, errorCode, message)
            }
            
            res.json(user)

    },
    get: async(req, res) => {
        
        const id = req.params.id
        const user = await UserModel.findById(id).select('name email registration role')
        
        if(!user) {
            const {statusCode, errorCode, message} = Errors.USER_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }
        
        res.json(user)
    },

    delete: async(req, res) => {
            
        const user_role = req.role
        checkPermission(user_role)

        const id = req.body.id

        const user = await UserModel.findById(id)

        if(!user) {
            const {statusCode, errorCode, message} = Errors.USER_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const deletedUser = await UserModel.findByIdAndDelete(id).select('_id')

        console.log(deletedUser);
        
        
        res.status(200).json({ deletedUser, msg: "Usuário excluído com sucesso"})

    },
    update: async (req, res) => {
        console.log("ENTROU NO UPDATE");
        
        const user_role = req.role        
        checkPermission(user_role)
        console.log("CORPO DA REQ",req.body);
        
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
            const {statusCode, errorCode, message} = Errors.USER_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        res.status(200).json({user, msg: "Usuário atualizado com sucesso"})
    },

    login: async (req, res) => {
        const {email, password} = req.body
        const userExists = await UserModel.findOne({email});
        console.log(userExists);
        if (!userExists) {
            const {statusCode, errorCode, message} = Errors.USER_ERROR.DOESNT_EXIST
            throw new AppError(statusCode, errorCode, message)
        }

        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            const {statusCode, errorCode, message} = Errors.USER_ERROR.INCORRECT_CURRENT_PASSWORD
            throw new AppError(statusCode, errorCode, message)
        }
        //JWT
        const payload = {user_id: userExists._id, user_role: userExists.role}
        const token = jwt.sign( payload , process.env.SECRET, { expiresIn: 9000000 });
        res.json({ msg: "Login bem-sucedido", auth:true, token})

    },

    tokenToUserRole: async (req, res) => {

        const user_role = req.role
        if (!user_role) {
            const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.NOT_PROVIDED
            throw new AppError(statusCode, errorCode, message)
        }
        console.log("tokenToUserRole", user_role);
        res.status(200).json({user_role : user_role})
    }

}
//create hashPassword
async function hashPassword(password) {
    
    const salt = await bcrypt.genSalt(12)
    const passwordHashed = await bcrypt.hash(password, salt)
    return passwordHashed
}
module.exports = userController;

