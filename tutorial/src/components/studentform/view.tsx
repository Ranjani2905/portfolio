import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

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
  semesters: Semester[];
}

const ViewStudent = () => {
  const { rollNumber } = useParams<{ rollNumber: string }>();
  const [student, setStudent] = useState<Student | null>(null);

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

  const handleDownloadReport = () => {
    if (!student) return;

    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Student Academic Report", 60, 20);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    let y = 40;
    const addText = (label: string, value: string) => {
      pdf.text(`${label}: ${value}`, 20, y);
      y += 10;
    };

    // Personal Details
    pdf.setFont("helvetica", "bold");
    pdf.text("Personal Details", 20, y);
    pdf.setFont("helvetica", "normal");
    y += 10;
    addText("Name", student.name);
    addText("Roll Number", student.rollNumber);
    addText("Registration Number", student.regNumber);
    addText("Department", student.department);
    addText("Gender", student.gender);
    addText("DOB", student.dob);
    addText("Nationality", student.nationality);
    addText("Admission Year", student.admissionYear);
    addText("Passing Year", student.passingYear);

    // Parent Details
    y += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("Parent Details", 20, y);
    pdf.setFont("helvetica", "normal");
    y += 10;
    addText("Father's Name", student.fatherName);
    addText("Mother's Name", student.motherName);
    addText("Parent Contact", student.parentContact);

    // Contact Details
    y += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("Contact Details", 20, y);
    pdf.setFont("helvetica", "normal");
    y += 10;
    addText("Email", student.email);
    addText("Phone", student.phoneNumber);
    addText(
      "Address",
      `${student.address}, ${student.city}, ${student.state}, ${student.zipCode}`
    );

    // Semester Details
    y += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("Academic Performance", 20, y);
    pdf.setFont("helvetica", "normal");
    y += 10;
    student.semesters.forEach((sem, index) => {
      addText(`Semester ${index + 1}`, ` - ${sem.percentage}%`);
    });

    pdf.save(`Student_Report_${student.rollNumber}.pdf`);
  };

  if (!student) {
    return <p className="text-center text-red-500">Student not found!</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 p-8">
      <div className="bg-white shadow-2xl border-2 border-gray-400 p-8 rounded-lg w-[800px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center underline decoration-purple-500">
          {student.name}'s Academic Report
        </h1>

        {/* Personal Details */}
        <h2 className="text-xl font-semibold mt-4 text-gray-900">
          Personal Details
        </h2>
        <div className="text-lg space-y-2 bg-gray-100 p-6 rounded-lg">
          <p>
            <strong className="text-purple-700">Name:</strong> {student.name}
          </p>
          <p>
            <strong className="text-purple-700">Roll Number:</strong>{" "}
            {student.rollNumber}
          </p>
          <p>
            <strong className="text-purple-700">Registration Number:</strong>{" "}
            {student.regNumber}
          </p>
          <p>
            <strong className="text-purple-700">Department:</strong>{" "}
            {student.department}
          </p>
          <p>
            <strong className="text-purple-700">Gender:</strong>{" "}
            {student.gender}
          </p>
          <p>
            <strong className="text-purple-700">DOB:</strong> {student.dob}
          </p>
          <p>
            <strong className="text-purple-700">Nationality:</strong>{" "}
            {student.nationality}
          </p>
          <p>
            <strong className="text-purple-700">Admission Year:</strong>{" "}
            {student.admissionYear}
          </p>
          <p>
            <strong className="text-purple-700">Passing Year:</strong>{" "}
            {student.passingYear}
          </p>
        </div>

        {/* Parent Details */}
        <h2 className="text-xl font-semibold mt-4 text-gray-900">
          Parent Details
        </h2>
        <div className="text-lg space-y-2 bg-gray-100 p-6 rounded-lg">
          <p>
            <strong className="text-purple-700">Father's Name:</strong>{" "}
            {student.fatherName}
          </p>
          <p>
            <strong className="text-purple-700">Mother's Name:</strong>{" "}
            {student.motherName}
          </p>
          <p>
            <strong className="text-purple-700">Parent Contact:</strong>{" "}
            {student.parentContact}
          </p>
        </div>

        {/* Contact Details */}
        <h2 className="text-xl font-semibold mt-4 text-gray-900">
          Contact Details
        </h2>
        <div className="text-lg space-y-2 bg-gray-100 p-6 rounded-lg">
          <p>
            <strong className="text-purple-700">Email:</strong> {student.email}
          </p>
          <p>
            <strong className="text-purple-700">Phone:</strong>{" "}
            {student.phoneNumber}
          </p>
          <p>
            <strong className="text-purple-700">Address:</strong>{" "}
            {student.address}, {student.city}, {student.state},{" "}
            {student.zipCode}
          </p>
        </div>

        {/* Academic Performance */}
        <h2 className="text-xl font-semibold mt-4 text-gray-900">
          Academic Performance
        </h2>
        <div className="text-lg space-y-2 bg-gray-100 p-6 rounded-lg">
          {student.semesters.map((sem, index) => (
            <p key={sem.id}>
              <strong className="text-purple-700">Semester {index + 1}:</strong>{" "}
              {sem.semesterNumber} - {sem.percentage}%
            </p>
          ))}
        </div>

        {/* Download Report Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleDownloadReport}
            className="bg-purple-700 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-purple-900 transition"
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
