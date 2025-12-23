import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaTimes,
  FaSchool,
  FaEnvelope,
  FaPhone,
  FaTable,
  FaThLarge,
  FaUsers,
  FaStar,
  FaTrash,
  FaGraduationCap,
} from "react-icons/fa";
import AddSchool from "./AddSchool";

const SchoolManagement = ({ availablePlans = [] }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  
  // Load plans from localStorage directly
  const [localPlans, setLocalPlans] = useState(() => {
    const savedPlans = localStorage.getItem('availablePlans');
    return savedPlans ? JSON.parse(savedPlans) : [];
  });
  
  // Use localStorage plans if available, otherwise use props
  const currentPlans = localPlans.length > 0 ? localPlans : availablePlans;
  
  // Listen for localStorage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      const savedPlans = localStorage.getItem('availablePlans');
      setLocalPlans(savedPlans ? JSON.parse(savedPlans) : []);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for changes
    const interval = setInterval(() => {
      const savedPlans = localStorage.getItem('availablePlans');
      const currentSavedPlans = savedPlans ? JSON.parse(savedPlans) : [];
      if (JSON.stringify(currentSavedPlans) !== JSON.stringify(localPlans)) {
        setLocalPlans(currentSavedPlans);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [localPlans]);

  const [schools, setSchools] = useState([
    {
      id: 1,
      name: "ABC Public School",
      email: "admin@abcschool.edu",
      phone: "9876543210",
      status: "active",
      students: 1250,
      rating: 4.8,
    },
    {
      id: 2,
      name: "XYZ International School",
      email: "admin@xyzschool.edu",
      phone: "9876543211",
      status: "inactive",
      students: 980,
      rating: 4.5,
    },
  ]);

  const handleAddSchool = (newSchool) => {
    if (isEditMode) {
      setSchools(
        schools.map((s) =>
          s.id === editingSchool.id ? { ...newSchool, id: s.id } : s
        )
      );
    } else {
      setSchools([...schools, newSchool]);
    }
    setShowAddForm(false);
    setIsEditMode(false);
    setEditingSchool(null);
  };

  const handleEdit = (school) => {
    setEditingSchool(school);
    setIsEditMode(true);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this school?")) {
      setSchools(schools.filter((s) => s.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setSchools(
      schools.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "active" ? "inactive" : "active" }
          : s
      )
    );
  };

  if (showAddForm) {
    return (
      <AddSchool
        onBack={() => setShowAddForm(false)}
        onSubmit={handleAddSchool}
        editData={isEditMode ? editingSchool : null}
        isEdit={isEditMode}
        availablePlans={currentPlans}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent gap-2">
            <FaSchool /> School Management
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 flex items-center gap-2">
            <FaGraduationCap /> Manage schools easily
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* View Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg text-sm ${
                viewMode === "grid"
                  ? "bg-white shadow text-blue-600"
                  : "text-slate-600"
              }`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg text-sm ${
                viewMode === "table"
                  ? "bg-white shadow text-blue-600"
                  : "text-slate-600"
              }`}
            >
              <FaTable />
            </button>
          </div>

          {currentPlans.length === 0 ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center max-w-md">
              <p className="text-red-600 font-medium">⚠️ No plans available!</p>
              <p className="text-red-500 text-sm mt-1">Please create a plan first in Plans Management.</p>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow hover:shadow-lg transition"
            >
              <FaPlus /> Add School
            </button>
          )}
        </div>
      </div>

      {/* ================= GRID VIEW ================= */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-2xl p-5 border hover:border-blue-400 hover:shadow-xl transition"
            >
              <div className="flex justify-between mb-3">
                <div className="p-3 rounded-xl bg-blue-50">
                  <FaSchool className="text-blue-600" />
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    school.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {school.status}
                </span>
              </div>

              <h3 className="font-semibold text-lg text-slate-800">
                {school.name}
              </h3>

              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <FaEnvelope /> {school.email}
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone /> {school.phone}
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers /> {school.students} Students
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" /> {school.rating}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <button
                  onClick={() => toggleStatus(school.id)}
                  className="flex items-center gap-2 text-sm px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  {school.status === "active" ? (
                    <FaToggleOn className="text-green-600" />
                  ) : (
                    <FaToggleOff className="text-red-600" />
                  )}
                  Status
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(school)}
                    className="p-2 bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(school.id)}
                    className="p-2 bg-red-100 rounded-lg text-red-600 hover:bg-red-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TABLE VIEW ================= */}
      {viewMode === "table" && (
        <div className="bg-white rounded-2xl shadow border overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm">School</th>
                <th className="px-6 py-4 text-left text-sm">Email</th>
                <th className="px-6 py-4 text-left text-sm">Phone</th>
                <th className="px-6 py-4 text-left text-sm">Students</th>
                <th className="px-6 py-4 text-left text-sm">Rating</th>
                <th className="px-6 py-4 text-left text-sm">Status</th>
                <th className="px-6 py-4 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr
                  key={school.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {school.name}
                  </td>
                  <td className="px-6 py-4">{school.email}</td>
                  <td className="px-6 py-4">{school.phone}</td>
                  <td className="px-6 py-4">{school.students}</td>
                  <td className="px-6 py-4">{school.rating}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        school.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {school.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => toggleStatus(school.id)}
                        className="p-1.5 sm:p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                        title="Toggle Status"
                      >
                        {school.status === "active" ? (
                          <FaToggleOn className="text-green-600 text-sm" />
                        ) : (
                          <FaToggleOff className="text-red-600 text-sm" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(school)}
                        className="p-1.5 sm:p-2 bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors"
                        title="Edit School"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(school.id)}
                        className="p-1.5 sm:p-2 bg-red-100 rounded-lg text-red-600 hover:bg-red-200 transition-colors"
                        title="Delete School"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;
