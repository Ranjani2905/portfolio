import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import successImage from "../../assets/calc.png";

interface Student {
  name: string;
  rollNumber: string;
  department: string;
  email: string;
  phoneNumber: string;
}

const EditStudent = () => {
  const { rollNumber } = useParams<{ rollNumber: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedStudents: Student[] = JSON.parse(
      localStorage.getItem("students") || "[]"
    );
    const foundStudent = storedStudents.find(
      (s) => s.rollNumber === rollNumber
    );
    if (foundStudent) {
      setStudent(foundStudent);
    }
  }, [rollNumber]);

  const handleSave = () => {
    if (!student) return;
    const storedStudents: Student[] = JSON.parse(
      localStorage.getItem("students") || "[]"
    );
    const updatedStudents = storedStudents.map((s) =>
      s.rollNumber === rollNumber ? student : s
    );
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setShowModal(true);
  };

  if (!student) {
    return <p className="text-center text-red-500">Student not found!</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-300 to-purple-400">
      <div className="p-8 max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg rounded-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate("/studenttable")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="mr-2" /> Back to Table
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit {student.name}'s Details
        </h1>

        {/* Form Fields */}
        {[
          { label: "Name", key: "name" },
          { label: "Roll Number", key: "rollNumber" },
          { label: "Department", key: "department" },
          { label: "Email", key: "email" },
          { label: "Phone Number", key: "phoneNumber" },
        ].map((field) => (
          <div key={field.key} className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {field.label}
            </label>
            <input
              type="text"
              value={student[field.key as keyof Student] as string}
              onChange={(e) =>
                setStudent({ ...student, [field.key]: e.target.value })
              }
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 outline-none shadow-sm bg-white"
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded w-full hover:opacity-90 transition shadow-md"
        >
          Save Changes
        </button>

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-purple bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96 border border-gray-200">
              <img
                src={successImage}
                alt="Success"
                className="mx-auto mb-4 w-24 animate-bounce"
              />
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Update Successful!
              </h2>
              <p className="text-gray-700 mb-4">
                The student's details have been updated successfully.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/studenttable");
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
