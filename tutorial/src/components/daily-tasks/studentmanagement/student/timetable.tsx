import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react"; // Icon for breadcrumbs

interface Subject {
  subjectCode: string;
  subjectName: string;
  date: string;
}

interface Exam {
  examTitle: string;
  subjects: Subject[];
}

function Timetable() {
  const [examTitles, setExamTitles] = useState<string[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [examData, setExamData] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [titlesRes, examsRes] = await Promise.all([
          axios.get<{ examTitle: string }[]>(
            "http://localhost:5000/api/exam-titles"
          ),
          axios.get<Exam[]>("http://localhost:5000/api/all-exams"),
        ]);

        setExamTitles(titlesRes.data.map((exam) => exam.examTitle));
        setExamData(examsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleExamSelect = (examTitle: string) => {
    setSelectedExam(examTitle);
    const selectedExamData = examData.find(
      (exam) => exam.examTitle === examTitle
    );
    setSubjects(selectedExamData ? selectedExamData.subjects : []);
  };

  return (
    <div className="p-6 mt-10 max-w-3xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-gray-700">
        <ul className="flex items-center space-x-2 text-sm font-medium">
          <li>
            <a href="/dashboard/student/overview" className="hover:text-orange-600 transition-colors">
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
              Exams
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

      

      {loading && <p className="text-center text-blue-500">Loading exams...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex  mb-6">
          <select
            value={selectedExam}
            onChange={(e) => handleExamSelect(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm w-64 text-gray-700 focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select an Exam</option>
            {examTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedExam && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
            {selectedExam} - Subjects
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-left">
                <tr>
                  <th className="px-6 py-3 text-lg font-semibold">
                    Subject Code
                  </th>
                  <th className="px-6 py-3 text-lg font-semibold">
                    Subject Name
                  </th>
                  <th className="px-6 py-3 text-lg font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-orange-100 transition`}
                    >
                      <td className="px-6 py-3">{subject.subjectCode}</td>
                      <td className="px-6 py-3">{subject.subjectName}</td>
                      <td className="px-6 py-3">{subject.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">
                      No subjects available for this exam.
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

export default Timetable;
