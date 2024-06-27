const router = require("express").Router();

const subjectController = require("../controllers/subjectController")

router.route("/register").post((req, res) => subjectController.create(req, res));

router.route("/painel").get((req, res) => subjectController.getAll(req, res));

router.route("/").get((req, res) => subjectController.get(req, res));

router.route("/").delete((req, res) => subjectController.delete(req, res));

router.route("/").put((req, res) => subjectController.update(req, res));

module.exports = router;
