// Express router for tutor endpoints
const express = require("express");
const Tutor = require("../models/Tutor");
const router = express.Router();

// Get all tutors
router.get("/", async (req, res) => {
  const tutors = await Tutor.find();
  res.json(tutors);
});

// Add a new tutor
router.post("/", async (req, res) => {
  const tutor = new Tutor(req.body);
  await tutor.save();
  res.status(201).json(tutor);
});

// Login tutor (simple, no JWT yet)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const tutor = await Tutor.findOne({ email, password });
  if (!tutor) return res.status(401).json({ error: "Invalid credentials" });
  res.json(tutor);
});

// Get tutor by ID
router.get("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) return res.status(404).json({ error: "Tutor not found" });
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update tutor profile
router.put("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tutor) return res.status(404).json({ error: "Tutor not found" });
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Rate a tutor
router.post("/:id/rate", async (req, res) => {
  const { rating, parentId } = req.body;
  if (!parentId) return res.status(400).json({ error: "parentId required" });
  const tutor = await Tutor.findById(req.params.id);
  if (!tutor) return res.status(404).send("Tutor not found");
  // Prevent duplicate ratings from same parent
  if (tutor.ratings.some((r) => r.parent.toString() === parentId)) {
    return res.status(400).json({ error: "Parent already rated this tutor" });
  }
  tutor.ratings.push({ parent: parentId, value: rating });
  await tutor.save();
  res.json(tutor);
});

module.exports = router;
