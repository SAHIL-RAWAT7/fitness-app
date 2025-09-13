import express from "express";
import {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
} from "../controllers/remindersController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getReminders).post(protect, createReminder);
router
  .route("/:id")
  .get(protect, getReminderById)
  .put(protect, updateReminder)
  .delete(protect, deleteReminder);

export default router;
