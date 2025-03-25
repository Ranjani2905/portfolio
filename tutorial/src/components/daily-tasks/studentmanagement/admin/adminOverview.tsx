import { useEffect, useState } from "react";
import axios from "axios";
import student from "../../../../assets/studentlogo.jpg";
import teacher from "../../../../assets/teacherlogo.jpg";
import { motion } from "framer-motion";
import overview from "../../../../assets/admin_overview (2).png";

function AdminOverview() {
  const [stats, setStats] = useState({ students: 0, teachers: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "student",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/admin/stats"
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Prevents page reload
    setMessage(""); // ✅ Clears the message before submitting

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      setMessage(response.data.message);

      // Reset form fields after successful submission
      setFormData({ name: "", email: "", userType: "student" });

      // Refresh admin stats after adding a new user
      fetchStats();
    } catch (error) {
      // Proper error handling
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || "Server error occurred!");
      } else {
        setMessage("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="p-6">
      <motion.div
        className="bg-gradient-to-r h-50 from-orange-200 to-orange-400 mt-12 shadow-md rounded-xl p-6 text-white flex justify-between w-full items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side: Welcome Message */}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome, <span className="text-orange-700">Admin</span>! 🎓
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Stay on top of your progress! Check your{" "}
            <span className="font-semibold text-green-500">assignments</span>,{" "}
            <span className="font-semibold text-green-500">attendance</span>,
            and <span className="font-semibold text-green-500">reports</span>{" "}
            all in one place.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="flex-shrink-0">
          <img
            className="w-80 h-80 mr-10 mt-10 object-cover rounded-full"
            src={overview}
            alt="Student"
          />
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-600">
              Total Students
            </h2>
            <p className="text-3xl font-bold text-blue-500">{stats.students}</p>
          </div>
          <img src={student} alt="Students" className="w-20 h-20" />
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-600">
              Total Teachers
            </h2>
            <p className="text-3xl font-bold text-green-500">
              {stats.teachers}
            </p>
          </div>
          <img src={teacher} alt="Teachers" className="w-20 h-20" />
        </div>
      </div>

      {/* Add User Form */}
      <div className="mt-8 bg-white shadow-md w-1/4 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full p-2 mb-3 bg-gray-100 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full p-2 mb-3 bg-gray-100 rounded"
            required
          />
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full p-2 mb-3 bg-gray-100 rounded"
          >
            <option value="student">Student</option>
            <option value="staff">Teacher</option>
          </select>
          <button
            type="submit"
            className="bg-gradient-to-r  from-orange-500 to-orange-700   hover:to-orange-800 transition-all duration-300 text-white p-2 rounded w-full"
          >
            Add User
          </button>
        </form>
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

export default AdminOverview;
