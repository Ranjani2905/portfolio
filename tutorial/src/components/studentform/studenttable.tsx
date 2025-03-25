import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash } from "lucide-react";
import deleteimg from "../../assets/delete.jpg";

interface Semester {
  id: number;
  semesterNumber: string;
  percentage: string;
  marksheet: File | null;
}

interface Student {
  name: string;
  rollNumber: string;
  regNumber: string;
  department: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  nationality: string;
  state: string;
  fatherName: string;
  motherName: string;
  parentContact: string;
  courseType: string;
  admissionYear: string;
  passingYear: string;
  city: string;
  zipCode: string;
  address: string;
  profilePicture: ImageData | null;
  eSignature: File | null;
  semesters: Semester[];
}

const StudentTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudents: Student[] = JSON.parse(
      localStorage.getItem("students") || "[]"
    );
    setStudents(storedStudents);
  }, []);

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updatedStudents = students.filter((_, i) => i !== deleteIndex);
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setShowDeleteModal(false);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Student List
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-4">Name</th>
              <th className="p-4">Roll Number</th>
              <th className="p-4">Department</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-50 even:bg-gray-100 transition-all hover:bg-purple-100"
                >
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.rollNumber}</td>
                  <td className="p-4">{student.department}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.phoneNumber}</td>
                  <td className="p-4 flex justify-center gap-3 text-gray-600">
                    <button
                      onClick={() => navigate(`/view/${student.rollNumber}`)}
                      className="hover:text-purple-600 transition"
                    >
                      <Eye />
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${student.rollNumber}`)}
                      className="hover:text-yellow-600 transition"
                    >
                      <Edit />
                    </button>
                    <button
                      className="hover:text-red-600 transition"
                      onClick={() => {
                        setDeleteIndex(index);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-purple bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center animate-fadeIn">
            <img src={deleteimg} alt="Warning" className="mx-auto w-16 mb-4" />
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              Confirm Deletion
            </h2>
            <p className="text-gray-700">
             Are you sure you want to delete this student's record? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
