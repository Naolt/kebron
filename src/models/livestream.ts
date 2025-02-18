import mongoose, { InferSchemaType } from "mongoose";

const livestreamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

export const Livestream =
  mongoose.models.Livestream || mongoose.model("Livestream", livestreamSchema);

export type Livestream = InferSchemaType<typeof livestreamSchema> & {
  _id: string;
};

