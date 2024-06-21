const router = require("express").Router()

const userController = require("../controllers/userController")

router.route("/").post((req, res) => userController.create(req, res));

// router.route("/").get((req, res) => userController.getAll(req, res));

router.route("/").get((req, res) => userController.get(req, res));

router.route("/").delete((req, res) => userController.delete(req, res));

router.route("/").put((req, res) => userController.update(req, res));

router.route("/role").post((req, res) => userController.tokenToUserRole(req, res))

module.exports = router;

