import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { ChevronRight } from "lucide-react";

interface Student {
  id: string;
  name: string;
  status?: string;
}

const Attendance = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch students and attendance records on page load & date change
  useEffect(() => {
    fetchStudents();
    fetchSubmittedAttendance();
  }, [date]); // Dependency added
  //Fetch data when date changes

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/student");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data: { name: string; id: string }[] = await response.json();

      setStudents(
        data.map((student) => ({
          id: student.id,
          name: student.name,
          status: "",
        }))
      );
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchSubmittedAttendance = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/attendance/get-attendance?date=${date}`
      );
      if (!response.ok) throw new Error("Failed to fetch attendance");

      const data: { id: string; name: string; status: string }[] =
        await response.json();
      setStudents(data); // Update the student list with submitted data
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const markAttendance = (id: string, status: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const submitAttendance = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/attendance/mark-attendance",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, attendance: students }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Attendance submitted successfully!");
        fetchSubmittedAttendance(); // Fetch latest attendance after submission
      } else {
        setMessage(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setMessage("❌ Error submitting attendance");
    } finally {
      setLoading(false);
    }
  };

  const downloadAttendance = () => {
    let csvContent = "data:text/csv;charset=utf-8,Name,Status,Date\n";
    students.forEach(({ name, status }) => {
      csvContent += `${name},${status || "Not Marked"},${date}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, `Attendance_${date}.csv`);
  };

  return (
    <>
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
              Attendance
            </a>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a
              href="/dashboard/teacher/teacherattendance"
              className="hover:text-orange-600 transition-colors"
            >
              Mark Attendance
            </a>
          </li>
         
         
        </ul>
      </nav>
   

      <div className="mb-4 ">
        <label className="font-semibold">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="ml-2 p-2 bg-gray-100 rounded"
        />
      </div>

      {students.length > 0 ? (
        <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-500 to-orange-700   hover:to-orange-800 transition-all duration-300  text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(({ id, name, status }, index) => (
              <tr
                key={id}
                className={` border-gray-200 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-3">{name}</td>
                <td className="p-2">
                  <select
                    value={status}
                    onChange={(e) => markAttendance(id, e.target.value)}
                    className="p-2 rounded-lg w-2/3 bg-gray-100 border border-gray-300 shadow-md"
                  >
                    <option value="">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="On Duty">On Duty</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No students found.</p>
      )}

      {students.length > 0 && (
        <>
          <button
            onClick={submitAttendance}
            className="mt-4 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>

          <button
            onClick={downloadAttendance}
            className="mt-4 ml-2 bg-gradient-to-r from-orange-500 to-orange-700   hover:to-orange-800 transition-all duration-300  text-white px-4 py-2 rounded"
          >
            Download Attendance
          </button>
        </>
      )}

      {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
    </>
  );
};

export default Attendance;
