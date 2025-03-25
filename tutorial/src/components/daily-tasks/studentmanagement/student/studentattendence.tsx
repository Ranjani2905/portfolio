import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

interface AttendanceRecord {
  date: string;
  status: string;
}

function StudentAttendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get logged-in user's email from localStorage
  const userEmail = localStorage.getItem("userEmail");

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
      }
    }
    fetchStudentDetails();
  }, [userEmail]);

  /** 📌 Fetch Attendance Records */
  useEffect(() => {
    async function fetchAttendance() {
      if (!studentName) return;
      try {
        const response = await axios.get<AttendanceRecord[]>(
          `http://localhost:5000/api/attendance/student/${studentName}`
        );
        console.log("Fetched Attendance:", response.data);
        setAttendance(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setError("Failed to fetch attendance. Please try again.");
      }
    }
    fetchAttendance();
  }, [studentName]);

  return (
    <div className="p-6 mt-15 max-w-lg mx-auto">
      <nav className="mb-6 text-gray-700">
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
              href="/dashboard/student/attendance"
              className="hover:text-orange-600 transition-colors"
            >
              Attendance
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
              {studentName}
            </a>
          </li>
        </ul>
      </nav>
      {/* Display Student Name */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-700">
          Student: {studentName || "Fetching..."}
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg rounded-lg overflow-hidden ">
          <thead className="bg-gradient-to-r from-orange-400 to-orange-600 text-white">
            <tr>
              <th className="px-6 py-3 text-lg font-semibold text-left">
                Date
              </th>
              <th className="px-6 py-3 text-lg font-semibold text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((record, index) => (
                <tr
                  key={index}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-orange-100`}
                >
                  <td className="px-6 py-3 border-gray-300">{record.date}</td>
                  <td className="px-6 py-3 border-gray-300">{record.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentAttendance;
