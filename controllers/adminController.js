const User = require("../models/user");
const { Op } = require("sequelize");

const adminController = {
    createUser: async (req, res) => {
        try {
            const { username, password, first_name, last_name, email, role } =
                req.body;

            // Check if a user with the provided username or email already exists
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ username }, { email }],
                },
            });

            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Username or email already exists" });
            }

            const newUser = await User.create({
                username,
                password,
                first_name,
                last_name,
                email,
                role,
            });

            res.status(201).json({
                success: true,
            });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({
                error: "An error occurred while creating user",
            });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error getting answers:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = adminController;
