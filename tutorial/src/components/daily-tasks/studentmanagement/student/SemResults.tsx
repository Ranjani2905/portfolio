import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

interface Result {
  id: string;
  subjectName: string;
  marks: number;
}

function SemResults() {
  const [examTitles, setExamTitles] = useState<string[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [studentName, setStudentName] = useState<string | null>(null);
  const [results, setResults] = useState<Result[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get logged-in user's email from localStorage
  const userEmail = localStorage.getItem("userEmail");

  /** 📌 Fetch Exam Titles */
  useEffect(() => {
    async function fetchExamTitles() {
      try {
        const response = await axios.get<{ examTitle: string }[]>(
          "http://localhost:5000/api/exam-titles"
        );
        console.log("Fetched Exam Titles:", response.data);
        setExamTitles(response.data.map((exam) => exam.examTitle));
      } catch (error) {
        console.error("Error fetching exam titles:", error);
        setError("Failed to fetch exam titles.");
      }
    }
    fetchExamTitles();
  }, []);

  /** 📌 Fetch Student Name Based on Email */
  useEffect(() => {
    async function fetchStudentDetails() {
      if (!userEmail) return;
      try {
        const response = await axios.get<{ name: string }>(
          `http://localhost:5000/api/auth/student/${userEmail}`
        );
        console.log("Fetched Student Name:", response.data.name);
        setStudentName(response.data.name);
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError("Failed to fetch student details.");
      }
    }
    fetchStudentDetails();
  }, [userEmail]);

  /** 📌 Fetch Student's Results */
  const fetchResults = useCallback(async () => {
    if (!selectedExam || !studentName) {
      console.warn("Missing selectedExam or studentName.");
      setError("Please select an exam.");
      setResults(null);
      return;
    }

    try {
      console.log(
        `Fetching results for: Exam - ${selectedExam}, Student - ${studentName}`
      );
      const response = await axios.get(
        `http://localhost:5000/api/marks/exams/${selectedExam}/${studentName}`
      );

      console.log("API Response:", response.data);

      if (response.data && response.data.subjectWiseMarks) {
        setResults(response.data.subjectWiseMarks);
      } else {
        setResults([]);
      }

      setError(null);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError("Failed to fetch results. Please try again.");
      setResults(null);
    }
  }, [selectedExam, studentName]);

  /** 📌 Fetch Results When Exam & Student Are Available */
  useEffect(() => {
    if (selectedExam && studentName) {
      fetchResults().catch((err) =>
        console.error("Error in fetchResults:", err)
      );
    }
  }, [selectedExam, studentName, fetchResults]); // ✅ Added fetchResults as a dependency

  return (
    <div className="p-6 max-w-lg mx-auto">
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
              href="#"
              className="hover:text-orange-600 transition-colors"
            >
              Exams
            </a>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a
              href="/dashboard/student/semester-results"
              className="hover:text-orange-600 transition-colors"
            >
              Results
            </a>
          </li>
          {selectedExam && (
            <>
              <li>
                <ChevronRight size={16} className="text-gray-500" />
              </li>
              <li className="text-orange-600 font-semibold">{selectedExam}</li>
            </>
          )}
        </ul>
      </nav>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📊 Semester Results
      </h2>

      {/* Exam Selection Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="p-3 border border-gray-300 rounded-md shadow-sm w-72 text-gray-700 focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Choose an Exam</option>
          {examTitles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {/* Display Student Name */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-700">
          Student: {studentName || "Fetching..."}
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Results Table */}
      {results && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Results
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-left">
                <tr>
                  <th className="px-6 py-3 text-lg font-semibold">Subject</th>
                  <th className="px-6 py-3 text-lg font-semibold">Marks</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 ? (
                  results.map((result) => (
                    <tr
                      key={result.id}
                      className="bg-gray-100 hover:bg-orange-100 transition"
                    >
                      <td className="px-6 py-3">{result.subjectName}</td>
                      <td className="px-6 py-3">{result.marks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-4 text-gray-500">
                      No results available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SemResults;
