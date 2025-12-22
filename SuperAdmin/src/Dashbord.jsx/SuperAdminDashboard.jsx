import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaSchool,
  FaCreditCard,
  FaCog,
  FaGlobe,
  FaChartBar,
  FaShieldAlt,
  FaServer,
  FaUsers,
  FaUniversity,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const adminCards = [
    {
      title: "College Management",
      description: "Register and manage colleges with active/inactive status",
      icon: <FaUniversity className="text-teal-500" size={24} />,
      bgGradient: "from-teal-500/10 to-teal-600/5",
      borderColor: "border-teal-200",
      hoverColor: "hover:border-teal-400",
      path: "/dashbord/college-management",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Super Admin Dashboard
        </h1>
        <p className="text-slate-600">
          Manage your entire education management system from here
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaUserTie size={32} />
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Total</span>
          </div>
          <h4 className="text-lg font-medium opacity-90">Total School Admin</h4>
          <p className="text-4xl font-bold">156</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaCheckCircle size={32} />
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Active</span>
          </div>
          <h4 className="text-lg font-medium opacity-90">Active Admin</h4>
          <p className="text-4xl font-bold">142</p>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaTimesCircle size={32} />
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Blocked</span>
          </div>
          <h4 className="text-lg font-medium opacity-90">Blocked / Inactive Admin</h4>
          <p className="text-4xl font-bold">14</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaBriefcase size={32} />
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Plans</span>
          </div>
          <h4 className="text-lg font-medium opacity-90">Total Plans</h4>
          <p className="text-4xl font-bold">8</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaBuilding size={32} />
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Branches</span>
          </div>
          <h4 className="text-lg font-medium opacity-90">Total Branch (All Admins)</h4>
          <p className="text-4xl font-bold">324</p>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <FaGraduationCap size={32} />
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Students</span>
          </div>
          <h4 className="text-lg font-medium opacity-90">Total Students (Overall)</h4>
          <p className="text-4xl font-bold">12,847</p>
        </div>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.path)}
            className={`bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm rounded-2xl p-6 border-2 ${card.borderColor} ${card.hoverColor} transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/50 group-hover:bg-white/70 transition-all duration-300">
                {card.icon}
              </div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-60"></div>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
              {card.title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
              {card.description}
            </p>

            <div className="mt-4 flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-600 transition-colors">
              <span>Manage →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
