import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import background from "../../../assets/college.jpg";
import student from "../../../assets/clgstud.jpg";
import staff from "../../../assets/teacher.jpg";
import admin from "../../../assets/admin.jpg";

const profileImages: Record<"student" | "teacher" | "admin", string> = {
  student: student,
  teacher: staff,
  admin: admin,
};

function LoginOrSignup() {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isRegistering
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const requestData = isRegistering
        ? { ...formData, userType }
        : { email: formData.email, password: formData.password };

      const response = await axios.post(endpoint, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201 || response.status === 200) {
        if (!isRegistering) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userType", response.data.user.userType);
          localStorage.setItem("userName", response.data.user.name);
          localStorage.setItem("userEmail", response.data.user.email); // ✅ Store Email
          console.log("Stored Email:", localStorage.getItem("userEmail")); // ✅ Debugging log

          // Redirect based on userType
          if (response.data.user.userType === "student") {
            navigate("/dashboard/student/overview");
          } else if (response.data.user.userType === "staff") {
            navigate("/dashboard/teacher/teacheroverview");
          } else if (response.data.user.userType === "admin") {
            navigate("/dashboard/admin/adminoverview");
          }
          console.log("UserType from API:", response.data.user.userType);
        } else {
          alert("Registration successful! Please log in.");
          setIsRegistering(false);
        }
      } else {
        setError(response.data.msg || "Something went wrong!");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg || "Request failed!");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong!");
      }
      console.error("Auth error:", err);
    }

    setLoading(false);
  };

  const userImage =
    userType && userType in profileImages
      ? profileImages[userType as keyof typeof profileImages]
      : profileImages.student;

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40 max-w-md w-full text-center">
        <img
          src={userImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-white mb-4 shadow-md"
        />

        <h2 className="text-3xl font-bold text-red-700 mb-6 capitalize">
          {isRegistering ? "Register" : "Login"}
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 pl-10 border rounded-lg bg-gray-200"
                required
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 border rounded-lg bg-gray-200"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 pl-10 border rounded-lg bg-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-gray-700">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            className="text-red-600 cursor-pointer ml-1"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginOrSignup;
