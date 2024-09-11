const router = require("express").Router();
const tryCatch = require("../utils/tryCatch.js")

const quizController = require('../controllers/quizController.js')

router.route("/").post((req, res, next) => tryCatch(req,res,next, quizController.create));

router.route("/:id").delete((req,res,next) => tryCatch(req,res,next, quizController.delete));

router.route("/:id").put((req, res, next) => tryCatch(req,res,next, quizController.update));

router.route("/:id").get((req, res, next) => tryCatch(req,res,next, quizController.get));

router.route("/subject/:id").get((req, res, next) => tryCatch(req,res,next, quizController.getAllBySubject));


module.exports = router