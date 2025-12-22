import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import MainDashBord from "./Dashbord.jsx/MainDashBord";

import SuperAdminDashboard from "./Dashbord.jsx/SuperAdminDashboard";
import CollegeManagement from "./Dashbord.jsx/CollegeManagement";
import Plans from "./Dashbord.jsx/Plans";
import Reports from "./Dashbord.jsx/Reports";
import ChangePasswordModal from "./Dashbord.jsx/ChangePassword";


function App() {
  return (
    <>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout */}
        <Route path="/dashbord" element={<MainDashBord />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="college-management" element={<CollegeManagement />} />
          <Route path="plans" element={<Plans />} />
          <Route path="reports" element={<Reports />} />
          <Route path="change-password" element={<ChangePasswordModal />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
