const router = require("express").Router();
const tryCatch = require("../utils/tryCatch.js")

const answerController = require('../controllers/answerController.js')

router.route("/").post((req, res, next) => tryCatch(req,res,next, answerController.create));

router.route("/:id").get((req, res, next) => tryCatch(req, res, next, answerController.get))

router.route("quiz/:id").get((req, res, next) => tryCatch(req, res, next, answerController.getQuizAnswers))

router.route("/student/:id").get((req, res, next) =>  tryCatch(req, res, next, answerController.getStudentAttempts));


module.exports = router