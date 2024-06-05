const router = require("express").Router()

// Users Router
const usersRouter = require("./users")

router.use("/", usersRouter);

// Subjects Router
const subjectsRouter = require("./subjects")

router.use("/", subjectsRouter);

//studentsSubjects Router
const studentsSubjectsRouter = require("./studentsSubjects")

router.use("/", studentsSubjectsRouter)

module.exports = router;