import { useState, useEffect } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// Toast Configuration
import { ChevronRight } from "lucide-react";
interface Student {
  _id: string;
  name: string;
  email: string;
}

type Subject = {
  _id: string;
  subjectCode?: string;
  subjectName: string;
  date: string;
};

interface MarkEntry {
  studentId: string;
  subjectId: string;
  marks: number | "";
}

function EnterMarks() {
  const [examTitles, setExamTitles] = useState<string[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [marks, setMarks] = useState<MarkEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch Exam Titles
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exam-titles")
      .then((res) => {
        setExamTitles(
          res.data.map((exam: { examTitle: string }) => exam.examTitle)
        );
      })
      .catch((err) => {
        console.error("Error fetching exam titles:", err);
        setError("Failed to fetch exam titles.");
      });
  }, []);

  // ✅ Fetch Students & Subjects when exam is selected
  useEffect(() => {
    if (selectedExam) {
      axios
        .get(`http://localhost:5000/api/exams/${selectedExam}`)
        .then((res) => {
          setStudents(res.data.students);
          setSubjects(res.data.subjects);
          setMarks(
            res.data.students.flatMap((student: Student) =>
              res.data.subjects.map((subject: Subject) => ({
                studentId: student._id,
                subjectId: subject._id,
                subjectCode: subject.subjectCode || subject._id, // ✅ Ensuring subjectCode exists
                subjectName: subject.subjectName,
                marks: "", // Default value
              }))
            )
          );
        })
        .catch((err) => {
          console.error("Error fetching exam details:", err);
          setError("Failed to fetch exam details.");
        });
    }
  }, [selectedExam]);

  // ✅ Handle Marks Input Change
  const handleMarksChange = (
    studentId: string,
    subjectId: string,
    value: number
  ) => {
    setMarks((prevMarks) =>
      prevMarks.map((mark) =>
        mark.studentId === studentId && mark.subjectId === subjectId
          ? { ...mark, marks: value }
          : mark
      )
    );
  };

  // ✅ Submit Marks to Backend with Toast Notifications
  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/marks", {
        examTitle: selectedExam, // ✅ Ensure examTitle is included
        marks: students.flatMap((student) =>
          subjects.map((subject) => ({
            studentId: student._id,
            studentName: student.name,
            studentEmail: student.email || "example@email.com", // ✅ Add studentEmail if missing
            examTitle: selectedExam, // ✅ Ensure this is passed
            subjectId: subject._id,
            subjectCode: subject.subjectCode, // ✅ Ensure this exists
            subjectName: subject.subjectName,
            marks:
              marks.find(
                (m) =>
                  m.studentId === student._id && m.subjectId === subject._id
              )?.marks || 0, // ✅ Fix missing marks issue
            totalMarks: 100, // ✅ Ensure totalMarks is passed
          }))
        ),
      })
      .then((res) => console.log("✅ Marks saved successfully:", res))
      .catch((err) => console.error("❌ Error saving marks:", err));
  };

  return (
    <div className="p-4 mt-15">
      <nav className="mb-6  text-gray-700">
        <ul className="flex items-center space-x-2 text-sm font-medium">
          <li>
            <a
              href="/dashboard/teacher/teacheroverview"
              className="hover:text-orange-600 transition-colors"
            >
              Overview
            </a>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a href="#" className="hover:text-orange-600 transition-colors">
              Exams
            </a>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a
              href="/dashboard/teacher/exam-schedule"
              className="hover:text-orange-600 transition-colors"
            >
              Exam Schedule
            </a>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a
              href="/dashboard/teacher/marks-entry"
              className="hover:text-orange-600 transition-colors"
            > Mark Entry</a>
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
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Exam Selection */}
      <select
        className="bg-gray-100 p-2 rounded-md w-1/4 mb-4 focus:border border-orange"
        value={selectedExam}
        onChange={(e) => setSelectedExam(e.target.value)}
      >
        <option value=""> Select Exam </option>
        {examTitles.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>

      {/* ✅ Marks Entry Table */}
      {students.length > 0 && subjects.length > 0 && (
        <table className="w-full mt-4 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-400 to-orange-700 text-white">
            <tr>
              <th className="p-3 text-left">Student Name</th>
              {subjects.map((subject) => (
                <th key={subject._id} className="p-3 text-left">
                  {subject.subjectName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-3">{student.name}</td>
                {subjects.map((subject) => (
                  <td key={subject._id} className="p-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full p-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={
                        marks.find(
                          (m) =>
                            m.studentId === student._id &&
                            m.subjectId === subject._id
                        )?.marks || ""
                      }
                      onChange={(e) =>
                        handleMarksChange(
                          student._id,
                          subject._id,
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Submit Button */}
      {students.length > 0 && subjects.length > 0 && (
        <button
          className={`mt-4 float-right mb-10 bg-gradient-to-r from-orange-500 to-orange-700 hover:to-orange-800 transition-all duration-300 text-white py-2 px-4 rounded ${
            !selectedExam ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedExam}
          onClick={handleSubmit}
        >
          Save Marks
        </button>
      )}
    </div>
  );
}

export default EnterMarks;
