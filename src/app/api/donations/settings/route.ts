import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Donation } from "@/models/donation";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    await connectDB();
    const settings = await Donation.findOne({ isActive: true });
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error("Error in GET /api/donations/settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch donation settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    const settings = await Donation.findOneAndUpdate(
      { isActive: true },
      {
        onlineGivingLink: data.onlineGivingLink,
        bankAccounts: data.bankAccounts.map(
          (account: {
            bankName: string;
            iban: string;
            accountHolder: string;
            description: string;
          }) => ({
            bankName: account.bankName,
            iban: account.iban,
            accountHolder: account.accountHolder,
            description: account.description,
          })
        ),
      },
      { upsert: true, new: true }
    );

    revalidateTag("donations");
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in POST /api/donations/settings:", error);
    return NextResponse.json(
      { error: "Failed to update donation settings" },
      { status: 500 }
    );
  }
}
