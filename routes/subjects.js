const router = require("express").Router();

const subjectController = require("../controllers/subjectController")

router.route("/subjects").post((req, res) => subjectController.create(req, res));

router.route("/subjects").get((req, res) => subjectController.getAll(req, res));

router.route("/subjects/:id").get((req, res) => subjectController.get(req, res));

router.route("/subjects/:id").delete((req, res) => subjectController.delete(req, res));

router.route("/subjects/:id").put((req, res) => subjectController.update(req, res));

module.exports = router;
