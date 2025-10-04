// Mongoose model for Tutor
const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: String,
  gender: String,
  phone: String,
  address: String,
  subject: String,
  experience: Number,
  bio: String,
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  ratings: [
    {
      parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
      value: { type: Number, required: true },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tutor", tutorSchema);
