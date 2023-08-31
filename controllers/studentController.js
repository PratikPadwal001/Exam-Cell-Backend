const Answer = require("../models/answer");
const Exam = require("../models/exam");
const sequelize = require("../config/dbConfig");
const Sequelize = require("sequelize");

const studentController = {
    getExams: async (req, res) => {
        try {
            const studentId = parseInt(req.params.studentId, 10);

            const exams = await sequelize.query(
                `SELECT * FROM exams WHERE JSON_CONTAINS(students_enlisted, ?)`,
                {
                    replacements: [`[${studentId}]`],
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            res.status(200).json(exams);
        } catch (error) {
            console.error("Error fetching exams:", error);
            res.status(500).json({
                error: "An error occurred while fetching exams",
            });
        }
    },
    getAnswerSheetByUserId: async (req, res) => {
        try {
            const { studentId } = req.params;

            const answers = await Answer.findAll({
                where: {
                    user_id: studentId,
                },
            });

            res.status(200).json(answers);
        } catch (error) {
            console.error("Error fetching answers:", error);
            res.status(500).json({
                error: "An error occurred while fetching answers.",
            });
        }
    },
    getAnswerSheet: async (req, res) => {
        try {
            const examId = parseInt(req.params.examId, 10);
            const userId = parseInt(req.params.studentId, 10);

            const exam = await Exam.findOne({
                attributes: ["question_set"],
                where: {
                    id: examId,
                },
            });

            const answer = await Answer.findOne({
                attributes: ["answers", "scores"],
                where: {
                    exam_id: examId,
                    user_id: userId,
                },
            });

            res.status(200).json({ exam, answer });
        } catch (error) {
            console.error("Error fetching exam and answer:", error);
            res.status(500).json({
                error: "An error occurred while fetching exam and answer",
            });
        }
    },
    submitAnswerSheet: async (req, res) => {
        try {
            console.log(req.body);
            const newSubmission = await Answer.create(req.body);
            res.status(201).json(newSubmission);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error submitting exam",
                error: error.message,
            });
        }
    },
};

module.exports = studentController;
