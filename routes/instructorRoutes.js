const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");
//Insert Exam
router.post("/create-exam", instructorController.createExam);

//Get combination of exams and answers table
// router.get("/evaluate-sheets/:examID", instructorController.evaluateSheets);

//Update scores using examid and userid
router.put("/update-scores/:examId/:userId", instructorController.updateScores);

//Get answer sheets based on id
router.get(
    "/get-answer-sheets/:exam_id",
    instructorController.getAnswerSheetsByExamId
);

//Get all answers
router.get("/all-answers", instructorController.getAllAnswers);

//Get all exams
router.get("/all-exams", instructorController.getAllExams);

module.exports = router;
