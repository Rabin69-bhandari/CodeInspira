import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET: fetch all notifications
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");
    const notifications = await db.collection("notifications").find({}).sort({ _id: -1 }).toArray();
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

// POST: add a new notification
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");
    const { message } = await req.json();
    const result = await db.collection("notifications").insertOne({ message, createdAt: new Date() });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
