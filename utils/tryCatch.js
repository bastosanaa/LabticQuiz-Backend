async function tryCatch(req, res, next, controller){
    try {
        await controller(req, res)
    } catch (error) {

        next(error)
    }
    
}

module.exports = tryCatch