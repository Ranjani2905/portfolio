import { useEffect, useState } from "react";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState<{ name: string; email: string }[]>(
    []
  );

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/users/staff"
        );
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }

        const data = await response.json();
        console.log("Fetched teachers:", data); // Log fetched teachers

        setTeachers(data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  return (<>
      <h1 className="text-2xl font-bold mb-4">Teacher Records</h1>

      <table className="w-full text-left shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-orange-500 to-orange-700   hover:to-orange-800 transition-all duration-300 text-white">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <tr
                key={index}
                className="bg-white even:bg-gray-100 transition-all duration-200 hover:bg-gray-100"
              >
                <td className="p-4">{teacher.name}</td>
                <td className="p-4">{teacher.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center p-6 text-gray-500 italic">
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ManageTeachers;
