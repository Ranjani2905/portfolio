import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { ChevronRight } from "lucide-react";
function ExamSchedule() {
  const [examTitle, setExamTitle] = useState(""); // Exam title
  const [exams, setExams] = useState(
    Array.from({ length: 6 }, () => ({
      subjectCode: "",
      subjectName: "",
      date: "",
    }))
  );

  const [honorsAdded, setHonorsAdded] = useState(false); // Track honors subjects

  // Add honors exams only once
  const addHonorsExams = () => {
    if (!honorsAdded) {
      setExams((prevExams) => [
        ...prevExams,
        ...Array.from({ length: 2 }, () => ({
          subjectCode: "",
          subjectName: "",
          date: "",
        })),
      ]);
      setHonorsAdded(true);
    }
  };

  // Handle changes in input fields
  const handleChange = (index: number, field: string, value: string) => {
    setExams((prevExams) =>
      prevExams.map((exam, i) =>
        i === index ? { ...exam, [field]: value } : exam
      )
    );
  };

  // Schedule exams - API Call
  const scheduleExams = async () => {
    // Validate Input Fields
    if (!examTitle.trim()) {
      toast.error("Please enter an exam title.");
      return;
    }

    for (const subject of exams) {
      // 🔄 Consider renaming exams to subjects
      if (
        !subject.subjectCode.trim() ||
        !subject.subjectName.trim() ||
        !subject.date.trim()
      ) {
        toast.error("Please fill in all subject details.");
        return;
      }
    }

    try {
      await axios.post("http://localhost:5000/api/exams/schedule-exam", {
        examTitle,
        subjects: exams,
      });

      toast.success("Exams scheduled successfully!");

      // Reset form
      setExamTitle("");
      setExams(
        Array.from({ length: 6 }, () => ({
          subjectCode: "",
          subjectName: "",
          date: "",
        }))
      );
      setHonorsAdded(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        console.error("Error scheduling exams:", error.response?.data);
        toast.error(
          error.response?.data?.message || "Failed to schedule exams."
        );
      } else {
        // Handle non-Axios errors
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
     <nav className="mb-6 mt-15 text-gray-700">
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
              href="/dashboard/teacher/exam-schedule"
              className="hover:text-orange-600 transition-colors"
            >
              Exam Schedule
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Add Honors Exams - Only Once */}
      <div className="float-right top-3 ">
        <button
          onClick={addHonorsExams}
          disabled={honorsAdded}
          className={`float-left mb-7 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${
            honorsAdded
              ? "text-gray-400 cursor-not-allowed"
              : "text-orange-600 hover:text-orange-800"
          }`}
        >
          <FontAwesomeIcon icon={faPlusCircle} className="text-2xl mr-2" />
          {honorsAdded ? "Honors Exams Added" : "Add Honors Exams"}
        </button>
      </div>
      {/* Exam Title */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Exam Title"
          value={examTitle}
          onChange={(e) => setExamTitle(e.target.value)}
          className="bg-gray-100 p-3 rounded w-full focus:ring focus:ring-orange-300 outline-none"
        />
      </div>

      {/* Exam Fields */}
      {exams.map((exam, index) => (
        <div
          key={index}
          className="grid grid-cols-3 gap-4 mb-3 p-3 rounded-lg hover:shadow-md transition-shadow duration-300"
        >
          <input
            type="text"
            placeholder="Subject Code"
            value={exam.subjectCode}
            onChange={(e) => handleChange(index, "subjectCode", e.target.value)}
            className="bg-gray-100 p-2 rounded w-full focus:ring focus:ring-orange-300 outline-none"
          />
          <input
            type="text"
            placeholder="Subject Name"
            value={exam.subjectName}
            onChange={(e) => handleChange(index, "subjectName", e.target.value)}
            className="p-2 bg-gray-100 rounded w-full focus:ring focus:ring-orange-300 outline-none"
          />
          <input
            type="date"
            value={exam.date}
            onChange={(e) => handleChange(index, "date", e.target.value)}
            className="bg-gray-100 p-2 rounded w-full focus:ring focus:ring-orange-300 outline-none"
          />
        </div>
      ))}

      {/* Schedule Exam Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={scheduleExams}
          className="bg-gradient-to-r from-orange-500 to-orange-700 hover:to-orange-800 transition-all shadow-lg mb-4 text-white p-3 rounded-lg"
        >
          Schedule Exam
        </button>
      </div>

      <ToastContainer />
    </>
  );
}

export default ExamSchedule;
