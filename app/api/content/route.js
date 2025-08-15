import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all content items
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");
    const contents = await db.collection("contents").find({}).toArray();
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch contents", error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create new content with modules
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.modules || !Array.isArray(data.modules)) {
      return NextResponse.json(
        { message: "Title and modules array are required" },
        { status: 400 }
      );
    }
    
    // Add createdAt timestamp
    data.createdAt = new Date();
    data.updatedAt = new Date();
    
    const result = await db.collection("contents").insertOne(data);
    
    return NextResponse.json({
      message: "Content created successfully",
      id: result.insertedId,
      title: data.title,
      moduleCount: data.modules.length
    });
    
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create content", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update content
export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");
    
    const { id, update } = await request.json();
    
    if (!id || !update) {
      return NextResponse.json(
        { message: "ID and update data are required" },
        { status: 400 }
      );
    }
    
    // Add updatedAt timestamp
    update.updatedAt = new Date();
    
    const result = await db
      .collection("contents")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: update }
      );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Content not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: "Content updated successfully",
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update content", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete content
export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");
    
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { message: "Content ID is required" },
        { status: 400 }
      );
    }
    
    const result = await db
      .collection("contents")
      .deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Content not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: "Content deleted successfully",
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete content", error: error.message },
      { status: 500 }
    );
  }
}