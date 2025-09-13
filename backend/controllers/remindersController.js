import Reminder from "../models/Reminder.js";

// Create new reminder
export const createReminder = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const reminder = new Reminder({
      user: req.user._id,
      title,
      description,
      date,
    });

    const savedReminder = await reminder.save();
    res.status(201).json(savedReminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reminders for current user
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id }).sort({ date: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single reminder
export const getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update reminder
export const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });

    const { title, description, date, completed } = req.body;
    reminder.title = title || reminder.title;
    reminder.description = description || reminder.description;
    reminder.date = date || reminder.date;
    reminder.completed = completed !== undefined ? completed : reminder.completed;

    const updatedReminder = await reminder.save();
    res.json(updatedReminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete reminder
export const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });

    await reminder.remove();
    res.json({ message: "Reminder removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
