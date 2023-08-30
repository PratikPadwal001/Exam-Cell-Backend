const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordsMatch = password === user.password;
        if (!passwordsMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        return res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeDatabaseError") {
            return res.status(400).json({ message: "Invalid request" });
        }

        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
