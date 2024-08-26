const router = require("express").Router();
const tryCatch = require("../utils/tryCatch.js")

const subjectController = require("../controllers/subjectController");

router.route("/register").post((req, res, next) => tryCatch(req, res, next,subjectController.create));

router.route("/painel").get((req, res, next) => tryCatch(req, res, next,subjectController.getAll));

router.route("/").delete((req, res, next) => tryCatch(req, res, next,subjectController.delete));

//routes related to teacher - subject association
router.route("/teacher").get((req, res, next) => tryCatch(req, res, next,subjectController.getAllWithoutTeacher));

router.route("/teacher/:id").get((req, res, next) => tryCatch(req, res, next,subjectController.getByTeacher))

router.route("/teacher").patch((req, res, next) => tryCatch(req, res, next,subjectController.updateTeacherToNull));

//

router.route("/:id").get((req, res, next) => tryCatch(req, res, next,subjectController.get));

router.route("/:id").patch((req, res, next) => tryCatch(req, res, next,subjectController.update));

// router.route("/teacher").patch((req, res, next) => tryCatch(req, res, next,subjectController.updateTeacher))






module.exports = router;
