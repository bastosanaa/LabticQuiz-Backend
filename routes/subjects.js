const router = require("express").Router();
const tryCatch = require("../utils/tryCatch.js")

const subjectController = require("../controllers/subjectController");

router.route("/register").post((req, res, next) => tryCatch(req, res, next,subjectController.create));

router.route("/painel").get((req, res, next) => tryCatch(req, res, next,subjectController.getAll));

router.route("/:id").get((req, res, next) => tryCatch(req, res, next,subjectController.get));

router.route("/").delete((req, res, next) => tryCatch(req, res, next,subjectController.delete));

router.route("/:id").patch((req, res, next) => tryCatch(req, res, next,subjectController.update));

module.exports = router;
