import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaCrown,
  FaStar,
  FaRocket,
  FaGem,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Plans = () => {
  const [plans, setPlans] = useState([
    {
      id: "STARTER_001",
      name: "Starter Plan",
      price: "₹499",
      duration: "Monthly",
      features: [
        "Up to 100 Students",
        "Basic Student Management",
        "Attendance Tracking",
        "Basic Reports",
        "Email Support",
        "2GB Storage",
        "Mobile App Access",
      ],
      popular: false,
      color: "blue",
    },
    {
      id: "BASIC_002",
      name: "Basic Plan",
      price: "₹999",
      duration: "Monthly",
      features: [
        "Up to 500 Students",
        "Complete Student Management",
        "Attendance & Leave Management",
        "Fee Management",
        "Basic Reports & Analytics",
        "Email & SMS Support",
        "10GB Storage",
        "Mobile App Access",
        "Parent Portal",
      ],
      popular: false,
      color: "green",
    },
    {
      id: "PREMIUM_003",
      name: "Premium Plan",
      price: "₹1999",
      duration: "Monthly",
      features: [
        "Up to 2000 Students",
        "Advanced Student Management",
        "Complete Attendance System",
        "Advanced Fee Management",
        "Exam & Result Management",
        "Advanced Reports & Analytics",
        "Priority Support (Phone + Email)",
        "50GB Storage",
        "Custom Branding",
        "Parent & Teacher Portal",
        "Library Management",
        "Transport Management",
      ],
      popular: true,
      color: "purple",
    },
    {
      id: "PROFESSIONAL_004",
      name: "Professional Plan",
      price: "₹3499",
      duration: "Monthly",
      features: [
        "Up to 5000 Students",
        "Multi-Branch Management",
        "Complete Academic Management",
        "Advanced Fee & Accounting",
        "Comprehensive Exam System",
        "Advanced Analytics Dashboard",
        "Dedicated Account Manager",
        "200GB Storage",
        "Full Custom Branding",
        "All Portal Access",
        "Hostel Management",
        "Inventory Management",
        "HR & Payroll Management",
        "API Access",
      ],
      popular: false,
      color: "orange",
    },
    {
      id: "ENTERPRISE_005",
      name: "Enterprise Plan",
      price: "₹6999",
      duration: "Monthly",
      features: [
        "Unlimited Students",
        "Multi-Institution Management",
        "Complete ERP Solution",
        "Advanced Financial Management",
        "AI-Powered Analytics",
        "24/7 Dedicated Support",
        "Unlimited Storage",
        "White Label Solution",
        "Custom Development",
        "All Management Modules",
        "Advanced Security Features",
        "Data Migration Support",
        "Training & Onboarding",
        "Custom Integrations",
        "Backup & Recovery",
      ],
      popular: false,
      color: "red",
    },
    {
      id: "CUSTOM_006",
      name: "Custom Plan",
      price: "Contact Us",
      duration: "Flexible",
      features: [
        "Tailored to Your Needs",
        "Custom Student Capacity",
        "Personalized Features",
        "Custom Integrations",
        "Dedicated Development Team",
        "Priority Support",
        "Custom Storage Solutions",
        "Flexible Pricing Model",
        "Custom Branding & Design",
        "On-Premise Deployment Option",
        "Advanced Security Compliance",
        "Custom Training Programs",
        "Dedicated Project Manager",
      ],
      popular: false,
      color: "indigo",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    Swal.fire({
      title: "Plan Selected!",
      text: `${planId} has been selected successfully`,
      icon: "success",
      confirmButtonColor: "#3B82F6",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: [...plan.features],
      color: plan.color,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeletePlan = (planId) => {
    Swal.fire({
      title: "Delete Plan?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setPlans(plans.filter((plan) => plan.id !== planId));
        Swal.fire({
          title: "Deleted!",
          text: `${planId} has been deleted successfully`,
          icon: "success",
          confirmButtonColor: "#3B82F6",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "Monthly",
    features: [""],
    color: "blue",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      setPlans(
        plans.map((plan) =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                ...formData,
                features: formData.features.filter((f) => f.trim() !== ""),
              }
            : plan
        )
      );
    } else {
      const newPlan = {
        id: `PLAN_${Date.now()}`,
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ""),
        popular: false,
      };
      setPlans([...plans, newPlan]);
    }

    resetForm();

    Swal.fire({
      title: isEditMode ? "Plan Updated!" : "Plan Added!",
      text: isEditMode
        ? "Plan has been updated successfully"
        : "New plan has been created successfully",
      icon: "success",
      confirmButtonColor: "#3B82F6",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      duration: "Monthly",
      features: [""],
      color: "blue",
    });
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingPlan(null);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 border-blue-200",
      purple: "from-purple-500 to-purple-600 border-purple-200",
      green: "from-green-500 to-green-600 border-green-200",
      orange: "from-orange-500 to-orange-600 border-orange-200",
      red: "from-red-500 to-red-600 border-red-200",
      indigo: "from-indigo-500 to-indigo-600 border-indigo-200",
    };
    return colors[color] || colors.blue;
  };

  const getPlanIcon = (index) => {
    const icons = [FaStar, FaCheck, FaCrown, FaRocket, FaStar, FaCrown];
    const Icon = icons[index] || FaStar;
    return <Icon className="text-white" size={20} />;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaGem className="text-yellow-300 text-2xl" />
              <h1 className="text-4xl font-bold text-white">
                Subscription Plans
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              Create and manage pricing plans for your education platform
            </p>
            <div className="flex items-center gap-6 mt-4 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">{plans.length} Active Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm">
                  {plans.filter((p) => p.popular).length} Popular
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditMode(false);
              setFormData({
                name: "",
                price: "",
                duration: "Monthly",
                features: [""],
                color: "blue",
              });
              setIsModalOpen(true);
            }}
            className="relative z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl flex items-center gap-3 border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <FaPlus className="text-lg" />
            <span className="font-semibold">Create New Plan</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`relative group bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl shadow-xl border-2 ${
              plan.popular
                ? "border-purple-300 shadow-purple-200/50 transform scale-105"
                : selectedPlan === plan.id
                ? "border-green-300 shadow-green-200/50"
                : "border-slate-200 hover:border-blue-300"
            } overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-bl-2xl rounded-tr-3xl text-xs font-bold shadow-lg">
                ⭐ POPULAR
              </div>
            )}

            {/* Selected Badge */}
            {selectedPlan === plan.id && (
              <div className="absolute -top-1 -left-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-br-2xl rounded-tl-3xl text-xs font-bold shadow-lg">
                ✓ SELECTED
              </div>
            )}

            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${getColorClasses(
                    plan.color
                  )} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {getPlanIcon(index)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPlan(plan)}
                    className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                    title="Edit Plan"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                    title="Delete Plan"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {plan.name}
                </h3>
                <div className="text-xs text-slate-500 font-mono bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-2 rounded-lg mb-4 border">
                  ID: {plan.id}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 font-medium">
                    /{plan.duration}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.slice(0, 6).map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group/feature"
                  >
                    <div className="p-1 rounded-full bg-green-100 group-hover/feature:bg-green-200 transition-colors">
                      <FaCheck className="text-green-600 text-xs" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium group-hover/feature:text-slate-800 transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.features.length > 6 && (
                  <div className="text-center">
                    <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      +{plan.features.length - 6} more features
                    </span>
                  </div>
                )}
              </div>

              {/* Select Button */}
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  selectedPlan === plan.id
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-300"
                    : plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-purple-300"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-blue-300"
                }`}
              >
                {selectedPlan === plan.id
                  ? "✓ SELECTED"
                  : plan.popular
                  ? "CHOOSE PLAN"
                  : "SELECT PLAN"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex   justify-center z-50 ">
          <div className="bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl mt-20 p-8 w-full max-w-4xl shadow-2xl border border-slate-200/50 overflow-y-auto relative h-[1000px]  scrollbar-hide">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl">
                  <FaGem className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {isEditMode ? "Edit Subscription Plan" : "Create New Plan"}
                  </h2>
                  <p className="text-slate-600 text-lg">
                    {isEditMode
                      ? "Modify your existing plan configuration"
                      : "Design a powerful subscription plan"}
                  </p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm text-slate-500 hover:bg-white hover:text-slate-700 hover:scale-110 transition-all duration-300 shadow-lg border border-slate-200/50"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Section */}
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-6 rounded-2xl border border-blue-200/50">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-white shadow-sm"
                      placeholder="Enter plan name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-white shadow-sm"
                      placeholder="₹999"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Configuration Section */}
              <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 p-6 rounded-2xl border border-purple-200/50">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-white shadow-sm"
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Color Theme
                    </label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-white shadow-sm"
                    >
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="green">Green</option>
                      <option value="orange">Orange</option>
                      <option value="red">Red</option>
                      <option value="indigo">Indigo</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 p-6 rounded-2xl border border-emerald-200/50">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Features & Benefits
                </h3>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="flex-1 px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-white shadow-sm"
                      placeholder="Enter feature"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-300 shadow-sm"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="mt-4 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 hover:scale-105 transition-all duration-300 text-sm font-semibold shadow-sm border border-emerald-200"
                >
                  + Add Feature
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 hover:scale-105 transition-all duration-300 font-bold text-lg shadow-xl"
                >
                  {isEditMode ? "Update Plan" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;

// Add custom scrollbar styles
const styles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
