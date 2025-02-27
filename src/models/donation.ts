import mongoose, { InferSchemaType } from "mongoose";

const bankAccountSchema = new mongoose.Schema({
  bankName: String,
  iban: String,
  accountHolder: String,
  description: String, // To specify purpose/type of account (e.g., "General Fund", "Building Fund")
});

const donationSchema = new mongoose.Schema(
  {
    onlineGivingLink: String,
    bankAccounts: [bankAccountSchema], // Array of bank accounts
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
