// Express router for parent endpoints
const express = require("express");
const Parent = require("../models/Parent");
const Tutor = require("../models/Tutor");
const router = express.Router();

// Register a new parent
router.post("/signup", async (req, res) => {
  try {
    const parent = new Parent(req.body);
    await parent.save();
    res.status(201).json(parent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login parent (simple, no JWT yet)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const parent = await Parent.findOne({ email, password });
  if (!parent) return res.status(401).json({ error: "Invalid credentials" });
  res.json(parent);
});

// Get parent by ID
router.get("/:id", async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id)
      .populate("favorites", "name subject experience imageUrl")
      .populate("ratingHistory.tutor", "name subject");
    if (!parent) return res.status(404).json({ error: "Parent not found" });
    res.json(parent);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update parent profile
router.put("/:id", async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!parent) return res.status(404).json({ error: "Parent not found" });
    res.json(parent);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add tutor to favorites
router.post("/:id/favorites", async (req, res) => {
  try {
    const { tutorId } = req.body;
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ error: "Parent not found" });

    if (!parent.favorites.includes(tutorId)) {
      parent.favorites.push(tutorId);
      await parent.save();
    }
    res.json(parent);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove tutor from favorites
router.delete("/:id/favorites/:tutorId", async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ error: "Parent not found" });

    parent.favorites = parent.favorites.filter(
      (id) => id.toString() !== req.params.tutorId
    );
    await parent.save();
    res.json(parent);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Rate a tutor
router.post("/:id/rate", async (req, res) => {
  try {
    const { tutorId, rating, comment } = req.body;
    const parent = await Parent.findById(req.params.id);
    const tutor = await Tutor.findById(tutorId);

    if (!parent || !tutor) {
      return res.status(404).json({ error: "Parent or tutor not found" });
    }

    // Check if parent already rated this tutor
    const existingRating = parent.ratingHistory.find(
      (r) => r.tutor.toString() === tutorId
    );

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.comment = comment;
    } else {
      // Add new rating
      parent.ratingHistory.push({ tutor: tutorId, rating, comment });
    }

    await parent.save();

    // Update tutor's ratings
    const tutorRatingIndex = tutor.ratings.findIndex(
      (r) => r.parent.toString() === req.params.id
    );

    if (tutorRatingIndex >= 0) {
      // Update existing rating
      tutor.ratings[tutorRatingIndex].value = rating;
      tutor.ratings[tutorRatingIndex].comment = comment;
    } else {
      // Add new rating
      tutor.ratings.push({
        parent: req.params.id,
        value: rating,
        comment,
      });
    }

    await tutor.save();
    res.json({ parent, tutor });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
