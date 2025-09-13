import mongoose from "mongoose";

const reminderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },       // Date and time of reminder
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
