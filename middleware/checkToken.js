const jwt = require('jsonwebtoken')
const AppError = require("../appError.js")
const Errors = require("../constants/errorCodes.js")



function checkToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.NOT_PROVIDED
        throw new AppError(statusCode, errorCode, message)
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified.user_id;
        req.role = verified.user_role
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Token inválido"});
    }
}

module.exports = checkToken