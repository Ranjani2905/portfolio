import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
  Navigate,
} from "react-router-dom";
import Html from "./components/learnings/html";
import Css from "./components/learnings/css";
import Java from "./components/learnings/java";
import Tailwind from "./components/learnings/tail";
import Navbar from "./components/shared/navbar";
import Home from "./components/shared/home";
import Task from "./components/task";
import Calculator from "./components/daily-tasks/calc";
import Studentform from "./components/studentform/studentform";
import Ecommerce from "./components/daily-tasks/ecommerce";
import StudentTable from "./components/studentform/studenttable";
import ViewStudent from "./components/studentform/view";
import EditStudent from "./components/studentform/edit";
import Loginpage from "./components/daily-tasks/studentmanagement/usertype";
import LoginOrsignup from "./components/daily-tasks/studentmanagement/loginorsignup";
import NotFound from "./components/notFound";
import Dashboard from "./components/daily-tasks/studentmanagement/Dashboard";
import StudentRegForm from "./components/daily-tasks/studentmanagement/student/studentregform";
import StudentOverview from "./components/daily-tasks/studentmanagement/student/studentoverview";
import Timetable from "./components/daily-tasks/studentmanagement/student/timetable";
import AssignmentTimeline from "./components/daily-tasks/studentmanagement/student/UpcomingAssignments";
import SubmittedAssignments from "./components/daily-tasks/studentmanagement/student/SubmittedAssignments";
import SemResults from "./components/daily-tasks/studentmanagement/student/SemResults";
import StudentAttendance from "./components/daily-tasks/studentmanagement/student/studentattendence";
import ViewAnnouncements from "./components/daily-tasks/studentmanagement/student/viewAnnouncements";
import Overview from "./components/daily-tasks/studentmanagement/teacher/overview";
import ExamSchedule from "./components/daily-tasks/studentmanagement/teacher/ExamSchedule";
import EnterMarks from "./components/daily-tasks/studentmanagement/teacher/MarkEntry";
import Attendance from "./components/daily-tasks/studentmanagement/teacher/Attendance";
import CreateAssignments from "./components/daily-tasks/studentmanagement/teacher/CreateAssignments";
import EvaluateAssignments from "./components/daily-tasks/studentmanagement/teacher/EvaluateAssignments";
import ExamAnalysis from "./components/daily-tasks/studentmanagement/teacher/ReportAnalytics";
import AdminOverview from "./components/daily-tasks/studentmanagement/admin/adminOverview";
import ManageStudents from "./components/daily-tasks/studentmanagement/admin/ManageStudents";
import ManageTeachers from "./components/daily-tasks/studentmanagement/admin/ManageTeachers";
import SystemReports from "./components/daily-tasks/studentmanagement/admin/SystemReports";
import AdminAnnouncements from "./components/daily-tasks/studentmanagement/admin/Announcements";
import ViewAttendance from "./components/daily-tasks/studentmanagement/ViewAttendance";
import Chatbot from "./components/chat";
import StudentReports from "./components/daily-tasks/studentmanagement/student/studentReports";
import PdfFormFiller from "./components/daily-tasks/studentmanagement/student/PdfFormFiller";

function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/html" element={<Html />} />
        <Route path="/css" element={<Css />} />
        <Route path="/javascript" element={<Java />} />
        <Route path="/tailwindcss" element={<Tailwind />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/calc" element={<Calculator />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/student" element={<Studentform />} />
        <Route path="/studenttable" element={<StudentTable />} />
        <Route path="/view/:rollNumber" element={<ViewStudent />} />
        <Route path="/edit/:rollNumber" element={<EditStudent />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/loginOrsignup/:userType" element={<LoginOrsignup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/studentregform" element={<StudentRegForm />} />
        <Route path="/pdfform" element={<PdfFormFiller />} />
        <Route path="/studentOverview" element={<StudentOverview />} />
        <Route path="/dashboard/:userType" element={<Dashboard />} />
        <Route
          path="/"
          element={<Navigate to="/dashboard/student" replace />}
        />
        {/* Dashboard Wrapper Route */}
        <Route path="/dashboard/:userType" element={<Dashboard />}>
          {/* Student Routes */}
          <Route path="overview" element={<StudentOverview />} />
          <Route path="timetable1" element={<Timetable />} />
          <Route path="upcoming-assignments" element={<AssignmentTimeline />} />
          <Route path="profile" element={<PdfFormFiller />} />
          <Route
            path="submitted-assignments"
            element={<SubmittedAssignments />}
          />
          <Route path="semester-results" element={<SemResults />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="announcements" element={<ViewAnnouncements />} />
          <Route path="reports" element={<StudentReports />} />

          {/* Teacher Routes */}
          <Route path="teacheroverview" element={<Overview />} />
          <Route path="exam-schedule" element={<ExamSchedule />} />
          <Route path="marks-entry" element={<EnterMarks />} />
          <Route path="teacherattendance" element={<Attendance />} />
          <Route path="create-assignments" element={<CreateAssignments />} />
          <Route
            path="evaluate-assignments"
            element={<EvaluateAssignments />}
          />
          <Route path="viewAttendance" element={<ViewAttendance />} />
          <Route path="reports-analytics" element={<ExamAnalysis />} />

          {/* Admin Routes */}
          <Route path="adminoverview" element={<AdminOverview />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-teachers" element={<ManageTeachers />} />
          <Route path="system-reports" element={<SystemReports />} />
          <Route path="adminannouncements" element={<AdminAnnouncements />} />
        </Route>

        {/* Redirect from "/" to Student Dashboard */}
        <Route
          path="/"
          element={<Navigate to="/dashboard/student/overview" replace />}
        />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();

  const hiddenNavbarPaths = [
    "/loginpage",
    "/student",
    "/studenttable",
    "/calc",
    "/ecommerce",
    "/studentregform",
    "/dashboard/admin/adminoverview",
    "/dashboard/admin/manage-students",
    "/dashboard/admin/manage-teachers",
    "/dashboard/admin/system-reports",
    "/dashboard/admin/adminannouncements",
    "/dashboard/student/overview",
    "/dashboard/student/timetable1",
    "/dashboard/student/profile",
    "/dashboard/student/upcoming-assignments",
    "/dashboard/student/submitted-assignments",
    "/dashboard/student/semester-results",
    "/dashboard/student/attendance",
    "/dashboard/student/reports",
    "/dashboard/student/announcements",
    "/dashboard/teacher/teacheroverview",
    "/dashboard/teacher/exam-schedule",
    "/dashboard/teacher/marks-entry",
    "/dashboard/teacher/teacherattendance",
    "/dashboard/teacher/create-assignments",
    "/dashboard/teacher/evaluate-assignments",
    "/dashboard/teacher/reports-analytics",
    "/dashboard/teacher/viewAttendance",
  ];

  const dynamicPaths = [
    "/edit/:rollNumber",
    "/view/:rollNumber",
    "/loginOrsignup/:userType",
    "/dashboard/:userType",
  ];

  const isHidden =
    hiddenNavbarPaths.includes(location.pathname) ||
    dynamicPaths.some((path) => matchPath(path, location.pathname));

  return !isHidden ? <Navbar /> : null;
}

export default App;
