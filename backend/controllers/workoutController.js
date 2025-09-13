import WorkoutPlan from "../models/WorkoutPlan.js";

// Create new workout plan
export const createWorkoutPlan = async (req, res) => {
  try {
    const { title, description, exercises } = req.body;

    const workoutPlan = new WorkoutPlan({
      title,
      description,
      exercises,
      createdBy: req.user._id,
    });

    const savedPlan = await workoutPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all workout plans
export const getWorkoutPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find().populate("createdBy", "name email");
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single workout plan
export const getWorkoutPlanById = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findById(req.params.id).populate("createdBy", "name email");
    if (!plan) return res.status(404).json({ message: "Workout plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update workout plan
export const updateWorkoutPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Workout plan not found" });

    const { title, description, exercises } = req.body;
    plan.title = title || plan.title;
    plan.description = description || plan.description;
    plan.exercises = exercises || plan.exercises;

    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete workout plan
export const deleteWorkoutPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Workout plan not found" });

    await plan.remove();
    res.json({ message: "Workout plan removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
