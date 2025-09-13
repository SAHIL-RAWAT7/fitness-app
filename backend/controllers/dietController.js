import DietPlan from "../models/DietPlan.js";

// Create new diet plan
export const createDietPlan = async (req, res) => {
  try {
    const { title, description, meals } = req.body;

    const dietPlan = new DietPlan({
      title,
      description,
      meals,
      createdBy: req.user._id,
    });

    const savedPlan = await dietPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all diet plans
export const getDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find().populate("createdBy", "name email");
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single diet plan
export const getDietPlanById = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id).populate("createdBy", "name email");
    if (!plan) return res.status(404).json({ message: "Diet plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update diet plan
export const updateDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Diet plan not found" });

    const { title, description, meals } = req.body;
    plan.title = title || plan.title;
    plan.description = description || plan.description;
    plan.meals = meals || plan.meals;

    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete diet plan
export const deleteDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Diet plan not found" });

    await plan.remove();
    res.json({ message: "Diet plan removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
