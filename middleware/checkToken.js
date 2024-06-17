
function checkToken(req, res, next) {
    const token = req.header('Authorization');
    console.log("middleware", req.body);
    if (!token) {
        return res.status(401).json({ msg: "Acesso negado."})
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified.user_id;
        next();
    } catch (error) {
        res.status(400).json({ msg: "Token inválido"});
    }
}

module.exports = checkToken