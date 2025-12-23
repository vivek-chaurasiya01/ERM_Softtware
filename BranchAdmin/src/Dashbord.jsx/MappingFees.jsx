import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';

export default function MappingFees() {
  const { classes, sections } = useSchool();
  const [showForm, setShowForm] = useState(false);
  const [mappings, setMappings] = useState([]);
  const [createdFees, setCreatedFees] = useState([]);
  const [formData, setFormData] = useState({
    selectedClass: '',
    selectedSection: '',
    selectedFee: ''
  });

  // Get created fees from localStorage or state
  React.useEffect(() => {
    const savedFees = localStorage.getItem('manageFees');
    if (savedFees) {
      setCreatedFees(JSON.parse(savedFees));
    }
  }, []);

  const handleAddFees = () => {
    if (classes.length === 0) {
      alert('Please create classes first in Manage Class!');
      return;
    }
    if (sections.length === 0) {
      alert('Please create sections first in Manage Section!');
      return;
    }
    if (createdFees.length === 0) {
      alert('Please create fees first in Manage Fees!');
      return;
    }
    
    setShowForm(true);
    setFormData({
      selectedClass: '',
      selectedSection: '',
      selectedFee: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedClassObj = classes.find(c => c.id === parseInt(formData.selectedClass));
    const selectedSectionObj = sections.find(s => s.id === parseInt(formData.selectedSection));
    const selectedFeeObj = createdFees.find(f => f.id === parseInt(formData.selectedFee));

    const newMapping = {
      id: Date.now(),
      class: selectedClassObj?.className,
      section: selectedSectionObj?.sectionName,
      fee: selectedFeeObj?.feeName,
      amount: selectedFeeObj?.totalAmount,
      feeType: selectedFeeObj?.feeType,
      frequency: selectedFeeObj?.frequency,
      createdDate: new Date().toLocaleDateString()
    };

    setMappings([...mappings, newMapping]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this mapping?')) {
      setMappings(mappings.filter(m => m.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🗺️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Mapping Fees
              </h1>
              <p className="text-gray-600 mt-1">Map created fees to classes and sections</p>
            </div>
          </div>
          <button 
            onClick={handleAddFees}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center gap-2"
          >
            <span className="text-lg">➕</span>
            Add Fees
          </button>
        </div>
      </div>

      {/* Requirements Notice */}
      {(classes.length === 0 || sections.length === 0 || createdFees.length === 0) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-yellow-800">Requirements Missing</h3>
              <div className="text-yellow-700 mt-1 space-y-1">
                {classes.length === 0 && <p>• Create classes first in <a href="/dashbord/manage-class" className="font-semibold underline">Manage Class</a></p>}
                {sections.length === 0 && <p>• Create sections first in <a href="/dashbord/manage-section" className="font-semibold underline">Manage Section</a></p>}
                {createdFees.length === 0 && <p>• Create fees first in <a href="/dashbord/manage-fees" className="font-semibold underline">Manage Fees</a></p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Fees Form */}
      {showForm && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl mb-8 border border-white/50 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="text-xl font-bold text-white">Add Fee Mapping</h3>
                <p className="text-orange-100 text-sm mt-1">Map fees to specific class and section</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Select Class */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <span className="text-lg">🎓</span>
                  Select Class *
                </label>
                <select
                  value={formData.selectedClass}
                  onChange={(e) => setFormData({...formData, selectedClass: e.target.value})}
                  className="w-full border-2 border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white shadow-sm hover:shadow-md text-lg"
                  required
                >
                  <option value="">Choose Class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.className}</option>
                  ))}
                </select>
              </div>

              {/* Select Section */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <span className="text-lg">📑</span>
                  Select Section *
                </label>
                <select
                  value={formData.selectedSection}
                  onChange={(e) => setFormData({...formData, selectedSection: e.target.value})}
                  className="w-full border-2 border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white shadow-sm hover:shadow-md text-lg"
                  required
                >
                  <option value="">Choose Section</option>
                  {sections.map(section => (
                    <option key={section.id} value={section.id}>Section {section.sectionName}</option>
                  ))}
                </select>
              </div>

              {/* Select Fee */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  Select Fee *
                </label>
                <select
                  value={formData.selectedFee}
                  onChange={(e) => setFormData({...formData, selectedFee: e.target.value})}
                  className="w-full border-2 border-gray-300 p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white shadow-sm hover:shadow-md text-lg"
                  required
                >
                  <option value="">Choose Fee</option>
                  {createdFees.map(fee => (
                    <option key={fee.id} value={fee.id}>
                      {fee.feeName} - ₹{fee.totalAmount} ({fee.frequency})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-2xl hover:from-orange-600 hover:to-orange-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                🎯 Map Fee
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-10 py-4 rounded-2xl hover:from-gray-600 hover:to-gray-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mappings List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Fee Mappings ({mappings.length})</h3>
          <p className="text-gray-600 text-sm mt-1">Manage class-section-fee mappings</p>
        </div>
        
        {mappings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-gray-500 text-lg font-medium">No fee mappings created yet</p>
            <p className="text-gray-400 mt-2">Click "Add Fees" to create your first mapping</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">Class</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">Section</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">Fee Name</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">Fee Type</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">Amount</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">Frequency</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mappings.map((mapping, index) => (
                  <tr key={mapping.id} className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-blue-600 font-bold">🎓</span>
                        </div>
                        <div className="font-bold text-gray-900">{mapping.class}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Section {mapping.section}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{mapping.fee}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        mapping.feeType === 'Recurring Fees' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {mapping.feeType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-orange-600">
                        ₹{parseInt(mapping.amount || 0).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {mapping.frequency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDelete(mapping.id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold flex items-center gap-1 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        🗑️ Delete
                      </button>
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