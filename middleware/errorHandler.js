const AppError = require("../appError.js");

function errorHandler(error, req, res, next) {
    console.log('entrou no middleware errorhanlder', error);

    if (error instanceof AppError) {
        console.log("Erro aqui:", error);
        return res.status(error.statusCode).json({error: error.message, status: error.statusCode});
    }
}

module.exports = errorHandler