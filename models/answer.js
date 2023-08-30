const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = require("./user");
const Exam = require("./exam");

const Answer = sequelize.define(
    "answers",
    {
        exam_id: {
            type: DataTypes.INTEGER,
            references: { model: Exam, key: "id" },
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: { model: User, key: "id" },
            allowNull: false,
        },
        answers: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        scores: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: null,
        },
        check_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Answer;
