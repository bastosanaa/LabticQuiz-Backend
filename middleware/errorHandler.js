const AppError = require("../appError.js");

function errorHandler(error, req, res, next) {
    console.log('entrou no middleware errorhanlder');
    

    if (error instanceof AppError) {
        console.log("Erro aqui:", error);
        return res.status(400).json({error: error.message});
    }
}

module.exports = errorHandler