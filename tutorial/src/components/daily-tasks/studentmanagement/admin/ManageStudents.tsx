import { useEffect, useState, useRef } from "react";
import { FaLock, FaTrash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import update from "../../../../assets/passwordchange.jpg";
import deleteuser from "../../../../assets/deleteuser.jpg";
const ManageStudents = () => {
  const [students, setStudents] = useState<
    { _id: string; name: string; email: string }[]
  >([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/users/student")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  // 🟢 Open Change Password Modal
  const openChangePasswordModal = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setIsPasswordModalOpen(true);
  };

  // 🔴 Open Delete Modal
  const openDeleteModal = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setIsDeleteModalOpen(true);
  };

  // 🟢 Close Modal (General)
  const closeModal = () => {
    setIsPasswordModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
    setSelectedUserName(null);
  };

  // 🟢 Handle Change Password
  const handleChangePassword = async () => {
    if (!selectedUserId || !passwordRef.current?.value) return;
    const newPassword = passwordRef.current.value;

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/users/student/change-password/${selectedUserId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Password updated successfully!");
        closeModal();
      } else {
        toast.error("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error updating password");
    }
  };

  // 🔴 Delete User Function
  const handleDeleteUser = async () => {
    if (!selectedUserId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/users/student/${selectedUserId}`,
        { method: "DELETE" }
      );

      const data = await response.json();
      if (data.success) {
        setStudents(
          students.filter((student) => student._id !== selectedUserId)
        );
        toast.success("User deleted successfully!");
        closeModal();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <>
      <Toaster />
      <h1 className="text-2xl mt-15 flex items-center justify-center font-bold mb-4">Students Records</h1>
      <table className="w-full text-left shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={index}
              className="bg-white even:bg-gray-100 hover:bg-gray-200"
            >
              <td className="p-4">{student.name}</td>
              <td className="p-4">{student.email}</td>
              <td className="p-4 space-x-4 flex">
                <button
                  className="text-orange-500 hover:text-orange-700 transition"
                  onClick={() =>
                    openChangePasswordModal(student._id, student.name)
                  }
                  title="Change Password"
                >
                  <FaLock size={20} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => openDeleteModal(student._id, student.name)}
                  title="Delete User"
                >
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Change Password Modal */}
      {isPasswordModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center  bg-opacity-40 backdrop-blur-xs z-50"
          onClick={closeModal} // Close on backdrop click
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
          >
            <img src={update}></img>

            <h2 className="text-xl font-bold mb-2 text-orange-600">
              Change Password for {selectedUserName}?
            </h2>
            <input
              type="password"
              placeholder="Enter new password"
              className="bg-gray-100 p-2 w-full rounded mb-4"
              ref={passwordRef}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-white-300 border-orange-500 border rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700"
                onClick={handleChangePassword}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔴 Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-xs z-50"
          onClick={closeModal} // Close on backdrop click
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 text-center"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
          >
            <h2 className="text-xl font-bold mb-2 text-orange-600">
              Delete {selectedUserName}?
            </h2>
            <img src={deleteuser}></img>
            <p className="text-gray-700 mb-4">This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-red-700"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageStudents;
