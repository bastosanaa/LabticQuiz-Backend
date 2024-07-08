const AppError = require("../appError.js");

function errorHandler(error, req, res, next) {

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({error: error.message, status: error.statusCode});
    }
}

module.exports = errorHandler