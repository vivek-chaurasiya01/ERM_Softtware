import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';

export default function FeesManagement() {
  const { classes, sections } = useSchool();
  
  const getAvailableSections = (className) => {
    const selectedClass = classes.find(c => c.className === className);
    return selectedClass?.assignedSections || [];
  };
  const [showCreateFee, setShowCreateFee] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [editingFee, setEditingFee] = useState(null);
  const [createdFees, setCreatedFees] = useState([]);
  const [feeData, setFeeData] = useState({
    // Basic Details
    academicYear: '2025-26',
    class: '',
    section: '',
    feeTitle: '',
    

    
    // Fee Structure
    tuitionFees: '',
    admissionFees: '',
    examFees: '',
    transportFees: '',
    libraryFees: '',
    labFees: '',
    sportsFees: '',
    miscellaneousFees: '',
    
    // Payment Details
    paymentFrequency: 'Monthly',
    dueDate: '',
    lateFeeType: 'Fixed Amount',
    lateFeeAmount: '',
    installmentAllowed: 'No',
    
    // Discount
    discountType: 'Percentage',
    discountReason: '',
    discountAmount: '',
    
    // Payment Mode
    paymentModes: [],
    
    // Additional Settings
    receiptPrefix: 'SCH/2025/',
    applicableFrom: '',
    applicableTill: '',
    status: 'Active'
  });

  const handleCreateFee = () => {
    setShowCreateFee(true);
    setEditingFee(null);
  };

  const handleEditFee = (fee) => {
    setFeeData(fee);
    setEditingFee(fee);
    setShowCreateFee(true);
  };

  const handleDeleteFee = (id) => {
    if (window.confirm('Are you sure you want to delete this fee structure?')) {
      setCreatedFees(createdFees.filter(fee => fee.id !== id));
      alert('Fee structure deleted successfully!');
    }
  };

  const handleViewDetails = (fee) => {
    setSelectedFee(fee);
    setShowDetails(true);
  };

  const handleInputChange = (field, value) => {
    setFeeData({ ...feeData, [field]: value });
  };

  const handlePaymentModeChange = (mode) => {
    const modes = feeData.paymentModes.includes(mode)
      ? feeData.paymentModes.filter(m => m !== mode)
      : [...feeData.paymentModes, mode];
    setFeeData({ ...feeData, paymentModes: modes });
  };

  const calculateTotalFees = () => {
    const fees = [
      feeData.tuitionFees, feeData.admissionFees, feeData.examFees,
      feeData.transportFees, feeData.libraryFees, feeData.labFees,
      feeData.sportsFees, feeData.miscellaneousFees
    ];
    return fees.reduce((sum, fee) => sum + (parseInt(fee) || 0), 0);
  };

  const calculateFinalAmount = () => {
    const total = calculateTotalFees();
    const discount = parseInt(feeData.discountAmount) || 0;
    if (feeData.discountType === 'Percentage') {
      return total - (total * discount / 100);
    }
    return total - discount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feeStructure = {
      ...feeData,
      id: editingFee ? editingFee.id : Date.now(),
      totalFees: calculateTotalFees(),
      finalAmount: calculateFinalAmount(),
      createdDate: editingFee ? editingFee.createdDate : new Date().toLocaleDateString()
    };
    
    if (editingFee) {
      setCreatedFees(createdFees.map(fee => fee.id === editingFee.id ? feeStructure : fee));
      alert('Fee structure updated successfully!');
    } else {
      setCreatedFees([...createdFees, feeStructure]);
      alert('Fee structure created successfully!');
    }
    
    setShowCreateFee(false);
    setEditingFee(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Fees Management</h2>
        <button 
          onClick={handleCreateFee}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Create Fees
        </button>
      </div>

      {showCreateFee && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border">
          <h3 className="text-xl font-semibold mb-6">{editingFee ? 'Edit Fee Structure' : 'Create Fee Structure'}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Basic Details */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-blue-800">1. Basic Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Academic Year *</label>
                  <select
                    value={feeData.academicYear}
                    onChange={(e) => handleInputChange('academicYear', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {Array.from({length: 20}, (_, i) => {
                      const startYear = 2020 + i;
                      const endYear = startYear + 1;
                      const yearRange = `${startYear}-${endYear.toString().slice(-2)}`;
                      return <option key={yearRange} value={yearRange}>{yearRange}</option>
                    })}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Class *</label>
                  <select
                    value={feeData.class}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.className}>{cls.className}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Section *</label>
                  <select
                    value={feeData.section}
                    onChange={(e) => handleInputChange('section', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={!feeData.class}
                  >
                    <option value="">Select Section</option>
                    <option value="All Sections" className="font-bold bg-blue-100">🌟 All Sections</option>
                    {getAvailableSections(feeData.class).map(sectionName => (
                      <option key={sectionName} value={sectionName}>{sectionName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Fee Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Monthly Fees, Admission Fees"
                    value={feeData.feeTitle}
                    onChange={(e) => handleInputChange('feeTitle', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>





            {/* 3. Fee Structure */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-purple-800">3. Fee Structure</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Tuition Fees</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={feeData.tuitionFees}
                    onChange={(e) => handleInputChange('tuitionFees', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Admission Fees</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={feeData.admissionFees}
                    onChange={(e) => handleInputChange('admissionFees', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Exam Fees</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={feeData.examFees}
                    onChange={(e) => handleInputChange('examFees', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Transport Fees</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={feeData.transportFees}
                    onChange={(e) => handleInputChange('transportFees', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Library Fees</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={feeData.libraryFees}
                    onChange={(e) => handleInputChange('libraryFees', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Lab Fees</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={feeData.labFees}
                    onChange={(e) => handleInputChange('labFees', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Sports/Activity Fees</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={feeData.sportsFees}
                    onChange={(e) => handleInputChange('sportsFees', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Miscellaneous Fees</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={feeData.miscellaneousFees}
                    onChange={(e) => handleInputChange('miscellaneousFees', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="mt-4 bg-purple-100 p-3 rounded">
                <p className="text-lg font-semibold text-purple-800">Total Fees: ₹{calculateTotalFees()}</p>
              </div>
            </div>

            {/* 4. Payment Details */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-yellow-800">4. Payment Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Payment Frequency *</label>
                  <select
                    value={feeData.paymentFrequency}
                    onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Due Date *</label>
                  <input
                    type="date"
                    value={feeData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Late Fee Type *</label>
                  <select
                    value={feeData.lateFeeType}
                    onChange={(e) => handleInputChange('lateFeeType', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="Fixed Amount">Fixed Amount (₹)</option>
                    <option value="Per Day">Per Day (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Late Fee Amount *</label>
                  <input
                    type="number"
                    placeholder="Enter late fee amount"
                    value={feeData.lateFeeAmount}
                    onChange={(e) => handleInputChange('lateFeeAmount', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Installment Allowed? *</label>
                  <select
                    value={feeData.installmentAllowed}
                    onChange={(e) => handleInputChange('installmentAllowed', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Discount */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-orange-800">5. Discount/Concession (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Discount Type</label>
                  <select
                    value={feeData.discountType}
                    onChange={(e) => handleInputChange('discountType', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed Amount">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Discount Reason</label>
                  <select
                    value={feeData.discountReason}
                    onChange={(e) => handleInputChange('discountReason', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Reason</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Staff Child">Staff Child</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Discount Amount</label>
                  <input
                    type="number"
                    placeholder="Enter discount amount"
                    value={feeData.discountAmount}
                    onChange={(e) => handleInputChange('discountAmount', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="mt-4 bg-orange-100 p-3 rounded">
                <p className="text-lg font-semibold text-orange-800">Final Payable Amount: ₹{calculateFinalAmount()}</p>
              </div>
            </div>

            {/* 6. Payment Mode */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-indigo-800">6. Mode of Payment (Multiple Select)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Cash', 'Online (UPI/Card)', 'Bank Transfer', 'Cheque'].map(mode => (
                  <label key={mode} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={feeData.paymentModes.includes(mode)}
                      onChange={() => handlePaymentModeChange(mode)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 7. Additional Settings */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">7. Additional Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Receipt Prefix</label>
                  <input
                    type="text"
                    placeholder="e.g., SCH/2025/"
                    value={feeData.receiptPrefix}
                    onChange={(e) => handleInputChange('receiptPrefix', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={feeData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Applicable From</label>
                  <input
                    type="date"
                    value={feeData.applicableFrom}
                    onChange={(e) => handleInputChange('applicableFrom', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Applicable Till</label>
                  <input
                    type="date"
                    value={feeData.applicableTill}
                    onChange={(e) => handleInputChange('applicableTill', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* 8. Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium">
                ✅ {editingFee ? 'Update Fee Structure' : 'Save Fee Structure'}
              </button>
              <button type="button" onClick={() => alert('Preview functionality')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
                👁 Preview Fee Slip
              </button>
              <button type="button" onClick={() => setShowCreateFee(false)} className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-medium">
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showDetails && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Fee Structure Details</h3>
            <button 
              onClick={() => setShowDetails(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ✕ Close
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-blue-800">📋 Basic Information</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Fee Title:</span> {selectedFee?.feeTitle}</p>
                <p><span className="font-medium">Academic Year:</span> {selectedFee?.academicYear}</p>
                <p><span className="font-medium">Class:</span> {selectedFee?.class} - {selectedFee?.section}</p>
                <p><span className="font-medium">Student Type:</span> {selectedFee?.studentType}</p>
                <p><span className="font-medium">Category:</span> {selectedFee?.studentCategory}</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-green-800">💰 Fee Breakdown</h4>
              <div className="space-y-2 text-sm">
                {selectedFee?.tuitionFees && <p>Tuition: ₹{selectedFee.tuitionFees}</p>}
                {selectedFee?.admissionFees && <p>Admission: ₹{selectedFee.admissionFees}</p>}
                {selectedFee?.examFees && <p>Exam: ₹{selectedFee.examFees}</p>}
                {selectedFee?.transportFees && <p>Transport: ₹{selectedFee.transportFees}</p>}
                {selectedFee?.libraryFees && <p>Library: ₹{selectedFee.libraryFees}</p>}
                {selectedFee?.labFees && <p>Lab: ₹{selectedFee.labFees}</p>}
                {selectedFee?.sportsFees && <p>Sports: ₹{selectedFee.sportsFees}</p>}
                {selectedFee?.miscellaneousFees && <p>Miscellaneous: ₹{selectedFee.miscellaneousFees}</p>}
                <div className="border-t pt-2 mt-2">
                  <p className="font-semibold">Total: ₹{selectedFee?.totalFees}</p>
                  <p className="font-semibold text-green-600">Final Amount: ₹{selectedFee?.finalAmount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-yellow-800">💳 Payment Details</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Frequency:</span> {selectedFee?.paymentFrequency}</p>
                <p><span className="font-medium">Due Date:</span> {selectedFee?.dueDate}</p>
                <p><span className="font-medium">Late Fee:</span> {selectedFee?.lateFeeType} - ₹{selectedFee?.lateFeeAmount}</p>
                <p><span className="font-medium">Installment:</span> {selectedFee?.installmentAllowed}</p>
                <p><span className="font-medium">Payment Modes:</span> {selectedFee?.paymentModes?.join(', ')}</p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-purple-800">🎯 Additional Info</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Receipt Prefix:</span> {selectedFee?.receiptPrefix}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    selectedFee?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedFee?.status}
                  </span>
                </p>
                <p><span className="font-medium">Created:</span> {selectedFee?.createdDate}</p>
                {selectedFee?.discountAmount && (
                  <p><span className="font-medium">Discount:</span> {selectedFee.discountType} - {selectedFee.discountAmount} ({selectedFee.discountReason})</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Created Fees List */}
      {createdFees.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Created Fee Structures ({createdFees.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fee Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Academic Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Final Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {createdFees.map((fee, index) => (
                  <tr key={fee.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{fee.feeTitle}</td>
                    <td className="px-6 py-4 text-gray-700">{fee.class} - {fee.section}</td>
                    <td className="px-6 py-4 text-gray-700">{fee.academicYear}</td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">₹{fee.totalFees}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">₹{fee.finalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        fee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewDetails(fee)}
                          className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors shadow-sm"
                        >
                          👁️ Details
                        </button>
                        <button 
                          onClick={() => handleEditFee(fee)}
                          className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors shadow-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteFee(fee.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors shadow-sm"
                        >
                          🗑️ Delete
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
    </div>
  );
}