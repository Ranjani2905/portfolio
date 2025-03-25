import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import present from "../../../../assets/present.png";
import absent from "../../../../assets/absent.png";
import onduty from "../../../../assets/on-duty.png";

import img from "../../../../assets/89d0f1d99ebe5e07a6f714f5da4c24d2-removebg-preview.png";
interface TopPerformer {
  studentName: string;
  totalMarks: number;
}

interface Rank {
  studentName: string;
  rank: number;
}
interface AttendanceSummary {
  present: number;
  absent: number;
  onDuty: number;
}

interface Assignment {
  title: string;
  dueDate: string; // Assuming the API returns YYYY-MM-DD format
}

const Overview = () => {
  const [summary, setSummary] = useState<AttendanceSummary>({
    present: 0,
    absent: 0,
    onDuty: 0,
  });
  const [examTitles, setExamTitles] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAssignments, setLoadingAssignments] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorAssignments, setErrorAssignments] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([]);
  const [rankList, setRankList] = useState<Rank[]>([]);

  const [TeacherName, setTeacherName] = useState("Student"); // Default fallback name

  // Fetch the stored name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setTeacherName(storedName);
    }
  }, []);
  useEffect(() => {
    const fetchExamTitles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/marks/exam-titles"
        );
        if (!response.ok) throw new Error("Failed to fetch exam titles");
        const data = await response.json();
        setExamTitles(data);
      } catch (error) {
        console.error("Error fetching exam titles:", error);
      }
    };

    fetchExamTitles(); // ✅ Call the function here
  }, []);

  useEffect(() => {
    if (!selectedExam) return;

    // Fetch top performers
    const fetchTopPerformers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/marks/top-performers/${selectedExam}`
        );
        if (!response.ok) throw new Error("Failed to fetch top performers");
        const data = await response.json();
        setTopPerformers(data);
      } catch (error) {
        console.error("Error fetching top performers:", error);
      }
    };

    // Fetch rank list
    const fetchRankList = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/marks/rank-list/${selectedExam}`
        );
        if (!response.ok) throw new Error("Failed to fetch rank list");
        const data = await response.json();
        setRankList(data);
      } catch (error) {
        console.error("Error fetching rank list:", error);
      }
    };

    fetchTopPerformers();
    fetchRankList();
  }, [selectedExam]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch attendance summary
        const summaryResponse = await fetch(
          "http://localhost:5000/api/attendance/summary?date=2025-03-19"
        );
        if (!summaryResponse.ok)
          throw new Error("Failed to fetch attendance summary");
        const summaryData = await summaryResponse.json();
        setSummary(summaryData);

        // Fetch exam titles
        const examResponse = await fetch(
          "http://localhost:5000/api/exam-titles"
        );
        if (!examResponse.ok) throw new Error("Failed to fetch exam titles");
        const examData = await examResponse.json();

        // Extract exam titles correctly
        setExamTitles(
          examData.map((exam: { examTitle: string }) => exam.examTitle)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Could not fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoadingAssignments(true);
        setErrorAssignments(null);

        const response = await fetch("http://localhost:5000/api/assignments");
        if (!response.ok) throw new Error("Failed to fetch assignments");

        const data = await response.json();
        setAssignments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setErrorAssignments("Could not fetch assignments.");
      } finally {
        setLoadingAssignments(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section Container */}
      <motion.div
        className="bg-gradient-to-r mt-12 h-50 mb-7 from-orange-400 to-orange-600 shadow-md rounded-xl p-6 text-white flex justify-between w-full items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side: Welcome Message */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            Welcome, <span className="text-white">{TeacherName}</span>! 🎓
          </h1>
          <p className="mt-2">
            Explore your dashboard to check assignments, attendance, reports,
            and more.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="flex-shrink-0">
          <img
            className="w-90 h-90 mt-9 mr-10  object-cover rounded-full"
            src={img}
            alt="Student"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-[#ffd8d2]  to-[#e3b2bb] p-2 border-l-8 border-red-400 rounded-xl shadow-md flex items-center justify-between">
          {/* Left Side: Text Content */}
          <div className="text-left">
            <h3 className="text-xl ml-8 font-semibold text-red-700">Present</h3>
            <p className="text-3xl ml-8 font-bold">{summary.present}</p>
          </div>

          {/* Right Side: Image */}
          <img
            src={present}
            alt="Present Status"
            className="w-32 h-32 object-cover"
          />
        </div>
        <div className="bg-gradient-to-r from-[#d4e3fa] to-[#a3c6ff] p-4 border-l-8 border-blue-400  rounded-xl shadow-md flex items-center justify-between">
          {/* Left Side: Text Content */}
          <div className="text-left">
            <h3 className="text-xl font-semibold ml-8 text-blue-700">Absent</h3>
            <p className="text-3xl ml-8 font-bold">{summary.absent}</p>
          </div>

          {/* Right Side: Image */}
          <img
            src={absent}
            alt="Absent Status"
            className="w-26 h-26 object-cover"
          />
        </div>

        <div className="bg-gradient-to-r from-[#caf5da] to-[#3CBAB2] p-4 rounded-xl  shadow-md border-l-8 border-green-400 flex items-center justify-between">
          {/* Left Side: Text Content */}
          <div className="text-left">
            <h3 className="text-xl ml-8 font-semibold text-green-700">
              On Duty
            </h3>
            <p className="text-3xl ml-8 font-bold">{summary.onDuty}</p>
          </div>

          {/* Right Side: Image */}
          <img src={onduty} alt="On Duty" className="w-26 h-26 object-cover" />
        </div>
      </div>
      <div className="mb-6">
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="p-2 mt-7 bg-gray-100 rounded-md w-1/4"
        >
          <option value="">-- Select Exam --</option>
          {Array.isArray(examTitles) && examTitles.length > 0 ? (
            examTitles
              .filter(
                (title) => typeof title === "string" && title.trim() !== ""
              ) // Ensure only valid strings
              .map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))
          ) : (
            <option disabled>No exams available</option>
          )}
        </select>
      </div>

      {selectedExam && (
        <div className="grid grid-cols-2 gap-6">
          {/* Top Performers - Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-[#FF9800]">
              🏆 Top Performers
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={topPerformers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis
                  dataKey="studentName"
                  tick={{ fill: "#FF9800", fontSize: 14 }}
                />
                <YAxis tick={{ fill: "#FF9800", fontSize: 14 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: "8px",
                    border: "1px solid #FF9800",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#000" }}
                />
                <Line
                  type="monotone"
                  dataKey="totalMarks"
                  stroke="#FF9800"
                  strokeWidth={3}
                  dot={{
                    fill: "#FF9800",
                    r: 6,
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 8, fill: "#FF5722" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Rank List - Horizontal Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-[#E65100]">
              📊 Rank List
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rankList} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis type="number" tick={{ fill: "#E65100", fontSize: 14 }} />
                <YAxis
                  dataKey="studentName"
                  type="category"
                  tick={{ fill: "#E65100", fontSize: 14 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: "8px",
                    border: "1px solid #E65100",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#000" }}
                />
                <Bar
                  dataKey="totalMarks"
                  fill="#E65100"
                  barSize={20}
                  radius={[8, 8, 0, 0]}
                  onMouseOver={(e) => (e.target.style.fill = "#FF9800")}
                  onMouseOut={(e) => (e.target.style.fill = "#E65100")}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="flex justify-start gap-6 mt-6">
        <div className="bg-purple-100 w-1/2 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">
            Scheduled Exams
          </h3>
          {loading ? (
            <p className="text-gray-500">Loading exams...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : examTitles.length > 0 ? (
            <ul className="space-y-3">
              {examTitles.map((title, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md"
                >
                  <span className="font-semibold">{title}</span>
                  <span className="text-xs px-3 py-1 bg-purple-500 text-white rounded-full">
                    {title.includes("Semester") ? "Semester Exam" : "Midterm"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No exams scheduled.</p>
          )}
        </div>

        <div className="bg-blue-100 w-1/2 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            Upcoming Assignments
          </h3>
          {loadingAssignments ? (
            <p className="text-gray-500">Loading assignments...</p>
          ) : errorAssignments ? (
            <p className="text-red-500">{errorAssignments}</p>
          ) : assignments.length > 0 ? (
            <ul className="space-y-3">
              {assignments.map((assignment, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md"
                >
                  <span className="font-semibold">{assignment.title}</span>
                  <span className="text-xs px-3 py-1 bg-blue-500 text-white rounded-full">
                    Due: {assignment.dueDate}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No assignments due.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
