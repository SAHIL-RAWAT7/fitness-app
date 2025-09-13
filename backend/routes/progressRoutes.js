import express from "express";
import {
  createProgress,
  getProgress,
  getProgressById,
  updateProgress,
  deleteProgress,
} from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getProgress).post(protect, createProgress);
router
  .route("/:id")
  .get(protect, getProgressById)
  .put(protect, updateProgress)
  .delete(protect, deleteProgress);

export default router;
