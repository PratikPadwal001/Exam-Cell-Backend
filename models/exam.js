const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = require("./user");

const Exam = sequelize.define(
    "exams",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        students_enlisted: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        question_set: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        total_marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            references: { model: User, key: "id" },
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Exam;
