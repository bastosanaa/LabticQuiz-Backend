const router = require("express").Router();

const studentsSubjectsController = require("../controllers/studentsSubjectsController")

router.route("/studentsSubjects").post((req, res) => studentsSubjectsController.create(req, res));

// router.route("/studentsSubjects/:id").get((req, res) => studentsSubjectsController.getStudentsBySubject(req, res));

router.route("/studentsSubjects/:id").get((req, res) => studentsSubjectsController.getSubjectsByStudent(req, res));

router.route("/studentsSubjects/:id").delete((req, res) => studentsSubjectsController.delete(req, res));

router.route("/studentsSubjects/:id").put((req, res) => studentsSubjectsController.update(req, res));

module.exports = router;
