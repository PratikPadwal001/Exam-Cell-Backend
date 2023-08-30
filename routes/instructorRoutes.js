const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

router.post("/create-exam", instructorController.createExam);
router.get("/evaluate-sheets/:examID", instructorController.evaluateSheets);
router.put("/update-scores/:examId/:userId", instructorController.updateScores);
router.get(
    "/get-answer-sheets/:exam_id",
    instructorController.getAnswerSheetsByExamId
);
router.get("/all-answers", instructorController.getAllAnswers);
router.get("/all-exams", instructorController.getAllExams);

module.exports = router;
