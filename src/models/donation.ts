import mongoose, { InferSchemaType } from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    onlineGivingLink: String,
    bankDetails: {
      bankName: String,
      iban: String,
      accountHolder: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Donation =
  mongoose.models.Donation || mongoose.model("Donation", donationSchema);
export type Donation = InferSchemaType<typeof donationSchema>;
