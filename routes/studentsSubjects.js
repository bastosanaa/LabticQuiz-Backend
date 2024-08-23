const router = require("express").Router();
const tryCatch = require("../utils/tryCatch.js")

const studentsSubjectsController = require("../controllers/studentsSubjectsController")

router.route("/").post((req, res, next) => tryCatch(req, res, next,studentsSubjectsController.create));

// router.route("/studentsSubjects/:id").get((req, res) => studentsSubjectsController.getStudentsBySubject(req, res));

router.route("/:id").get((req, res, next) => tryCatch(req, res, next,studentsSubjectsController.getSubjectsByStudent));

router.route("/").delete((req, res, next) => tryCatch(req, res, next,studentsSubjectsController.deleteOne));

router.route("/").put((req, res, next) => tryCatch(req, res, next,studentsSubjectsController.update));

module.exports = router;
