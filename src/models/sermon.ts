import mongoose from "mongoose";

const sermonSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  videoUrl: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ["youtube", "facebook"],
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  embedUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Sermon =
  mongoose.models.Sermon || mongoose.model("Sermon", sermonSchema);
