const Answer = require("../models/answer");
const Exam = require("../models/exam");

const instructorController = {
    createExam: async (req, res) => {
        try {
            const {
                name,
                description,
                start_time,
                end_time,
                students_enlisted,
                question_set,
                total_marks,
                instructor_id,
            } = req.body;

            const newExam = await Exam.create({
                name,
                description,
                start_time,
                end_time,
                students_enlisted,
                question_set,
                total_marks,
                instructor_id,
            });

            res.status(201).json({
                message: "Exam created successfully",
                exam: newExam,
            });
        } catch (error) {
            console.error("Error creating exam:", error);
            res.status(500).json({
                error: "An error occurred while creating the exam",
            });
        }
    },
    evaluateSheets: async (req, res) => {
        try {
            const examId = parseInt(req.params.examId, 10);
            const exam = await Exam.findOne({
                attributes: ["students_enlisted", "question_set"],
                where: {
                    id: examId,
                },
            });

            const studentIds = exam.students_enlisted;
            const answers = await Answer.findAll({
                attributes: ["user_id", "answers", "scores"],
                where: {
                    exam_id: examId,
                    user_id: studentIds,
                },
            });

            res.status(200).json({ exam, answers });
        } catch (error) {
            console.error("Error fetching exam and answer details:", error);
            res.status(500).json({
                error: "An error occurred while fetching exam and answer details",
            });
        }
    },
    updateScores: async (req, res) => {
        try {
            const examId = parseInt(req.params.examId, 10);
            const userId = parseInt(req.params.userId, 10);
            const { newScores } = req.body;

            const updatedAnswer = await Answer.update(
                { scores: newScores, check_status: true },
                {
                    where: {
                        exam_id: examId,
                        user_id: userId,
                    },
                    returning: true,
                }
            );

            res.status(200).json({
                message: "Scores updated successfully",
                updatedAnswer,
            });
        } catch (error) {
            console.error("Error updating scores:", error);
            res.status(500).json({
                error: "An error occurred while updating scores",
            });
        }
    },
    getAnswerSheetsByExamId: async (req, res) => {
        const examId = req.params.exam_id;

        try {
            const exams = await Exam.findAll({
                where: {
                    exam_id: examId,
                },
            });

            res.status(200).json({
                success: true,
                data: exams,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occurred while fetching exams.",
            });
        }
    },
    getAllAnswers: async (req, res) => {
        try {
            const answers = await Answer.findAll();
            res.status(200).json(answers);
        } catch (error) {
            console.error("Error getting answers:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getAllExams: async (req, res) => {
        try {
            const exams = await Exam.findAll();
            res.status(200).json(exams);
        } catch (error) {
            console.error("Error getting exams:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = instructorController;
