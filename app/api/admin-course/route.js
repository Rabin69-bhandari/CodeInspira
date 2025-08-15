import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Fetch all courses with their content and quizzes
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");

    // Fetch courses and join with content collection
    const courses = await db.collection("courses").aggregate([
      {
        $lookup: {
          from: "content",
          localField: "_id",
          foreignField: "courseId",
          as: "content"
        }
      },
      {
        $unwind: {
          path: "$content",
          preserveNullAndEmptyArrays: true
        }
      }
    ]).toArray();

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST: Create a new course with optional content and quizzes
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");

    const data = await request.json();
    console.log(data)

    // Validate required fields
    if (!data.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Prepare course data
    const courseData = {
      title: data.title,
      description: data.description || "",
      professorname:data.professorname || "",
      subject:data.subject||"",
      assigment :data.assigment||"",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Start transaction
    const session = client.startSession();
    let result;

    try {
      await session.withTransaction(async () => {
        // Insert course
        result = await db.collection("courses").insertOne(courseData, { session });

        // If content is provided, insert it
        if (data.modules) {
          const contentData = {
            courseId: result.insertedId,
            title: data.contentTitle || data.title,
            modules: data.modules.map(module => ({
              title: module.title,
              content: module.content,
              imageUrl: module.imageUrl || null,
              quiz: {
                questions: module.quiz.questions.map(question => ({
                  question: question.question,
                  options: question.options,
                  correctAnswer: question.correctAnswer
                }))
              }
            })),
            createdAt: new Date(),
            updatedAt: new Date()
          };

          await db.collection("content").insertOne(contentData, { session });
        }
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json({ 
      message: "Course created successfully",
      courseId: result.insertedId 
    });

  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}

// PUT: Update a course and its content/quizzes
export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");

    const { id, update, content } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Start transaction
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // Update course
        const courseUpdate = {
          title: update.title,
          description: update.description,
          updatedAt: new Date()
        };

        const courseResult = await db.collection("courses").updateOne(
          { _id: new ObjectId(id) },
          { $set: courseUpdate },
          { session }
        );

        if (courseResult.matchedCount === 0) {
          throw new Error("Course not found");
        }

        // Update or create content
        if (content) {
          const contentUpdate = {
            title: content.title || update.title,
            modules: content.modules.map(module => ({
              title: module.title,
              content: module.content,
              imageUrl: module.imageUrl || null,
              quiz: {
                questions: module.quiz.questions.map(question => ({
                  question: question.question,
                  options: question.options,
                  correctAnswer: question.correctAnswer
                }))
              }
            })),
            updatedAt: new Date()
          };

          const contentResult = await db.collection("content").updateOne(
            { courseId: new ObjectId(id) },
            { $set: contentUpdate },
            { upsert: true, session }
          );

          console.log("Content update result:", contentResult);
        }
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json({ message: "Course updated successfully" });

  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a course and its associated content
export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db("inspira");

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Start transaction
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // Delete course
        const courseResult = await db.collection("courses").deleteOne(
          { _id: new ObjectId(id) },
          { session }
        );

        if (courseResult.deletedCount === 0) {
          throw new Error("Course not found");
        }

        // Delete associated content
        await db.collection("content").deleteMany(
          { courseId: new ObjectId(id) },
          { session }
        );
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json({ message: "Course deleted successfully" });

  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete course" },
      { status: 500 }
    );
  }
}