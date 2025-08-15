import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request, context) {
  // Await params before destructuring
  const { params } = await context;
  const { id } = params; // this is the courseId from the URL

  console.log(id)
  try {
    const client = await clientPromise;
    const db = client.db("inspira");

    // Find the course by courseId, not _id
    const course = await db.collection("contents").findOne({ courseId: id });
    console.log(course)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
