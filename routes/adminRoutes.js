const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
//Insert User
router.post("/create-user", adminController.createUser);

//Get all users data
router.get("/get-all-users", adminController.getAllUsers);

module.exports = router;
