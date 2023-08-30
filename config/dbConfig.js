const { Sequelize } = require("sequelize");

const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Admin@369",
    DB: "exam_system",
    dialect: "mysql",
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliasis: false,
});

module.exports = sequelize;
