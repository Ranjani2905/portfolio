import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaClipboardList,
  FaCalendarAlt,
  FaBullhorn,
  FaChartLine,
  FaUserGraduate,
  FaComments,
} from "react-icons/fa";
import img from "../../../../assets/8bb5f492daee404e4ee2e9fc8524702a-removebg-preview.png";

const StudentOverview = () => {
  const [studentName, setStudentName] = useState("Student"); // Default fallback name

  // Fetch the stored name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setStudentName(storedName);
    }
  }, []);

  return (
    <>
      {/* Welcome Section Container */}
      <motion.div
        className="bg-gradient-to-r h-50 from-orange-300 to-orange-700 mt-15 shadow-md rounded-xl p-6 text-white flex justify-between w-full items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side: Welcome Message */}
        <div className="flex-1">
        <h1 className="text-3xl font-extrabold text-gray-800">
  Welcome, <span className="text-orange-700">{studentName}</span>! 🎓
</h1>
<p className="mt-3 text-lg text-gray-600">
  Stay on top of your progress! Check your <span className="font-semibold text-orange-700">Assignments</span>, <span className="font-semibold text-orange-700">Attendance</span>, and <span className="font-semibold text-orange-700">Reports</span> all in one place.
</p>

        </div>

        {/* Right Side: Image */}
        <div className="flex-shrink-0">
          <img
            className="w-50 h-50 mr-10 mt-10 object-cover rounded-full"
            src={img}
            alt="Student"
          />
        </div>
      </motion.div>

      {/* Dashboard Grid Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Assignments */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md border-orange-300 border-l-8 flex items-center">
          <FaClipboardList className="text-orange-600 text-2xl mr-3" />
          <div>
            <a className="text-lg font-semibold" href="/dashboard/student/upcoming-assignments">Upcoming Assignments</a>
            <p className="text-gray-700 text-sm">
              Check and submit your pending assignments.
            </p>
          </div>
        </div>

        {/* Attendance Status */}
        <div className="bg-orange-200 p-4 rounded-lg shadow-md border-l-8 border-orange-400 flex items-center">
          <FaBook className="text-orange-700 text-2xl mr-3" />
          <div>
            <a href="/dashboard/student/attendance" className="text-lg font-semibold">Attendance Status</a>
            <p className="text-gray-700 text-sm">
              Track your attendance records.
            </p>
          </div>
        </div>

        {/* Exam Schedule */}
        <div className="bg-orange-300 p-4 rounded-lg border-l-8 border-orange-500 shadow-md flex items-center">
          <FaCalendarAlt className="text-orange-800 text-2xl mr-3" />
          <div>
            <a href="dashboard/student/timetable1" className="text-lg font-semibold">Exam Schedule</a>
            <p className="text-gray-700 text-sm">
              View your upcoming exams and timetable.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaBullhorn className="text-red-500 text-2xl mr-2" />
            <a href="/dashboard/student/announcements" className="text-lg font-semibold">Recent Announcements</a>
          </div>
          <ul className="text-gray-700 text-sm list-disc pl-5">
            <li>New semester starts on April 10th.</li>
            <li>Project submission deadline: March 25th.</li>
            <li>Guest lecture on AI this Friday.</li>
          </ul>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-purple-500 text-2xl mr-2" />
            <h2 className="text-lg font-semibold">Progress Tracker</h2>
          </div>
          <p className="text-gray-700 text-sm">
            Keep track of your academic progress.
          </p>
          <div className="mt-3 bg-gray-200 rounded-full h-3">
            <div className="bg-purple-500 h-3 rounded-full w-3/4"></div>
          </div>
          <p className="text-gray-700 text-xs mt-1">75% Completion</p>
        </div>
      </div>

      {/* Extra Features */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student Profile */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md flex items-center">
          <FaUserGraduate className="text-orange-700 text-2xl mr-3" />
          <div>
            <h2 className="text-lg font-semibold">Student Profile</h2>
            <p className="text-gray-700 text-sm">
              Update your personal details and preferences.
            </p>
          </div>
        </div>

        {/* Discussion Forums */}
        <div className="bg-orange-200 p-4 rounded-lg shadow-md flex items-center">
          <FaComments className="text-orange-800 text-2xl mr-3" />
          <div>
            <h2 className="text-lg font-semibold">Discussion Forums</h2>
            <p className="text-gray-700 text-sm">
              Engage with peers and faculty in discussions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentOverview;
