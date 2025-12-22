import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCheckCircle,
  FaSignOutAlt,
  FaGraduationCap,
  FaLayerGroup,
  FaChartBar,
  FaBell,
  FaSearch,
  FaCog,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdDashboard } from "react-icons/md";

const menuClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium relative group
  ${
    isActive
      ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25 scale-105"
      : "text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 hover:shadow-lg hover:scale-102"
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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Overlay (Mobile) */}
      {open && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full z-40
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white backdrop-blur-xl
        transition-all duration-500 ease-in-out overflow-hidden flex flex-col shadow-2xl
        ${open ? "w-80" : "w-0 lg:w-20"} border-r border-slate-700/50`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700/50 flex-shrink-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <MdDashboard size={20} className="text-white" />
            </div>
            {open && (
              <div>
                <h1 className="font-bold text-xl tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Branch Admin
                </h1>
                <p className="text-xs text-slate-400">Management System</p>
              </div>
            )}
          </div>

          {isMobile && (
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-xl hover:bg-slate-700/50 transition"
            >
              <MdClose size={22} />
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2 mt-4 flex-1 overflow-y-auto custom-scrollbar">
          <NavLink
            to="/dashbord"
            end
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaHome size={20} />
            {open && <span className="font-semibold">Dashboard</span>}
            {!open && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Dashboard
              </div>
            )}
          </NavLink>

          <NavLink
            to="/dashbord/manage-staff"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaUsers size={20} />
            {open && <span className="font-semibold">Manage Staff</span>}
            {!open && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Manage Staff
              </div>
            )}
          </NavLink>

          <NavLink
            to="/dashbord/manage-teacher"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaChalkboardTeacher size={20} />
            {open && <span className="font-semibold">Manage Teacher</span>}
            {!open && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Manage Teacher
              </div>
            )}
          </NavLink>

          <NavLink
            to="/dashbord/manage-section"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaLayerGroup size={20} />
            {open && <span className="font-semibold">Manage Section</span>}
            {!open && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Manage Section
              </div>
            )}
          </NavLink>

          <NavLink
            to="/dashbord/manage-class"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaGraduationCap size={20} />
            {open && <span className="font-semibold">Manage Class</span>}
            {!open && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Manage Class
              </div>
            )}
          </NavLink>

          <NavLink
            to="/dashbord/manage-fees"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaMoneyBillWave size={20} />
            {open && <span className="font-semibold">Manage Fees</span>}
            {!open && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Manage Fees
              </div>
            )}
          </NavLink>

          <NavLink
            to="/dashbord/approval"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaCheckCircle size={20} />
            {open && <span className="font-semibold">Approval</span>}
            {!open && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Approval
              </div>
            )}
          </NavLink>

          <NavLink
            to="/dashbord/reports"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaChartBar size={20} />
            {open && <span className="font-semibold">Reports</span>}
            {!open && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Reports
              </div>
            )}
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700/50 flex-shrink-0">
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-center gap-3 px-6 py-4 rounded-2xl
            bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 
            hover:shadow-xl hover:shadow-red-500/25 hover:scale-105 transition-all duration-300 font-semibold"
          >
            <FaSignOutAlt size={18} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center px-6 flex-shrink-0 shadow-sm">
          {/* Left: Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="p-3 rounded-2xl hover:bg-slate-100 transition-all duration-200 hover:scale-105"
          >
            <GiHamburgerMenu size={22} className="text-slate-700" />
          </button>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right Side Content */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="w-72 hidden md:block">
              <div className="relative">
                <FaSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-3 rounded-2xl hover:bg-slate-100 transition-all hover:scale-105">
              <FaBell size={20} className="text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Settings */}
            <button className="p-3 rounded-2xl hover:bg-slate-100 transition-all hover:scale-105">
              <FaCog size={20} className="text-slate-600" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700">
                  Branch Admin
                </p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div
                className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600
        flex items-center justify-center text-white font-bold cursor-pointer
        hover:shadow-lg hover:scale-105 transition-all"
              >
                B
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="flex-1 overflow-hidden">
          <div className="h-full bg-gradient-to-br from-white via-slate-50 to-blue-50 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-indigo-500/3"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/8 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/8 to-transparent rounded-full blur-3xl"></div>

            {/* Scrollable Content */}
            <div className="relative z-10 h-full overflow-auto p-6 custom-scrollbar">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 min-h-[calc(100vh-8rem)]">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(51, 65, 85, 0.5);
        }
      `}</style>
    </div>
  );
}
