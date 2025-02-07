import mongoose from "mongoose";

const MIGRATE_GALLERY = false;

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
