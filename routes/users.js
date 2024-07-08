const router = require("express").Router()
const tryCatch = require("../utils/tryCatch.js")

const userController = require("../controllers/userController")

router.route("/").post((req, res, next) => tryCatch(req,res, next, userController.create));

router.route("/teachers").get((req, res,next) => tryCatch(req,res, next,userController.getAllTeachers));

router.route("/").get((req, res, next) => tryCatch(req,res, next,userController.get));

router.route("/").delete((req, res, next) => tryCatch(req,res, next,userController.delete));

router.route("/").put((req, res, next) => tryCatch(req,res, next,userController.update));

router.route("/role").post((req, res, next) => tryCatch(req,res, next,userController.tokenToUserRole))

module.exports = router;

