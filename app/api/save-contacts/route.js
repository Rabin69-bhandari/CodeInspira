// app/api/save-contact/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const { name, email, message } = await request.json();
  const client = await clientPromise;
  const db = client.db("inspira"); // database name

  await db.collection("contact").insertOne({
    name,
    email,
    message,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Contact saved successfully" });
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");
    
    const assignments = await db.collection("assignments")
      .find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .toArray();
    
    return NextResponse.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    );
  }
}