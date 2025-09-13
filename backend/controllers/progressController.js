import Progress from "../models/Progress.js";

// Create new progress entry
export const createProgress = async (req, res) => {
  try {
    const { weight, bodyFat, chest, waist, hips, notes, date } = req.body;

    const progress = new Progress({
      user: req.user._id,
      date: date || Date.now(),
      weight,
      bodyFat,
      chest,
      waist,
      hips,
      notes,
    });

    const savedProgress = await progress.save();
    res.status(201).json(savedProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all progress entries for current user
export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id }).sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single progress entry
export const getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) return res.status(404).json({ message: "Progress entry not found" });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update progress entry
export const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) return res.status(404).json({ message: "Progress entry not found" });

    const { weight, bodyFat, chest, waist, hips, notes, date } = req.body;
    progress.weight = weight || progress.weight;
    progress.bodyFat = bodyFat || progress.bodyFat;
    progress.chest = chest || progress.chest;
    progress.waist = waist || progress.waist;
    progress.hips = hips || progress.hips;
    progress.notes = notes || progress.notes;
    progress.date = date || progress.date;

    const updatedProgress = await progress.save();
    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete progress entry
export const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) return res.status(404).json({ message: "Progress entry not found" });

    await progress.remove();
    res.json({ message: "Progress entry removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
