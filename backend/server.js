import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());             // ✅ JSON parser
app.use(express.urlencoded({ extended: true })); // optional for form-data

// Routes
app.use("/api/users", userRoutes);
app.use("/api/diets", dietRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/reminders", reminderRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("API is running"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
