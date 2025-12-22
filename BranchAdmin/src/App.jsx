import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SchoolProvider } from "./context/SchoolContext";

import MainDashBord from "./Dashbord.jsx/MainDashBord";
import Home from "./Dashbord.jsx/Home";
import ManageStaff from "./Dashbord.jsx/ManageStaff";
import ManageTeacher from "./Dashbord.jsx/ManageTeacher";

import ManageFees from "./Dashbord.jsx/ManageFees";
import ManageClass from "./Dashbord.jsx/ManageClass";
import ManageSection from "./Dashbord.jsx/ManageSection";
import FeesManagement from "./Dashbord.jsx/FeesManagement";
import Approval from "./Dashbord.jsx/Approval";
import Login from "./Login";
import Reports from "./Dashbord.jsx/Reports";


export default function App() {
  return (
    <SchoolProvider>
      <BrowserRouter>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Dashboard Layout */}
          <Route path="/dashbord" element={<MainDashBord />}>
            <Route index element={<Home />} />
            <Route path="manage-staff" element={<ManageStaff />} />
            <Route path="manage-teacher" element={<ManageTeacher />} />

            <Route path="manage-fees" element={<ManageFees />} />
            <Route path="manage-class" element={<ManageClass />} />
            <Route path="manage-section" element={<ManageSection />} />
            <Route path="fees-management" element={<FeesManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="approval" element={<Approval />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SchoolProvider>
  );
}
