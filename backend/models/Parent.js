// Mongoose model for Parent
const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  address: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tutor" }],
  ratingHistory: [
    {
      tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
      rating: { type: Number, required: true },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Parent", parentSchema);
