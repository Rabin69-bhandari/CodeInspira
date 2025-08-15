// app/api/save-user/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function GET() {
  const client = await clientPromise;
  const db = client.db("inspira");

  const users = await db.collection("user").find({}).toArray();

  return NextResponse.json(users);
}


export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");
    
    // Parse the request body
    const assignmentData = await request.json();
    
    // Validate required fields
    if (!assignmentData.title || !assignmentData.description || !assignmentData.courseId || !assignmentData.dueDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Add createdAt timestamp
    assignmentData.createdAt = new Date();
    assignmentData.status = "active"; // default status
    
    // Insert the assignment into the database
    const result = await db.collection("assignments").insertOne(assignmentData);
    
    // Return success response with the inserted document ID
    return NextResponse.json(
      { 
        success: true,
        assignmentId: result.insertedId,
        message: "Assignment created successfully"
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { error: "Failed to create assignment" },
      { status: 500 }
    );
  }
}