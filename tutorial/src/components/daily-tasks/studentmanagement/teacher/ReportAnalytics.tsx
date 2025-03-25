import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { ChevronRight } from "lucide-react";

const ExamAnalysis = () => {
  type Subject = { subjectCode: string; subjectName: string; date: string };
  type Performer = { studentName: string; totalMarks: number };
  type FirstMark = { _id: string; highestMarks: number };
  type PassFailCount = { pass: number; fail: number };
  type FilteredStudent = {
    studentName: string;
    subjectName: string;
    marks: number;
  };
  interface RankData {
    studentName: string;
    totalMarks: number;
  }

  const [examTitles, setExamTitles] = useState<string[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [topPerformers, setTopPerformers] = useState<Performer[]>([]);
  const [passFailCount, setPassFailCount] = useState<PassFailCount>({
    pass: 0,
    fail: 0,
  });
  const [minMarks, setMinMarks] = useState<number>(0);
  const [maxMarks, setMaxMarks] = useState<number>(100);
  const [filteredStudents, setFilteredStudents] = useState<FilteredStudent[]>(
    []
  );
  const [rankList, setRankList] = useState<RankData[]>([]);
  // Sort data based on totalMarks

  const [firstMarks, setFirstMarks] = useState<FirstMark[]>([]);
  useEffect(() => {
    if (!selectedExam) return; // Prevents unnecessary API calls

    axios
      .get(`http://localhost:5000/api/marks/rank-list/${selectedExam}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setRankList(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          setRankList([]); // Default to an empty array if data is invalid
        }
      })
      .catch((error) => console.error("Error fetching rank list:", error));
  }, [selectedExam]);
  useEffect(() => {
    async function fetchExamTitles() {
      try {
        const response = await axios.get<{ examTitle: string }[]>(
          "http://localhost:5000/api/exam-titles"
        );
        setExamTitles(response.data.map((exam) => exam.examTitle));
      } catch (error) {
        console.error("Error fetching exam titles:", error);
      }
    }
    fetchExamTitles();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      axios
        .get(`http://localhost:5000/api/marks/exams/${selectedExam}`)
        .then((response) => setSubjects(response.data.subjects ?? []))
        .catch((error) => console.error("Error fetching exam details:", error));

      axios
        .get(`http://localhost:5000/api/marks/top-performers/${selectedExam}`)
        .then((response) => setTopPerformers(response.data || []))
        .catch((error) =>
          console.error("Error fetching top performers:", error)
        );
    }
  }, [selectedExam]);

  useEffect(() => {
    if (selectedExam && subjects.length > 0) {
      axios
        .get(`http://localhost:5000/api/marks/first-mark/${selectedExam}`)
        .then((response) => setFirstMarks(response.data))
        .catch((error) => console.error("Error fetching first marks:", error));
    }
  }, [selectedExam, subjects]);

  useEffect(() => {
    if (selectedExam && selectedSubject) {
      axios
        .get(
          `http://localhost:5000/api/marks/pass-fail-count?examTitle=${selectedExam}&subjectName=${selectedSubject}`
        )
        .then((response) => setPassFailCount(response.data))
        .catch((error) =>
          console.error("Error fetching pass/fail count:", error)
        );
    }
  }, [selectedExam, selectedSubject]);
  const fetchFilteredStudents = () => {
    if (selectedExam && selectedSubject) {
      axios
        .get(
          `http://localhost:5000/api/marks/filter-students?examTitle=${selectedExam}&subjectName=${selectedSubject}&min=${minMarks}&max=${maxMarks}`
        )
        .then((response) => setFilteredStudents(response.data))
        .catch((error) => console.error("Error filtering students:", error));
    }
  };

  return (
    <div className="container mx-auto ">
      <nav className="mb-6  text-gray-700">
        <ul className="flex items-center mt-15 space-x-2 text-sm font-medium">
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
              Report
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
          {selectedSubject && (
            <>
              <li>
                <ChevronRight size={16} className="text-gray-500" />
              </li>
              <li className="text-orange-600 font-semibold">{selectedSubject}</li>
            </>
          )}
          
        </ul>
      </nav>
      {/* Filters Container - Aligned in One Row */}
      <div className="flex flex-wrap justify-items-start items-end gap-6 mb-6">
        {/* Exam Dropdown */}
        <div className="flex flex-col">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-52 bg-white shadow-md text-gray-900 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
          >
            <option value="">Choose an Exam</option>
            {examTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Dropdown */}
        {subjects.length > 0 && (
          <div className="flex flex-col">
            <select
              className="border border-gray-300 p-2 rounded-lg w-52 bg-white shadow-md text-gray-900 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.subjectName}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Marks Filters */}
        {selectedSubject && (
          <>
            <div className="flex flex-col">
              <input
                type="number"
                className="border p-2 rounded-lg w-32 bg-white shadow-md"
                placeholder="Min Marks"
                value={minMarks}
                onChange={(e) => setMinMarks(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col">
              <input
                type="number"
                className="border p-2 rounded-lg w-32 bg-white shadow-md"
                placeholder="Max Marks"
                value={maxMarks}
                onChange={(e) => setMaxMarks(Number(e.target.value))}
              />
            </div>

            {/* Filter Button */}
            <div className="flex items-end">
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition"
                onClick={fetchFilteredStudents}
              >
                Filter
              </button>
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto p-6">
        {/* Filtered Students Table */}
        {filteredStudents.length > 0 && (
          <div className="bg-white  transition-transform transform hover:scale-105 shadow-lg rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold mb-3">🎯 Filtered Students</h3>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-orange-400 to-orange-700 text-white text-lg">
                  <th className="p-3 border">Student Name</th>
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border">Marks</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={index}
                    className={`text-center  ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-orange-200 transition duration-300`}
                  >
                    <td className="p-3 ">{student.studentName}</td>
                    <td className="p-3 ">{student.subjectName}</td>
                    <td className="p-3 ">{student.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        {topPerformers.length > 0 && (
          <div className="bg-white  transition-transform transform hover:scale-105 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🏆 Top Performers</h3>
            <BarChart width={400} height={300} data={topPerformers}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <XAxis dataKey="studentName" />
              <YAxis />
              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  const data = payload[0].payload as RankData;
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-md">
                      <p className="text-gray-800 font-semibold">
                        {data.studentName}
                      </p>
                      <p className="text-gray-600">
                        Total Marks: {data.totalMarks}
                      </p>
                    </div>
                  );
                }}
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              />
              <Legend />

              <Bar
                dataKey="totalMarks"
                fill="url(#colorGradient)"
                barSize={40}
                label={{ position: "top", fill: "#000" }}
              />
            </BarChart>
          </div>
        )}
        {rankList.length > 0 && (
          <div className="bg-white  transition-transform transform hover:scale-105 shadow-lg rounded-lg p-6 min-h-[400px]">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              🏅 Student Ranks
            </h3>

            <div className="flex justify-center">
              <ResponsiveContainer width="90%" height={400}>
                <BarChart
                  data={rankList}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <XAxis
                    dataKey="studentName"
                    tick={{ fill: "#4A5568", fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    reversed
                    tick={{ fill: "#4A5568", fontSize: 12 }}
                    label={{
                      value: "Marks",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#4A5568",
                      fontSize: 14,
                    }}
                  />

                  {/* Tooltip with Explicit Type */}
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload || payload.length === 0) return null;
                      const data = payload[0].payload as RankData;
                      return (
                        <div className="bg-white p-2 rounded-lg shadow-md">
                          <p className="text-gray-800 font-semibold">
                            {data.studentName}
                          </p>
                          <p className="text-gray-600">
                            Total Marks: {data.totalMarks}
                          </p>
                        </div>
                      );
                    }}
                    cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                  />

                  <Legend />

                  {/* Gradient for Bar */}
                  <defs>
                    <linearGradient
                      id="rankGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#FFA500"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>

                  <Bar
                    dataKey="totalMarks"
                    fill="url(#rankGradient)"
                    barSize={40}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {/* Pass/Fail Count */}
        {selectedSubject && (
          <div className="bg-white transition-transform transform hover:scale-105 shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">📊 Pass vs Fail</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={[
                  { name: "Pass", value: passFailCount.pass, fill: "#28a745" }, // Green for Pass
                  { name: "Fail", value: passFailCount.fail, fill: "#dc3545" }, // Red for Fail
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}

        {/* Highest Marks Trend */}
        {firstMarks.length > 0 && (
          <div className=" bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 ">
            <h3 className="text-lg font-semibold mb-3">
              📈 Highest Marks Trend
            </h3>
            <LineChart width={400} height={300} data={firstMarks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="highestMarks" stroke="#4A90E2" />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamAnalysis;
