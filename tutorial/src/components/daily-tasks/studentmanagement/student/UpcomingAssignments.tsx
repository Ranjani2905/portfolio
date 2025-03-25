import { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud, ChevronDown, Calendar } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { ChevronRight } from "lucide-react"; // Icon for breadcrumbs

interface Assignment {
  _id: string;
  title: string;
  deadline: string;
  rubrics: { criteria: string; marks: number }[];
}

const AssignmentTimeline = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assignments")
      .then((response) => {
        const sortedAssignments = response.data.sort(
          (a: Assignment, b: Assignment) =>
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
        setAssignments(sortedAssignments);
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !selectedAssignment || !studentName) {
      toast.error("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("assignmentTitle", selectedAssignment);
    formData.append("assignment", file);

    try {
      await axios.post(
        "http://localhost:5000/api/submissions/upload-submission",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Assignment submitted successfully!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to submit assignment."
        );
        console.error("Axios error:", error.response?.data);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <nav className="mb-6 mt-15 text-gray-700">
        <ul className="flex items-center space-x-2 text-sm font-medium">
          <li>
            <a
              href="/dashboard/student/overview"
              className="hover:text-orange-600 transition-colors"
            >
              Overview
            </a>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a
              href="/dashboard/student/timetable1"
              className="hover:text-orange-600 transition-colors"
            >
              Assignments
            </a>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a
              href="/dashboard/student/upcoming-assignments"
              className="hover:text-orange-600 transition-colors"
            >
              Upcoming Assignments
            </a>
          </li>
          {selectedAssignment && (
            <>
              <li>
                <ChevronRight size={16} className="text-gray-500" />
              </li>
              <li className="text-orange-600 font-semibold">
                {selectedAssignment}
              </li>
            </>
          )}
        </ul>
      </nav>

      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-2xl">
        <div className="relative border-l-4 border-orange-500 pl-5">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <div key={assignment._id} className="mb-6 relative">
                <div
                  className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md cursor-pointer"
                  onClick={() =>
                    setSelectedAssignment(
                      selectedAssignment === assignment.title
                        ? null
                        : assignment.title
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <Calendar className="text-white w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-lg text-orange-600">
                      {assignment.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      selectedAssignment === assignment.title
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
                {selectedAssignment === assignment.title && (
                  <div className="bg-gray-50 p-4 rounded-lg mt-2 shadow-md">
                    <p>
                      <strong>📅 Deadline:</strong>{" "}
                      {new Date(assignment.deadline).toLocaleDateString()}
                    </p>
                    <table className="w-1/4 rounded-lg shadow-md overflow-hidden">
                      <thead className="bg-gradient-to-r from-orange-500 to-orange-700 hover:to-orange-800 transition-all duration-300 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">
                            Criteria
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            Marks (out of 5)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignment.rubrics.map((rubric, i) => (
                          <tr
                            key={i}
                            className={`${
                              i % 2 === 0 ? "bg-gray-100" : "bg-white"
                            } transition-all duration-200`}
                          >
                            <td className="px-4 py-3">{rubric.criteria}</td>
                            <td className="px-4 py-3">{rubric.marks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-4">
                      <label className="block font-semibold mb-2">
                        Student Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="bg-gray-100 p-2 w-full"
                      />
                      <label className="block font-semibold mt-3 mb-2">
                        Upload Assignment (PDF only)
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="bg-gray-100 p-2 w-full"
                      />
                      <button
                        onClick={handleSubmit}
                        className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-700   hover:to-orange-800 transition-all duration-300 text-white rounded-md flex items-center gap-2"
                      >
                        <UploadCloud size={18} /> Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No upcoming assignments.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AssignmentTimeline;
