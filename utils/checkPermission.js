const Errors = require("../constants/errorCodes.js")
const AppError = require("../appError.js")


function checkPermission(user_role) {
    if (user_role !== "administrador") {
        const {statusCode, errorCode, message} = Errors.TOKEN_ERROR.FORBIDDEN_ACCESS
        throw new AppError(statusCode, errorCode, message)
    }
}

module.exports = checkPermission