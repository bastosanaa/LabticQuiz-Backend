function tryCatch(controller){
    console.log("Entrou aqui");
    async (req, res, next) => {
        try {
            await controller(req, res)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = tryCatch