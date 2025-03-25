import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { ChevronRight } from "lucide-react";

interface Assignment {
  title: string;
  deadline: string;
  rubrics: { criteria: string; marks: number }[];
}

const CreateAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const defaultRubrics = [
    { criteria: "Understanding", marks: 5 },
    { criteria: "Presentation", marks: 5 },
    { criteria: "Content", marks: 5 },
    { criteria: "Creativity", marks: 5 },
  ];

  const [newAssignment, setNewAssignment] = useState<Assignment>({
    title: "",
    deadline: "",
    rubrics: defaultRubrics,
  });

  // ✅ Fetch assignments from backend
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/assignments/");
        setAssignments(res.data);
      } catch (error) {
        console.error("❌ Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  // ✅ Handle input changes for assignments
  const handleAssignmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
  };

  const handleRubricChange = (index: number, value: number) => {
    const updatedRubrics = [...newAssignment.rubrics];
    updatedRubrics[index].marks = value;
    setNewAssignment({ ...newAssignment, rubrics: updatedRubrics });
  };

  // ✅ Add new assignment to backend
  const addAssignment = async () => {
    if (!newAssignment.title.trim() || !newAssignment.deadline.trim()) {
      alert("⚠️ Please enter a title and deadline.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/assignments/add",
        newAssignment
      );
      setAssignments([...assignments, res.data]);
      setNewAssignment({ title: "", deadline: "", rubrics: defaultRubrics });
    } catch (error) {
      console.error("❌ Error adding assignment:", error);
    }
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
              Assignments
            </a>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a
              href="/dashboard/teacher/create-assignments"
              className="hover:text-orange-600 transition-colors"
            >
              Add Assignment
            </a>
          </li>
         
        </ul>
      </nav>
   
      <input
        type="text"
        name="title"
        placeholder="Assignment Title"
        value={newAssignment.title}
        onChange={handleAssignmentChange}
        className="w-full mt-2 p-3 bg-gray-100 rounded-md"
      />
      <input
        type="date"
        name="deadline"
        value={newAssignment.deadline}
        onChange={handleAssignmentChange}
        className="w-full mt-2 p-3 bg-gray-100 rounded-md"
      />

      {/* ✅ Rubrics Table */}
      <div className="mt-5">
        <label className="font-medium">Rubrics</label>
        <table className="w-full mt-2">
          <tbody>
            {newAssignment.rubrics.map((rubric, index) => (
              <tr key={index}>
                <td className="px-4 py-3">{rubric.criteria}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={rubric.marks}
                    onChange={(e) =>
                      handleRubricChange(index, Number(e.target.value))
                    }
                    className="w-16 p-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addAssignment}
        className="mt-4 px-2  flex items-center absolute right-20 gap-2 h-12 bg-gradient-to-r from-orange-500 to-orange-700   hover:to-orange-800 transition-all duration-300 shadow-lg text-white font-semibold rounded-md"
      >
        <FaPlus /> Add Assignment
      </button>
    </>
  );
};

export default CreateAssignments;
