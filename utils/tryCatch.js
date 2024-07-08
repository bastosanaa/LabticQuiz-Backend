async function tryCatch(req, res, next, controller){
    console.log("Entrou no trycatch");
    try {
        await controller(req, res)
    } catch (error) {
        console.log("caiu no catch", error);
        next(error)
    }
    
}

module.exports = tryCatch