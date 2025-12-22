import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';

export default function ManageFees() {
  const { classes, sections, fees, addFee, updateFee, deleteFee } = useSchool();
  const [showForm, setShowForm] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [formData, setFormData] = useState({
    feeName: '',
    feeType: '',
    className: '',
    sectionName: '',
    academicYear: '2025-26',
    
    // Fee Structure
    tuitionFee: '',
    admissionFee: '',
    examFee: '',
    transportFee: '',
    libraryFee: '',
    labFee: '',
    sportsFee: '',
    developmentFee: '',
    miscellaneousFee: '',
    
    // Payment Details
    paymentFrequency: 'Monthly',
    dueDate: '',
    lateFeeAmount: '',
    discountAmount: '',
    
    description: ''
  });

  const feeTypes = [
    'Monthly Fee',
    'Admission Fee', 
    'Exam Fee',
    'Annual Fee',
    'Transport Fee',
    'Sports Fee',
    'Development Fee',
    'Library Fee',
    'Lab Fee',
    'Event Fee',
    'Uniform Fee',
    'Book Fee'
  ];

  const handleAddFee = () => {
    if (sections.length === 0) {
      alert('Please create sections first!');
      return;
    }
    if (classes.length === 0) {
      alert('Please create classes first!');
      return;
    }
    setShowForm(true);
    setEditingFee(null);
    setFormData({
      feeName: '',
      feeType: '',
      className: '',
      sectionName: '',
      academicYear: '2025-26',
      tuitionFee: '',
      admissionFee: '',
      examFee: '',
      transportFee: '',
      libraryFee: '',
      labFee: '',
      sportsFee: '',
      developmentFee: '',
      miscellaneousFee: '',
      paymentFrequency: 'Monthly',
      dueDate: '',
      lateFeeAmount: '',
      discountAmount: '',
      description: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = calculateTotalAmount();
    const feeData = { ...formData, totalAmount, id: editingFee?.id || Date.now() };
    
    if (editingFee) {
      updateFee(editingFee.id, feeData);
    } else {
      addFee(feeData);
    }
    setShowForm(false);
    setEditingFee(null);
  };

  const handleEdit = (fee) => {
    setEditingFee(fee);
    setFormData(fee);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deleteFee(id);
  };

  const getAvailableSections = (className) => {
    const selectedClass = classes.find(c => c.className === className);
    return selectedClass?.assignedSections || [];
  };

  const calculateTotalAmount = () => {
    const fees = [
      formData.tuitionFee, formData.admissionFee, formData.examFee,
      formData.transportFee, formData.libraryFee, formData.labFee,
      formData.sportsFee, formData.developmentFee, formData.miscellaneousFee
    ];
    const total = fees.reduce((sum, fee) => sum + (parseInt(fee) || 0), 0);
    const discount = parseInt(formData.discountAmount) || 0;
    return total - discount;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl sm:text-2xl font-bold">💰</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Fee Management</h1>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Create and manage comprehensive fee structures</p>
            </div>
          </div>
          <button 
            onClick={handleAddFee}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="text-base sm:text-lg">➕</span>
            Create New Fee
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg mb-6 sm:mb-8 border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-blue-600 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">📋</span>
              {editingFee ? 'Edit Fee Structure' : 'Create Fee Structure'}
            </h3>
            <p className="text-blue-100 mt-1 sm:mt-2 text-xs sm:text-sm">Configure comprehensive fee details for students</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Basic Details */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-sm sm:text-lg font-bold">📝</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Basic Details</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Essential fee information</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Fee Name *</label>
                  <input
                    type="text"
                    placeholder="Enter fee name"
                    value={formData.feeName}
                    onChange={(e) => setFormData({...formData, feeName: e.target.value})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Fee Type *</label>
                  <select
                    value={formData.feeType}
                    onChange={(e) => setFormData({...formData, feeType: e.target.value})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Fee Type</option>
                    {feeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Academic Year *</label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
                  >
                    {Array.from({length: 20}, (_, i) => {
                      const startYear = 2020 + i;
                      const endYear = startYear + 1;
                      const yearRange = `${startYear}-${endYear.toString().slice(-2)}`;
                      return <option key={yearRange} value={yearRange}>{yearRange}</option>
                    })}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Payment Frequency *</label>
                  <select
                    value={formData.paymentFrequency}
                    onChange={(e) => setFormData({...formData, paymentFrequency: e.target.value})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="One Time">One Time</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Class & Section */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-sm sm:text-lg font-bold">🏫</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Class & Section Assignment</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Select target class and sections</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Select Class *</label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({...formData, className: e.target.value, sectionName: ''})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
                    required
                  >
                    <option value="">Choose Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.className}>{cls.className}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Select Section *</label>
                  <select
                    value={formData.sectionName}
                    onChange={(e) => setFormData({...formData, sectionName: e.target.value})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
                    required
                    disabled={!formData.className}
                  >
                    <option value="">Choose Section</option>
                    <option value="All Sections" className="font-bold bg-blue-100">🌟 All Sections</option>
                    {getAvailableSections(formData.className).map(sectionName => (
                      <option key={sectionName} value={sectionName}>{sectionName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Fee Structure */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-sm sm:text-lg font-bold">💰</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Fee Structure</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Configure fee components</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <input
                  type="number"
                  placeholder="Tuition Fee"
                  value={formData.tuitionFee}
                  onChange={(e) => setFormData({...formData, tuitionFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Admission Fee"
                  value={formData.admissionFee}
                  onChange={(e) => setFormData({...formData, admissionFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Exam Fee"
                  value={formData.examFee}
                  onChange={(e) => setFormData({...formData, examFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Transport Fee"
                  value={formData.transportFee}
                  onChange={(e) => setFormData({...formData, transportFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Library Fee"
                  value={formData.libraryFee}
                  onChange={(e) => setFormData({...formData, libraryFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Lab Fee"
                  value={formData.labFee}
                  onChange={(e) => setFormData({...formData, labFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Sports Fee"
                  value={formData.sportsFee}
                  onChange={(e) => setFormData({...formData, sportsFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Development Fee"
                  value={formData.developmentFee}
                  onChange={(e) => setFormData({...formData, developmentFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
                <input
                  type="number"
                  placeholder="Miscellaneous Fee"
                  value={formData.miscellaneousFee}
                  onChange={(e) => setFormData({...formData, miscellaneousFee: e.target.value})}
                  className="border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                />
              </div>
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-base sm:text-lg font-bold text-blue-800">Total Amount: ₹{calculateTotalAmount()}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white text-sm sm:text-lg font-bold">📅</span>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Payment Details</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Configure payment terms</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Due Date *</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Late Fee Amount</label>
                  <input
                    type="number"
                    placeholder="Late fee amount"
                    value={formData.lateFeeAmount}
                    onChange={(e) => setFormData({...formData, lateFeeAmount: e.target.value})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Discount Amount</label>
                  <input
                    type="number"
                    placeholder="Discount amount"
                    value={formData.discountAmount}
                    onChange={(e) => setFormData({...formData, discountAmount: e.target.value})}
                    className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            <textarea
              placeholder="Description (Optional)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
              rows="3"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button type="submit" className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:bg-blue-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
                {editingFee ? '✏️ Update Fee' : '💾 Create Fee'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="bg-gray-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:bg-gray-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Fee List</h3>
        </div>
        {fees.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-4">💰</div>
            <p className="text-gray-500 text-base sm:text-lg">No fees added yet</p>
            <p className="text-gray-400 text-sm sm:text-base">Click "Create New Fee" to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Fee Name</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Fee Type</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Class</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Section</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Total Amount</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Due Date</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Frequency</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee, index) => (
                  <tr key={fee.id} className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm">{fee.feeName}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {fee.feeType}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{fee.className}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{fee.sectionName}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-blue-600 text-xs sm:text-sm">₹{fee.totalAmount || fee.amount}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{fee.dueDate}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {fee.paymentFrequency}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                        <button 
                          onClick={() => handleEdit(fee)}
                          className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(fee.id)}
                          className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs sm:text-sm"
                        >
                          Delete
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
    </div>
  );
}