import React, { useState } from "react";
import {
  FaArrowLeft,
  FaGem,
  FaCheck,
} from "react-icons/fa";

const MODULES = [
  "Student Management",
  "Teacher Management", 
  "Fee Management",
  "Attendance Management",
  "Exam Management",
  "Library Management",
  "Transport Management",
  "Hostel Management",
  "Inventory Management",
  "Communication",
  "Reports & Analytics",
  "Online Classes"
];

function AddPlan({ onBack, onSubmit, editData, isEdit }) {
  const [formData, setFormData] = useState({
    name: editData?.name || "",
    planType: editData?.planType || "per_student",
    pricePerStudent: editData?.pricePerStudent || "",
    monthlyPrice: editData?.monthlyPrice || "",
    yearlyPrice: editData?.yearlyPrice || "",
    selectedModules: editData?.selectedModules || [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModule = (module) => {
    setFormData(prev => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(module)
        ? prev.selectedModules.filter(m => m !== module)
        : [...prev.selectedModules, module]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPlan = {
      ...formData,
      id: editData?.id || `PLAN_${Date.now()}`,
    };

    onSubmit(newPlan);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <FaGem className="text-blue-600" />
            {isEdit ? 'Edit Plan' : 'Add New Plan'}
          </h1>
          <p className="text-slate-600 flex items-center gap-2">
            <FaGem className="text-blue-500" />
            {isEdit ? 'Update plan information and features' : 'Create a new subscription plan in the system'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Details Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FaGem className="text-blue-500" />
              Plan Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FaGem className="text-blue-500" />
                  Plan Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Premium Plan"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Plan Type *</label>
                <select
                  name="planType"
                  value={formData.planType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white shadow-sm"
                  required
                >
                  <option value="per_student">Per Student Basis</option>
                  <option value="monthly">Monthly Fixed Price</option>
                  <option value="yearly">Yearly Fixed Price</option>
                </select>
              </div>

              {formData.planType === "per_student" ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Price Per Student *</label>
                  <input
                    type="text"
                    name="pricePerStudent"
                    placeholder="e.g., ₹10 per student"
                    value={formData.pricePerStudent}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white shadow-sm"
                    required
                  />
                </div>
              ) : formData.planType === "monthly" ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Price *</label>
                  <input
                    type="text"
                    name="monthlyPrice"
                    placeholder="e.g., ₹999 per month"
                    value={formData.monthlyPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white shadow-sm"
                    required
                  />
                </div>
              ) : formData.planType === "yearly" ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Yearly Price *</label>
                  <input
                    type="text"
                    name="yearlyPrice"
                    placeholder="e.g., ₹9999 per year"
                    value={formData.yearlyPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white shadow-sm"
                    required
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Features Selection Section */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
              Select Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MODULES.map((module) => (
                <div
                  key={module}
                  onClick={() => toggleModule(module)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.selectedModules.includes(module)
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-slate-200 bg-white hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.selectedModules.includes(module)
                        ? 'border-green-500 bg-green-500'
                        : 'border-slate-300'
                    }`}>
                      {formData.selectedModules.includes(module) && (
                        <FaCheck className="text-white text-xs" />
                      )}
                    </div>
                    <span className="font-medium text-slate-700">{module}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <FaGem />
              {isEdit ? 'Update Plan' : 'Create Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPlan;