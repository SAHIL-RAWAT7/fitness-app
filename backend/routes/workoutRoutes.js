import express from "express";
import {
  createWorkoutPlan,
  getWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} from "../controllers/workoutController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getWorkoutPlans).post(protect, createWorkoutPlan);
router
  .route("/:id")
  .get(getWorkoutPlanById)
  .put(protect, updateWorkoutPlan)
  .delete(protect, deleteWorkoutPlan);

export default router;
