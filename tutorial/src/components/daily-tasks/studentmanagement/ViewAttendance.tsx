import { ChevronRight } from "lucide-react"
function ViewAttendance() {
  return (
    <div >
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
          <li>
            <ChevronRight size={16} className="text-gray-500" />
          </li>
          <li>
            <a
              href="/dashboard/teacher/teacherattendance"
              className="hover:text-orange-600 transition-colors"
            >
              View Attendance
            </a>
          </li>
         
         
        </ul>
      </nav>
      hello
    </div>
  )
}

export default ViewAttendance
