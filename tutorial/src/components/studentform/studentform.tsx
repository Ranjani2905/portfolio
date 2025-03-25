import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  FilePlus,
  PlusCircle,
  User,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Globe2,
} from "lucide-react";
import { GiFamilyHouse } from "react-icons/gi";
import { FcDepartment } from "react-icons/fc";

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
  profilePicture: File | null;
  semesters: Semester[];
}

const StudentForm = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(
    JSON.parse(localStorage.getItem("students") || "[]")
  );
  const [student, setStudent] = useState<Student>({
    name: "",
    rollNumber: "",
    regNumber: "",
    department: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    nationality: "",
    state: "",
    fatherName: "",
    motherName: "",
    parentContact: "",
    courseType: "",
    admissionYear: "",
    passingYear: "",
    city: "",
    zipCode: "",
    address: "",
    profilePicture: null,
    semesters: [],
  });

  const addSemester = () => {
    setStudent((prev) => ({
      ...prev,
      semesters: [
        ...prev.semesters,
        { id: Date.now(), semesterNumber: "", percentage: "", marksheet: null },
      ],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Student
  ) => {
    const file = e.target.files?.[0] || null;
    setStudent((prev) => ({ ...prev, [field]: file }));
  };

  const handleSemesterChange = (
    index: number,
    field: keyof Semester,
    value: string | File | null
  ) => {
    setStudent((prev) => ({
      ...prev,
      semesters: prev.semesters.map((sem, i) =>
        i === index ? { ...sem, [field]: value } : sem
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudents([...students, student]);
    localStorage.setItem("students", JSON.stringify([...students, student]));
    navigate("/studenttable");
  };

  return (
    <div className="flex flex-col items-center p-8 bg-purple-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Student Registration Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-xl relative"
      >
        {/* Profile Picture Upload */}
        <div className="  flex flex-col items-center">
          <div className="w-30 h-30 rounded-full border-2 border-dotted border-purple-500  bg-gray-300 flex items-center justify-center overflow-hidden">
            {student.profilePicture ? (
              <img
                src={URL.createObjectURL(student.profilePicture)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="text-purple-400 w-10 h-10" />
            )}
          </div>
          <input
            type="file"
            className="hidden"
            id="profile-upload"
            onChange={(e) => handleFileChange(e, "profilePicture")}
          />
          <label
            htmlFor="profile-upload"
            className="text-purple-500 cursor-pointer mt-2 text-sm"
          >
            Upload Photo
          </label>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 mt-15 gap-4">
          {[
            { name: "name", placeholder: "Full Name", icon: <User /> },
            {
              name: "rollNumber",
              placeholder: "Roll Number",
              icon: <BookOpen />,
            },
            {
              name: "regNumber",
              placeholder: "Register Number",
              icon: <FilePlus />,
            },
            {
              name: "email",
              type: "email",
              placeholder: "Email",
              icon: <Mail />,
            },
            {
              name: "phoneNumber",
              placeholder: "Phone Number",
              icon: <Phone />,
            },
            {
              name: "dob",
              type: "date",
              placeholder: "Date of Birth",
              icon: <Calendar />,
            },
            {
              name: "motherName",
              type: "text",
              placeholder: "Mother's Name",
              icon: <GiFamilyHouse />,
            },
            {
              name: "fatherName",
              type: "text",
              placeholder: "Father's Name",
              icon: <GiFamilyHouse />,
            },
          ].map((field) => (
            <div key={field.name} className="relative">
              <div className="absolute left-3 top-3 text-purple-500">
                {field.icon}
              </div>
              <input
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={student[field.name as keyof Student] as string}
                onChange={handleChange}
                className="pl-10 p-2 w-full bg-gray-200 rounded-md"
                required
              />
            </div>
          ))}

          {/* Gender Radio Buttons */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Gender
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg cursor-pointer hover:bg-gray-300 transition">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                  className="hidden"
                />
                <div className="w-5 h-5 border-2 border-purple-500 rounded-full flex items-center justify-center">
                  {student.gender === "Male" && (
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                Male
              </label>

              <label className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg cursor-pointer hover:bg-gray-300 transition">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="w-5 h-5 border-2 border-purple-500 rounded-full flex items-center justify-center">
                  {student.gender === "Female" && (
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                Female
              </label>
            </div>
          </div>

          {/* Dropdowns */}
          <div className="relative">
            <FcDepartment className="absolute left-3 top-3 text-purple-500" />
            <select
              name="department"
              onChange={handleChange}
              required
              className="pl-10 p-2 bg-gray-200 rounded-md w-full"
            >
              <option value="">Select Department</option>
              <option value="AIDS">
                Artificial Intelligence and Data Science
              </option>
              <option value="CSE">Computer Science and Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">
                Electronics and Communication Engineering
              </option>
              <option value="EEE">
                Electrical and Electronics Engineering
              </option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
              <option value="BIO">Biomedical Engineering</option>
              <option value="CHEM">Chemical Engineering</option>
              <option value="AUTO">Automobile Engineering</option>
              <option value="AERO">Aeronautical Engineering</option>
              <option value="MARINE">Marine Engineering</option>
              <option value="ROBOTICS">Robotics and Automation</option>
              <option value="AGRI">Agricultural Engineering</option>
            </select>
          </div>

          <div className="relative">
            <Globe2 className="absolute left-3 top-3 text-purple-500" />
            <select
              name="nationality"
              onChange={handleChange}
              required
              className="pl-10 p-2 bg-gray-200 rounded-md w-full"
            >
              <option value="">Select Nationality</option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Canadian">Canadian</option>
              <option value="Australian">Australian</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
              <option value="SouthKorean">South Korean</option>
              <option value="Brazilian">Brazilian</option>
              <option value="Russian">Russian</option>
              <option value="Mexican">Mexican</option>
              <option value="Italian">Italian</option>
              <option value="SouthAfrican">South African</option>
              <option value="Singaporean">Singaporean</option>
              <option value="Malaysian">Malaysian</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            className="p-2 bg-gray-200 rounded-md col-span-2"
          ></textarea>

          {/* Semester Fields */}
          {student.semesters.map((sem, index) => (
            <div
              key={sem.id}
              className="col-span-2 flex gap-4 items-center bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <input
                type="text"
                placeholder="Semester"
                value={sem.semesterNumber}
                onChange={(e) =>
                  handleSemesterChange(index, "semesterNumber", e.target.value)
                }
                className="p-2 bg-white border border-gray-300 rounded-md w-1/3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Percentage"
                value={sem.percentage}
                onChange={(e) =>
                  handleSemesterChange(index, "percentage", e.target.value)
                }
                className="p-2 bg-white border border-gray-300 rounded-md w-1/3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => {
                  setStudent((prev) => ({
                    ...prev,
                    semesters: prev.semesters.filter((_, i) => i !== index),
                  }));
                }}
                className="p-2  text-white rounded-md hover:bg-red-600 transition"
              >
                🗑️
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSemester}
            className="col-span-2 flex items-center gap-2 text-purple-500"
          >
            <PlusCircle /> Add Semester
          </button>

          <button
            type="submit"
            className="w-full col-span-2 mt-4 p-2 bg-purple-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
