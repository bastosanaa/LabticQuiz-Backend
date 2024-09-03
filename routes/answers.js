const router = require("express").Router();
const tryCatch = require("../utils/tryCatch.js")

const answerController = require('../controllers/answerController.js')

router.route("/").post((req, res, next) => tryCatch(req,res,next, answerController.create));


module.exports = router