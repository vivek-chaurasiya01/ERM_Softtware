import React, { useState } from 'react';
import { FaPlus, FaEdit, FaToggleOn, FaToggleOff, FaTimes, FaUniversity, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTable, FaThLarge, FaEye, FaEyeSlash } from 'react-icons/fa';

const CollegeManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colleges, setColleges] = useState([
    { id: 1, name: 'ABC Engineering College', email: 'admin@abc.edu', phone: '9876543210', address: 'Mumbai, Maharashtra', status: 'active' },
    { id: 2, name: 'XYZ Medical College', email: 'admin@xyz.edu', phone: '9876543211', address: 'Delhi, India', status: 'inactive' },
    { id: 3, name: 'PQR Business School', email: 'info@pqr.edu', phone: '9876543212', address: 'Bangalore, Karnataka', status: 'active' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    selectedPlan: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    status: 'active'
  });

  const [availablePlans] = useState([
    { id: 'STARTER_001', name: 'Starter Plan', price: '₹499/month' },
    { id: 'BASIC_002', name: 'Basic Plan', price: '₹999/month' },
    { id: 'PREMIUM_003', name: 'Premium Plan', price: '₹1999/month' },
    { id: 'PROFESSIONAL_004', name: 'Professional Plan', price: '₹3499/month' },
    { id: 'ENTERPRISE_005', name: 'Enterprise Plan', price: '₹6999/month' },
    { id: 'CUSTOM_006', name: 'Custom Plan', price: 'Contact Us' }
  ]);

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (isEditMode) {
      setColleges(colleges.map(college => 
        college.id === editingCollege.id 
          ? { ...college, ...formData, updatedAt: new Date().toLocaleDateString() }
          : college
      ));
    } else {
      const newCollege = {
        id: colleges.length + 1,
        ...formData,
        createdAt: new Date().toLocaleDateString()
      };
      setColleges([...colleges, newCollege]);
    }
    
    resetForm();
  };

  const handleEdit = (college) => {
    setEditingCollege(college);
    setFormData({
      name: college.name,
      email: college.email,
      phone: college.phone,
      address: college.address,
      password: '',
      confirmPassword: '',
      selectedPlan: college.selectedPlan || '',
      adminName: college.adminName || '',
      adminEmail: college.adminEmail || '',
      adminPhone: college.adminPhone || '',
      status: college.status
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      address: '', 
      password: '', 
      confirmPassword: '', 
      selectedPlan: '',
      adminName: '',
      adminEmail: '',
      adminPhone: '',
      status: 'active' 
    });
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingCollege(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleStatus = (id) => {
    setColleges(colleges.map(college => 
      college.id === id 
        ? { ...college, status: college.status === 'active' ? 'inactive' : 'active' }
        : college
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            College Management
          </h1>
          <p className="text-slate-600">Register and manage colleges with complete control</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
            >
              <FaThLarge className="sm:mr-2" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'}`}
            >
              <FaTable className="sm:mr-2" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
          <button
            onClick={() => {
              setIsEditMode(false);
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaPlus /> <span className="hidden sm:inline">Add College</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Colleges Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div key={college.id} className="bg-gradient-to-br from-white to-slate-50 backdrop-blur-sm rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                  <FaUniversity className="text-blue-500 text-xl" />
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  college.status === 'active' 
                    ? 'bg-gradient-to-r from-green-400 to-green-500' 
                    : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}></div>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                {college.name}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <FaEnvelope className="text-sm" />
                  <span className="text-sm">{college.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <FaPhone className="text-sm" />
                  <span className="text-sm">{college.phone}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  onClick={() => toggleStatus(college.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    college.status === 'active' 
                      ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 hover:from-green-200 hover:to-green-300' 
                      : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 hover:from-red-200 hover:to-red-300'
                  }`}
                >
                  {college.status === 'active' ? <FaToggleOn /> : <FaToggleOff />}
                  {college.status}
                </button>
                <button 
                  onClick={() => handleEdit(college)}
                  className="p-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">College Name</th>
                  <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">Phone</th>
                  <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">Address</th>
                  <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {colleges.map((college) => (
                  <tr key={college.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1 sm:p-2 rounded-lg bg-blue-100">
                          <FaUniversity className="text-blue-600 text-xs sm:text-sm" />
                        </div>
                        <span className="font-medium text-slate-800 text-sm sm:text-base truncate">{college.name}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-slate-600 text-sm truncate">{college.email}</td>
                    <td className="px-3 sm:px-6 py-4 text-slate-600 text-sm">{college.phone}</td>
                    <td className="px-3 sm:px-6 py-4 text-slate-600 text-sm truncate">{college.address}</td>
                    <td className="px-3 sm:px-6 py-4">
                      <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        college.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {college.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => toggleStatus(college.id)}
                          className="p-1.5 sm:p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                          title="Toggle Status"
                        >
                          {college.status === 'active' ? <FaToggleOn className="text-sm" /> : <FaToggleOff className="text-sm" />}
                        </button>
                        <button 
                          onClick={() => handleEdit(college)}
                          className="p-1.5 sm:p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="Edit College"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-4xl shadow-2xl border border-slate-200 my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {isEditMode ? 'Edit College' : 'Add New College'}
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  {isEditMode ? 'Update college information' : 'Register a new college in the system'}
                </p>
              </div>
              <button
                onClick={resetForm}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all duration-300"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Two Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      Basic Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">College Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                          placeholder="Enter college name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                          placeholder="admin@college.edu"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                          placeholder="9876543210"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none bg-white"
                          rows="3"
                          placeholder="Enter college address"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl border border-green-100">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
                      Security & Settings
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Password *</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                            placeholder="Enter password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password *</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                            placeholder="Confirm password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Select Plan *</label>
                        <select
                          name="selectedPlan"
                          value={formData.selectedPlan}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                          required
                        >
                          <option value="">Choose a plan...</option>
                          {availablePlans.map(plan => (
                            <option key={plan.id} value={plan.id}>
                              {plan.name} - {plan.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Password Strength Indicator */}
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-600 mb-2">Password Requirements:</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              formData.password.length >= 8 ? 'bg-green-500' : 'bg-slate-300'
                            }`}></div>
                            <span className="text-xs text-slate-600">At least 8 characters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              formData.password === formData.confirmPassword && formData.password.length > 0 ? 'bg-green-500' : 'bg-slate-300'
                            }`}></div>
                            <span className="text-xs text-slate-600">Passwords match</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* College Admin Section */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                  College Admin Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Admin Name *</label>
                    <input
                      type="text"
                      name="adminName"
                      value={formData.adminName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                      placeholder="Enter admin name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Admin Email *</label>
                    <input
                      type="email"
                      name="adminEmail"
                      value={formData.adminEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Admin Phone *</label>
                    <input
                      type="tel"
                      name="adminPhone"
                      value={formData.adminPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white"
                      placeholder="9876543210"
                      required
                    />
                  </div>
                </div>
                
                {formData.selectedPlan && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-600 mb-2">Selected Plan:</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-slate-800">
                        {availablePlans.find(plan => plan.id === formData.selectedPlan)?.name}
                      </span>
                      <span className="text-slate-600">
                        - {availablePlans.find(plan => plan.id === formData.selectedPlan)?.price}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  {isEditMode ? 'Update College' : 'Add College'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeManagement;