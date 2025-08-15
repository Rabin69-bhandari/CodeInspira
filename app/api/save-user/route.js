// app/api/save-user/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { clerkId, fullName, imageUrl,email } = await request.json();
  const client = await clientPromise;
  const db = client.db("inspira"); // database selected here

  await db.collection("user").updateOne(
    { clerkId },
    { $set: { fullName, imageUrl, clerkId,email } },
    { upsert: true }
  );

  return NextResponse.json({ message: "User saved" });
}

export async function PUT(request) {
  try {
    const { clerkId, courseId, score } = await request.json();

    if (!clerkId || !courseId) {
      return NextResponse.json(
        { error: "Missing clerkId or courseId" }, 
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("inspira");

    // Validate courseId
    if (!ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { error: "Invalid courseId" },
        { status: 400 }
      );
    }

    const courseObjectId = new ObjectId(courseId);
    const completionData = {
      courseId: courseObjectId,
      completedAt: new Date(),
      score: score || 0
    };

    // Update user document with completion data
    const result = await db.collection("user").updateOne(
      { clerkId: clerkId.trim() },
      { 
        $addToSet: { enrolledCourses: courseObjectId },
        $push: { 
          completedCourses: {
            $each: [completionData],
            $sort: { completedAt: -1 } // Optional: keep recent first
          }
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ 
      message: "Course completion saved successfully!",
      updated: result.modifiedCount > 0,
      upserted: result.upsertedCount > 0
    });

  } catch (error) {
    console.error("PUT /api/save-user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json(
        { error: "Missing clerkId query parameter" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("inspira");

    // 1️⃣ Fetch user by clerkId
    const user = await db.collection("user").findOne({ clerkId });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const completedCourses = user.completedCourses || [];

    // 2️⃣ Fetch course details for each completed course
    const completedCoursesWithDetails = await Promise.all(
      completedCourses.map(async (c) => {
        const course = await db
          .collection("courses")
          .findOne({ _id: new ObjectId(c.courseId) });

        return {
          courseId: c.courseId,
          courseName: course?.title || "Unnamed Course",
          subject: course?.subject || "Unknown",
          score: c.score || 0
        };
      })
    );

    // 3️⃣ Return only the relevant data
    return NextResponse.json(completedCoursesWithDetails);

  } catch (error) {
    console.error("GET /api/save-user error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user completed courses" },
      { status: 500 }
    );
  }
}
