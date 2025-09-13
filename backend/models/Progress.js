import mongoose from "mongoose";

const progressSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    weight: { type: Number },
    bodyFat: { type: Number },
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
