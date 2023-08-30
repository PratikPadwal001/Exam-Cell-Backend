const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
// Get Exams
router.get("/get-exams/:studentId", studentController.getExams);

//Get Answer Sheets by User ID
router.get(
    "/get-answer-sheets/:studentId",
    studentController.getAnswerSheetByUserId
);

//Get Particular Answer Sheet
router.get(
    "/answer-sheet/:examId/:studentId",
    studentController.getAnswerSheet
);

//Submit Answer Sheet
router.post("/submit-answer-sheet", studentController.submitAnswerSheet);
module.exports = router;
