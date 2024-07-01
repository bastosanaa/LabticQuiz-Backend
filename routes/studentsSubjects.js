const router = require("express").Router();

const studentsSubjectsController = require("../controllers/studentsSubjectsController")

router.route("/").post((req, res) => studentsSubjectsController.create(req, res));

// router.route("/studentsSubjects/:id").get((req, res) => studentsSubjectsController.getStudentsBySubject(req, res));

router.route("/").get((req, res) => studentsSubjectsController.getSubjectsByStudent(req, res));

router.route("/").delete((req, res) => studentsSubjectsController.delete(req, res));

router.route("/").put((req, res) => studentsSubjectsController.update(req, res));

module.exports = router;
