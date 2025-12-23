import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaStar,
  FaGem,
} from "react-icons/fa";
import Swal from "sweetalert2";
import AddPlan from "./AddPlan";

const MODULES = [
  "Student Management",
  "Academic Management",
  "Attendance Management",
  "Fee & Finance Management",
  "Communication & Notifications",
  "Parent & Student Portal",
  "Teacher Portal",
  "Transport Management",
  "Hostel / Boarding Management",
  "Report & Analytics",
  "Security & Backup",
  "Extra Features for Modern Schools",
];

const Plans = ({ onPlansUpdate }) => {
  const [plans, setPlans] = useState(() => {
    // Load plans from localStorage on initialization
    const savedPlans = localStorage.getItem('availablePlans');
    return savedPlans ? JSON.parse(savedPlans) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize plans and notify parent on mount
  React.useEffect(() => {
    if (onPlansUpdate) {
      onPlansUpdate(plans);
    }
  }, [plans, onPlansUpdate]);

  const handleAddPlan = (newPlan) => {
    let updatedPlans;
    if (isEditMode) {
      updatedPlans = plans.map((p) => (p.id === editingPlan.id ? { ...p, ...newPlan } : p));
    } else {
      updatedPlans = [...plans, { id: Date.now(), ...newPlan }];
    }
    
    setPlans(updatedPlans);
    // Save to localStorage
    localStorage.setItem('availablePlans', JSON.stringify(updatedPlans));
    
    // Notify parent component about plans update
    if (onPlansUpdate) {
      onPlansUpdate(updatedPlans);
    }

    setShowAddForm(false);
    setIsEditMode(false);
    setEditingPlan(null);
    
    Swal.fire({
      icon: "success",
      title: isEditMode ? "Plan Updated" : "Plan Created",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setIsEditMode(true);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this plan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    }).then((res) => {
      if (res.isConfirmed) {
        const updatedPlans = plans.filter((p) => p.id !== id);
        setPlans(updatedPlans);
        // Save to localStorage
        localStorage.setItem('availablePlans', JSON.stringify(updatedPlans));
        
        // Notify parent component about plans update
        if (onPlansUpdate) {
          onPlansUpdate(updatedPlans);
        }
      }
    });
  };

  const resetForm = () => {
    setShowAddForm(false);
    setIsEditMode(false);
    setEditingPlan(null);
  };

  if (showAddForm) {
    return (
      <AddPlan
        onBack={() => setShowAddForm(false)}
        onSubmit={handleAddPlan}
        editData={isEditMode ? editingPlan : null}
        isEdit={isEditMode}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaGem className="text-purple-600" /> Plans
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus /> Create Plan
        </button>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow-lg border p-6"
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>

            <p className="text-sm text-gray-600 mb-2">
              {plan.planType === "per_student"
                ? `₹${plan.pricePerStudent} / student`
                : plan.planType === "monthly"
                ? `₹${plan.monthlyPrice} / month`
                : `₹${plan.yearlyPrice} / year`}
            </p>

            <div className="space-y-1 text-sm mb-4">
              {plan.selectedModules.slice(0, 4).map((m) => (
                <div key={m} className="flex items-center gap-2">
                  <FaCheck className="text-green-500 text-xs" /> {m}
                </div>
              ))}
              {plan.selectedModules.length > 4 && (
                <p className="text-xs text-gray-400">
                  +{plan.selectedModules.length - 4} more
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(plan)}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="p-2 bg-red-100 text-red-600 rounded-lg"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
