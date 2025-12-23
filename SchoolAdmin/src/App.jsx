import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainDashBord from "./Dashbord.jsx/MainDashBord";
import Home from "./Dashbord.jsx/Home";
import Login from "./Login";
import BranchManagement from "./Dashbord.jsx/BranchManagement";
import BranchDetail from "./Dashbord.jsx/BranchDetail";
import AddBranch from "./Dashbord.jsx/AddBranch";
import ChangePassword from "./Dashbord.jsx/ChangePassword";
import Reports from "./Dashbord.jsx/Reports";
import SchoolAdminLogin from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<SchoolAdminLogin />} />
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Dashboard Layout */}
        <Route path="/dashbord" element={<MainDashBord />}>
          <Route index element={<Home />} />
          <Route path="branches" element={<BranchManagement />} />
          <Route path="branch/:branchId" element={<BranchDetail />} />
          <Route path="add-branch" element={<AddBranch />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
