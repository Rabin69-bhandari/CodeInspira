"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/adminsidebar";
import ContentAdder from "../popup/page";// Make sure to create this component file

export default function CoursesPage() {
  // State management
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("courses");
  const [showContentAdder, setShowContentAdder] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject:"",
    professorname:"",
    assigment:""
  });
  
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    description: "",
    subject:"",
    professorname:"",
    assigment:""
  });

  // Color scheme
  const colors = {
    primary: "#4F39F6",
    background: "#FFFFFF",
    card: "#F8F9FC",
    text: "#2D3748",
    muted: "#718096",
    border: "#E2E8F0",
    danger: "#E53E3E",
    success: "#38A169"
  };

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin-course");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle input changes
  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add a new course
  const addCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add course");
      setFormData({ title: "", description: "",subject:"",
      professorname:"",
      assigment:"" });
      await fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  // Set course for editing
  const prepareEdit = (course) => {
    setEditData({
      id: course._id,
      title: course.title,
      description: course.description,
      subject: course.subject,
      professorname: course.professorname,
      assigment: course.assigment
    });
    setActiveTab("edit");
  };

  // Update a course
  const updateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin-course", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editData.id,
          update: { 
            title: editData.title, 
            description: editData.description,
            subject: editData.subject,
            professorname: editData.professorname,
            assigment: editData.assigment 
          },
        }),
      });
      if (!res.ok) throw new Error("Failed to update course");
      setEditData({ id: "", title: "", description: "",subject:"",
      professorname:"",
      assigment:"" });
      setActiveTab("courses");
      await fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a course
  const deleteCourse = async (id) => {
    try {
      const res = await fetch("/api/admin-course", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete course");
      await fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  // Open content adder for a specific course
  const openContentAdder = (courseId) => {
    setSelectedCourseId(courseId);
    setShowContentAdder(true);
  };

  return (
    <div className="flex min-h-screen" style={{ 
      backgroundColor: colors.background,
      color: colors.text,
      fontFamily: "'Inter', sans-serif"
    }}>
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Course Management</h1>
            <p className="text-gray-600">Create and manage your educational content</p>
          </div>

          {/* Error notification */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-3 font-medium relative ${activeTab === "courses" ? "text-primary-600" : "text-gray-500"}`}
              style={{ color: activeTab === "courses" ? colors.primary : colors.muted }}
            >
              Courses
              {activeTab === "courses" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 rounded-t" 
                  style={{ backgroundColor: colors.primary }}></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`px-6 py-3 font-medium relative ${activeTab === "create" ? "text-primary-600" : "text-gray-500"}`}
              style={{ color: activeTab === "create" ? colors.primary : colors.muted }}
            >
              Create Course
              {activeTab === "create" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 rounded-t" 
                  style={{ backgroundColor: colors.primary }}></span>
              )}
            </button>
            {editData.id && (
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-6 py-3 font-medium relative ${activeTab === "edit" ? "text-primary-600" : "text-gray-500"}`}
                style={{ color: activeTab === "edit" ? colors.primary : colors.muted }}
              >
                Edit Course
                {activeTab === "edit" && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 rounded-t" 
                    style={{ backgroundColor: colors.primary }}></span>
                )}
              </button>
            )}
          </div>

          {/* Main content */}
          <div className="space-y-8">
            {/* Create Course Tab */}
            {activeTab === "create" && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-6">Create New Course</h2>
                <form onSubmit={addCourse}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full px-4 mb-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      placeholder="Enter course title"
                      required
                    />
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full px-4 mb-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      placeholder="Enter Course"
                      required
                    />
                    <label className="block text-sm font-medium mb-2">Professor Name</label>
                    <input
                      type="text"
                      name="professorname"
                      value={formData.professorname}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full px-4  mb-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      placeholder="Enter tutor name"
                      required
                    />
                    <label className="block text-sm font-medium mb-2">Assigment</label>
                    <input
                      type="text"
                      name="assigment"
                      value={formData.assigment}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full px-4  mb-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      placeholder="Enter Assigment "
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      rows="4"
                      placeholder="Enter course description"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg font-medium text-white transition-colors"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Create Course
                  </button>
                </form>
              </div>
            )}

            {/* Edit Course Tab */}
            {activeTab === "edit" && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Edit Course</h2>
                  <button
                    onClick={() => {
                      setEditData({ id: "", title: "", description: "" });
                      setActiveTab("courses");
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={updateCourse}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      required
                    />
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={editData.subject}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full px-4 mb-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      placeholder="Enter Course"
                      required
                    />
                    <label className="block text-sm font-medium mb-2">Professor Name</label>
                    <input
                      type="text"
                      name="professorname"
                      value={editData.professorname}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full px-4  mb-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      placeholder="Enter tutor name"
                      required
                    />
                    <label className="block text-sm font-medium mb-2">Assigment</label>
                    <input
                      type="text"
                      name="assigment"
                      value={editData.assigment}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full px-4  mb-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      placeholder="Enter Assigment "
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      style={{ borderColor: colors.border }}
                      rows="4"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg font-medium text-white transition-colors"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Course List Tab */}
            {activeTab === "courses" && (
              <div>
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">Total Courses</div>
                    <div className="text-3xl font-bold" style={{ color: colors.primary }}>
                      {courses.length}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">Active Courses</div>
                    <div className="text-3xl font-bold" style={{ color: colors.primary }}>
                      {courses.length}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">System Status</div>
                    <div className="text-3xl font-bold" style={{ color: colors.success }}>
                      Active
                    </div>
                  </div>
                </div>

                {/* Course table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Course List</h2>
                  </div>
                  
                  {loading ? (
                    <div className="p-8 flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 mb-4" 
                        style={{ borderColor: colors.primary }}></div>
                      <p>Loading courses...</p>
                    </div>
                  ) : courses.length === 0 ? (
                    <div className="p-8 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No courses found</h3>
                      <p className="mt-2 text-sm text-gray-500">Get started by creating a new course</p>
                      <button
                        onClick={() => setActiveTab("create")}
                        className="mt-4 px-6 py-2 rounded-lg font-medium text-white transition-colors"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Create Course
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {courses.map((course) => (
                        <div key={course._id} className="p-4 hover:bg-gray-50 transition duration-150">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-medium text-gray-900 truncate">{course.title}</h3>
                              <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                            </div>
                            <div className="flex space-x-3">
                              <button
                                onClick={() => openContentAdder(course._id)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-100 transition-colors"
                              >
                                Add Content
                              </button>
                              <button
                                onClick={() => prepareEdit(course)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-100 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteCourse(course._id)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                                style={{ backgroundColor: colors.danger }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ContentAdder Popup */}
      {showContentAdder && (
        <ContentAdder 
          onClose={() => setShowContentAdder(false)}
          courseId={selectedCourseId}
        />
      )}
    </div>
  );
}