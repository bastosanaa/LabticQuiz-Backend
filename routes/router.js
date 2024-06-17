const router = require("express").Router()
const checkToken = require("../middleware/checkToken.js")
const userController = require("../controllers/userController.js")

// Users Router
const usersRouter = require("./users")

router.use("/users", checkToken, usersRouter);

// Subjects Router
const subjectsRouter = require("./subjects")

router.use("/subjects",checkToken, subjectsRouter);

//studentsSubjects Router
const studentsSubjectsRouter = require("./studentsSubjects")

router.use("/studentsSubjects",checkToken, studentsSubjectsRouter)

module.exports = router;

//login
router.route("/auth/users").post((req, res) => userController.login(req, res))