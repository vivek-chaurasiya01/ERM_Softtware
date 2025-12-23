import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
  FaBuilding,
  FaGraduationCap,
} from "react-icons/fa";

/* =======================
   STATS CONFIG
======================= */
const stats = [
  {
    title: "Total School Admin",
    value: "156",
    icon: <FaUserTie size={28} />,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Active Admin",
    value: "142",
    icon: <FaCheckCircle size={28} />,
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "Blocked Admin",
    value: "14",
    icon: <FaTimesCircle size={28} />,
    gradient: "from-red-500 to-red-600",
  },
  {
    title: "Total Plans",
    value: "8",
    icon: <FaBriefcase size={28} />,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Total Branches",
    value: "324",
    icon: <FaBuilding size={28} />,
    gradient: "from-orange-500 to-orange-600",
  },
  {
    title: "Total Students",
    value: "12,847",
    icon: <FaGraduationCap size={28} />,
    gradient: "from-indigo-500 to-indigo-600",
  },
];

/* =======================
   MANAGEMENT CARDS
======================= */
const adminCards = [
  {
    title: "College Management",
    description: "Register, activate or deactivate colleges",
    icon: <FaUniversity size={26} className="text-teal-600" />,
    path: "/dashbord/college-management",
  },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Super Admin Dashboard
        </h1>
        <p className="text-slate-600 mt-1">
          Control and monitor the entire education system
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl p-8 text-white
            bg-gradient-to-r ${item.gradient}
            transition-all duration-300
            hover:scale-[1.04] hover:shadow-2xl`}
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition"></div>

            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/20">
                {item.icon}
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                Stats
              </span>
            </div>

            <h4 className="text-lg opacity-90">{item.title}</h4>
            <p className="text-4xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ================= MANAGEMENT ================= */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Management Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className="group cursor-pointer bg-white rounded-2xl p-6 border
              transition-all duration-300
              hover:border-blue-400 hover:-translate-y-1
              hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition">
                  {card.icon}
                </div>
                <span className="text-xs text-slate-400">Module</span>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {card.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {card.description}
              </p>

              <div className="mt-4 text-sm font-medium text-blue-600">
                Open Module →
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SuperAdminDashboard;
