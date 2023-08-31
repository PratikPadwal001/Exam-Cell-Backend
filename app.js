let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

const sequelize = require("./config/dbConfig");

let app = express();

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.use("/student", studentRoutes);
app.use("/instructor", instructorRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 4000;

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("DATABASE Authenticated and Synced!!");
        app.listen(PORT, () => {
            console.log("Server is running on " + PORT);
        });
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });
