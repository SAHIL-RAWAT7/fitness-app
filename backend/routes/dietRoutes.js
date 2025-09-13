import express from "express";
import {
  createDietPlan,
  getDietPlans,
  getDietPlanById,
  updateDietPlan,
  deleteDietPlan,
} from "../controllers/dietController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getDietPlans).post(protect, createDietPlan);
router
  .route("/:id")
  .get(getDietPlanById)
  .put(protect, updateDietPlan)
  .delete(protect, deleteDietPlan);

export default router;
