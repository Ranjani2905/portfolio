import { useState, useEffect, useRef, JSX } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCog,
  FaBars,
} from "react-icons/fa";
import { Speaker, X, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import logout from "../../../assets/logout.jpg";
import logo from "../../../assets/4d00826023e160ad049c09c8bb5538a0-removebg-preview.png";
import studentAvatar from "../../../assets/student.jpg";
import teacherAvatar from "../../../assets/teacher.jpg";
import adminAvatar from "../../../assets/admin.jpg";
import { LogOut } from "lucide-react";
import Chatbot from "../../chat";

// Define the menu item type
interface MenuItem {
  name: string;
  path?: string; // Optional for submenus
  icon: JSX.Element;
  subItems?: { name: string; path: string }[];
}
const profileImages: Record<string, string> = {
  student: studentAvatar,
  teacher: teacherAvatar,
  admin: adminAvatar,
};
const Dashboard = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const menuItems: Record<string, MenuItem[]> = {
    student: [
      {
        name: "Overview",
        path: "/dashboard/student/overview",
        icon: <FaHome />,
      },

      {
        name: "Assignments",
        icon: <FaClipboardList />,
        subItems: [
          { name: "Upcoming", path: "/dashboard/student/upcoming-assignments" },
          {
            name: "Submitted",
            path: "/dashboard/student/submitted-assignments",
          },
        ],
      },
      {
        name: "Exams",
        icon: <FaClipboardList />,
        subItems: [
          { name: "Timetable", path: "/dashboard/student/timetable1" },
          { name: "Results", path: "/dashboard/student/semester-results" },
        ],
      },
      {
        name: "Announcements",
        path: "/dashboard/student/announcements",
        icon: <Speaker />,
      },
      {
        name: "Attendance",
        path: "/dashboard/student/attendance",
        icon: <FaUserGraduate />,
      },
      { name: "Reports", path: "/dashboard/student/reports", icon: <FaCog /> },
    ],
    teacher: [
      {
        name: "Overview",
        path: "/dashboard/teacher/teacheroverview",
        icon: <FaHome />,
      },
      {
        name: "Exams",
        icon: <FaClipboardList />,
        subItems: [
          { name: "Exam Schedule", path: "/dashboard/teacher/exam-schedule" },
          { name: "Mark Entry", path: "/dashboard/teacher/marks-entry" },
        ],
      },
      {
        name: "Assignments",
        icon: <FaClipboardList />,
        subItems: [
          { name: "Create ", path: "/dashboard/teacher/create-assignments" },
          {
            name: "Evaluate ",
            path: "/dashboard/teacher/evaluate-assignments",
          },
        ],
      },
      {
        name: "Attendance",
        icon: <FaUserGraduate />,
        subItems: [
          {
            name: "Mark Attendance",
            path: "/dashboard/teacher/teacherattendance",
          },
          {
            name: "View Attendance",
            path: "/dashboard/teacher/viewAttendance",
          },
        ],
      },
      {
        name: "Announcements",
        path: "/dashboard/student/announcements",
        icon: <Speaker />,
      },

      {
        name: "Reports  Analytics",
        path: "/dashboard/teacher/reports-analytics",
        icon: <FaCog />,
      },
    ],
    admin: [
      {
        name: "Overview",
        path: "/dashboard/admin/adminoverview",
        icon: <FaHome />,
      },
      {
        name: "Manage Students",
        path: "/dashboard/admin/manage-students",
        icon: <FaUserGraduate />,
      },
      {
        name: "Manage Teachers",
        path: "/dashboard/admin/manage-teachers",
        icon: <FaChalkboardTeacher />,
      },
      {
        name: "System Reports",
        path: "/dashboard/admin/system-reports",
        icon: <FaClipboardList />,
      },
      {
        name: "Announcements",
        path: "/dashboard/admin/adminannouncements",
        icon: <FaCog />,
      },
    ],
  };

  const validUserType = userType && menuItems[userType] ? userType : "student";
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems([]);
      setSelectedIndex(0);
      return;
    }

    // Flatten menu items including subItems
    const allItems: MenuItem[] = menuItems[validUserType].flatMap((item) =>
      item.subItems
        ? [item, ...item.subItems.map((sub) => ({ ...sub, icon: item.icon }))]
        : [item]
    );

    // Filter items based on search query
    const filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredItems(filtered);
    setSelectedIndex(0);
  }, [searchQuery, validUserType]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredItems.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      handleSelectItem(filteredItems[selectedIndex]);
    }
  };
  const handleSelectItem = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
      setSearchQuery(""); // Clear search after navigation
      setFilteredItems([]); // Hide dropdown
    }
  };
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setFilteredItems([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 bg-white shadow-md flex items-center justify-between px-6 py-3 z-50 transition-all duration-300 ${
          isOpen
            ? "left-64 w-[calc(100%-16rem)]"
            : "left-16 w-[calc(100%-4rem)]"
        }`}
      >
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-orange-700">
            Hogwarts College of Engineering
          </h1>
        </div>
        <div className="flex pl-2 ml-120">
          {/* Search Bar */}
          <div className="relative ">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-orange-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {/* Dropdown for Search Results */}
            {filteredItems.length > 0 && (
              <ul className="absolute left-0 w-full bg-white shadow-lg mt-1 rounded-md overflow-hidden z-50">
                {filteredItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectItem(item)}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${
                      selectedIndex === index ? "bg-gray-300" : ""
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Chat Icon */}
          <label className="text-orange-500 font-semibold">Need Help?</label>
          <button onClick={() => setIsChatOpen(true)} className="relative">
            <MessageCircle className="w-8 h-8 text-orange-500 cursor-pointer hover:text-orange-700 transition duration-200" />
          </button>

          {/* Profile Avatar */}
          <div className="relative">
            <motion.img
              src={profileImages[userType ?? "default"]}
              className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            />
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg p-3 z-50">
                <div className="p-2 border-b">
                  <p className="font-semibold">{userName || "User Name"}</p>
                  <p className="text-sm text-gray-600">
                    {userName}@skill-mine.com
                  </p>
                </div>
                {userType === "student" && (
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left"
                    onClick={() => navigate("/dashboard/student/profile")}
                  >
                    <FaUserGraduate />
                    Profile
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowLogoutModal(true);
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 text-left"
                >
                  <LogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50">
          <div className="bg-gray-100 w-96 p-5 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-5 right-5 text-black hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Chatbot Component */}
            <Chatbot />
          </div>
        </div>
      )}
      {/* Sidebar */}
      <div className="flex  h-screen">
        <motion.div
          className={`fixed top-0 left-0 h-screen bg-white text-gray-900 shadow-lg transition-all duration-300 ${
            isOpen ? "w-64" : "w-16"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 w-full text-left focus:outline-none flex items-center"
          >
            {isOpen ? (
              <FaBars className="text-orange-500 text-2xl" />
            ) : (
              <FaBars className="text-orange-500 text-2xl" />
            )}
          </button>
          {isOpen && (
            <motion.img
              src={profileImages[userType ?? "default"]}
              className="w-35 h-35 flex ml-10 rounded-full border-4 border-orange-300 shadow-md"
            />
          )}

          {isOpen && (
            <label className="text-orange-700 text-2xl mt-5 font-bold flex justify-center">
              {userName}
            </label>
          )}
          <ul className="p-2">
            {menuItems[validUserType].map((item) => (
              <li
                key={item.name}
                className="p-3 hover:bg-gray-300 cursor-pointer rounded-md relative group"
              >
                {/* Main Item Clickable Area */}
                <div
                  className="flex items-center"
                  onClick={() => {
                    if (item.subItems) {
                      setOpenSubMenu(
                        openSubMenu === item.name ? null : item.name
                      );
                    } else if (item.path) {
                      navigate(item.path);
                    }
                  }}
                >
                  {item.icon}
                  {isOpen && (
                    <span className="ml-2 font-medium">{item.name}</span>
                  )}
                </div>
                {item.subItems && openSubMenu === item.name && isOpen && (
                  <ul className="ml-6 mt-2">
                    {item.subItems.map((sub) => (
                      <li
                        key={sub.name}
                        className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
                        onClick={() => navigate(sub.path)}
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Sub-menu on Hover when Sidebar is Closed */}
                {!isOpen && item.subItems && (
                  <motion.ul
                    className="absolute left-full top-0 ml-2 bg-white shadow-lg rounded-md overflow-hidden hidden group-hover:block"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.subItems.map((sub) => (
                      <li
                        key={sub.name}
                        className="p-2 whitespace-nowrap hover:bg-gray-200 cursor-pointer"
                        onClick={() => navigate(sub.path)}
                      >
                        {sub.name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>
            ))}
          </ul>

          <motion.div
            className="flex items-center absolute bottom-0 gap-2 cursor-pointer p-3 hover:bg-red-100 transition-all"
            onClick={() => setShowLogoutModal(true)}
            animate={{ opacity: isOpen ? 1 : 0 }}
          >
            <LogOut size={24} className="text-red-600" />
            {isOpen && <span className="text-red-600 font-medium">Logout</span>}
          </motion.div>
          {/* Logout Confirmation Modal */}
          {showLogoutModal && (
            <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <img src={logout}></img>
                <h2 className="text-lg font-bold mb-4 text-gray-900">
                  Do you really want to log out,{" "}
                  <span className="capitalize text-orange-600">{userName}</span>
                  ?
                </h2>
                <div className="flex justify-around">
                  <button
                    className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-red-800 transition-all"
                    onClick={() => navigate("/loginpage")}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div
          className={`p-4 transition-all w-full duration-300 ${
            isOpen ? "ml-64" : "ml-16"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
