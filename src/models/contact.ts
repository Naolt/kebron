import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    contactPersonName: {
      type: String,
      required: true,
    },
    contactPersonImage: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mapEmbedLink: {
      type: String,
      required: true,
    },
    socialLinks: {
      facebook: String,
      youtube: String,
      linkedin: String,
      twitter: String,
    },
    publicId: String, // For Cloudinary image
  },
  {
    timestamps: true,
  }
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
