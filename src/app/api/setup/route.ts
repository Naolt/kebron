import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/user";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if any user exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json(
        { error: "Setup has already been completed" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    await User.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Admin user created successfully" });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "An error occurred during setup" },
      { status: 500 }
    );
  }
}
