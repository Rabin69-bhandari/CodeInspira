// app/api/courses/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");

    // Fetch all courses
    const courses = await db.collection("courses").find({}).toArray();

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

