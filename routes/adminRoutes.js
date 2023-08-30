const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/create-user", adminController.createUser);
router.get("/get-all-users", adminController.getAllUsers);

module.exports = router;
