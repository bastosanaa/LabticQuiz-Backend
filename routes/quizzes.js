const router = require("express").Router();
const tryCatch = require("../utils/tryCatch.js")

const quizController = require('../controllers/quizController.js')

router.route("/").post((req, res, next) => tryCatch(req,res,next, quizController.create));

router.route("/:id").put((req, res, next) => tryCatch(req,res,next, quizController.update))

router.route("/:id").get((req, res, next) => tryCatch(req,res,next, quizController.get))

module.exports = router