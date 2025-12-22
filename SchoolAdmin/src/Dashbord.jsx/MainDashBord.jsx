import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaPhone, FaVideo, FaSignOutAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const menuClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
  ${
    isActive
      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
      : "text-slate-300 hover:text-white hover:bg-white/10"
  }`;

export default function MainDashBord() {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const resize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setOpen(!mobile);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const closeSidebar = () => isMobile && setOpen(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Overlay (Mobile) */}
      {open && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full z-40
        bg-gradient-to-b from-slate-900 to-slate-800 text-white
        transition-all duration-300 ease-in-out overflow-hidden flex flex-col
        ${open ? "w-64" : "w-0 lg:w-20"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 flex-shrink-0">
          <h1 className="font-bold text-lg tracking-wide whitespace-nowrap">
            {open ? "Admin Panel" : "AP"}
          </h1>

          {isMobile && (
            <button onClick={() => setOpen(false)}>
              <MdClose size={22} />
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-2 mt-4 flex-1">
          <NavLink
            to="/dashbord"
            end
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaHome size={18} />
            {open && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/dashbord/branches"
            className={menuClass}
            onClick={closeSidebar}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {open && <span>Branch Management</span>}
          </NavLink>

          <NavLink
            to="/dashbord/add-branch"
            className={menuClass}
            onClick={closeSidebar}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {open && <span>Add New Branch</span>}
          </NavLink>

          <NavLink
            to="/dashbord/change-password"
            className={menuClass}
            onClick={closeSidebar}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {open && <span>Change Password</span>}
          </NavLink>

          <NavLink
            to="/dashbord/reports"
            className={menuClass}
            onClick={closeSidebar}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {open && <span>Reports</span>}
          </NavLink>
        </nav>

        {/* Logout Button - Inside Sidebar */}
        <div className="p-3 border-t border-white/10 flex-shrink-0">
          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center justify-center gap-3 px-4 py-3 rounded-xl
            bg-gradient-to-r from-rose-500 to-red-600 hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
          >
            <FaSignOutAlt size={18} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 lg:px-6 gap-4 flex-shrink-0">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-slate-200 transition"
          >
            <GiHamburgerMenu size={22} className="text-slate-700" />
          </button>

          <div className="flex-1" />

          {/* Welcome + Avatar */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm text-slate-600">
              Welcome back, Admin 👋
            </span>

            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-indigo-400 transition">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 min-h-full">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}
