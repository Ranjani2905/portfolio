import { useEffect, useState } from "react";
import axios from "axios";

interface UploadedAssignment {
  assignmentTitle: string;
  studentName: string;
  fileUrl: string;
}

const EvaluateAssignments = () => {
  const [assignments, setAssignments] = useState<UploadedAssignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<
    UploadedAssignment[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTitle, setSelectedTitle] = useState<string>("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/submissions/view-submissions")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAssignments(response.data);
          setFilteredAssignments(response.data);
        } else if (
          response.data.assignments &&
          Array.isArray(response.data.assignments)
        ) {
          setAssignments(response.data.assignments);
          setFilteredAssignments(response.data.assignments);
        } else {
          setError("Unexpected API response format");
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching assignments:",
          error.response?.data || error.message
        );
        setError("Failed to load assignments. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTitle === "All") {
      setFilteredAssignments(assignments);
    } else {
      setFilteredAssignments(
        assignments.filter((a) => a.assignmentTitle === selectedTitle)
      );
    }
  }, [selectedTitle, assignments]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Evaluate Assignments
      </h2>

      {/* Filter Dropdown */}
      <div className="mb-6 text-center">
        <label className="text-gray-700 font-semibold mr-2">
          Filter by Title:
        </label>
        <select
          className="px-3 py-2 w-1/4 bg-gray-100  rounded-lg shadow-sm"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        >
          <option value="All">All</option>
          {Array.from(new Set(assignments.map((a) => a.assignmentTitle))).map(
            (title, idx) => (
              <option key={idx} value={title}>
                {title}
              </option>
            )
          )}
        </select>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-gray-500">Loading assignments...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Assignments List */}
      {!loading && !error && filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <p className="text-lg font-semibold text-orange-700">
                  {assignment.assignmentTitle}
                </p>
                <p className="text-sm text-gray-600">
                  Submitted by: {assignment.studentName}
                </p>
              </div>
              <div className="mt-3 flex justify-end">
                <a
                  href={assignment.fileUrl}
                  download
                  className="px-2 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center">
            No assignments uploaded yet.
          </p>
        )
      )}
    </>
  );
};

export default EvaluateAssignments;
