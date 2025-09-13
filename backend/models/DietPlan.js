import mongoose from "mongoose";

const dietPlanSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    meals: [
      {
        name: { type: String, required: true },
        calories: { type: Number, required: true },
        protein: { type: Number },
        carbs: { type: Number },
        fats: { type: Number },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);
export default DietPlan;
