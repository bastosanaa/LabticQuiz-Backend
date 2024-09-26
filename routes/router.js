const router = require("express").Router()
const checkToken = require("../middleware/checkToken.js")
const userController = require("../controllers/userController.js")
const tryCatch = require("../utils/tryCatch.js")


// Users Router
const usersRouter = require("./users")

router.use("/users",checkToken, usersRouter);

// Subjects Router
const subjectsRouter = require("./subjects")

router.use("/subjects",checkToken, subjectsRouter);

//studentsSubjects Router
const studentsSubjectsRouter = require("./studentsSubjects")

router.use("/studentsSubjects",checkToken, studentsSubjectsRouter)

//quiz Router
const quizRouter = require("./quizzes")

router.use("/quizzes", checkToken, quizRouter)

//answer Router 
const answerRouter = require("./answers")

router.use("/answers", checkToken, answerRouter)

module.exports = router;

//login
router.route("/auth/users").post((req, res,next) => tryCatch(req, res,next,userController.login))
