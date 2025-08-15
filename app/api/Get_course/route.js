import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("inspira");

    // Find the user by clerkId
    const user = await db.collection("user").findOne({ clerkId: clerkId.trim() });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get enrolledCourses array (convert strings to ObjectId)
    const enrolledCourseIds = (user.enrolledCourses || []).map(id => new ObjectId(id));
    
    // Get completed courses information
    const completedCourses = user.completedCourses || [];

    // Initialize response object with user info
    const response = {
      user: {
        id: user._id.toString(),
        clerkId: user.clerkId,
        fullName: user.fullName,
        email: user.email,
        imageUrl: user.imageUrl
      },
      enrolledCourses: [],
      completedCourses: []
    };

    // Only fetch course details if there are enrolled courses
    if (enrolledCourseIds.length > 0) {
      // Fetch course details from course collection
      const courses = await db.collection("courses")
        .find({ _id: { $in: enrolledCourseIds } })
        .toArray();

      // Map enrolled courses with additional data
      response.enrolledCourses = courses.map(course => ({
        id: course._id.toString(),
        title: course.title,
        description: course.description,
        subject: course.subject,
        professorname: course.professorname,
        assigment: course.assigment,
        professor: course.professor,
        isCompleted: completedCourses.some(c => c.courseId === course._id.toString())
      }));
    }

    // Process completed courses
    if (completedCourses.length > 0) {
      // Get ObjectIds for completed courses not already in enrolledCourses
      const completedCourseIds = completedCourses
        .map(c => new ObjectId(c.courseId))
        .filter(id => !enrolledCourseIds.some(eid => eid.equals(id)));

      // Fetch additional completed course details if needed
      const additionalCourses = completedCourseIds.length > 0
        ? await db.collection("courses")
            .find({ _id: { $in: completedCourseIds } })
            .toArray()
        : [];

      // Combine all completed course data
      response.completedCourses = completedCourses.map(completed => {
        const course = [...response.enrolledCourses, ...additionalCourses]
          .find(c => c.id === completed.courseId);
        
        return {
          courseId: completed.courseId,
          completedAt: completed.completedAt,
          score: completed.score,
          courseDetails: course ? {
            title: course.title,
            subject: course.subject,
            professorname: course.professorname
          } : null
        };
      });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("GET /api/Get_User error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data", details: error.message },
      { status: 500 }
    );
  }
}