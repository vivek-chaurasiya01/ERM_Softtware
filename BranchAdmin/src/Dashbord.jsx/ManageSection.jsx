import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';

export default function ManageSection() {
  const { sections, addSection, updateSection, deleteSection } = useSchool();
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    sectionName: '',
    capacity: '',
    description: ''
  });

  const handleAddSection = () => {
    setShowForm(true);
    setEditingSection(null);
    setFormData({
      sectionName: '',
      capacity: '',
      description: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSection) {
      updateSection(editingSection.id, formData);
    } else {
      addSection(formData);
    }
    setShowForm(false);
    setEditingSection(null);
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData(section);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deleteSection(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl sm:text-2xl font-bold">📑</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Manage Sections</h1>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Create sections for your classes</p>
            </div>
          </div>
          <button 
            onClick={handleAddSection}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="text-base sm:text-lg">➕</span>
            Add New Section
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg mb-6 sm:mb-8 border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">📝</span>
              {editingSection ? 'Edit Section' : 'Add New Section'}
            </h3>
            <p className="text-blue-100 mt-1 sm:mt-2 text-xs sm:text-sm">Configure section details</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Section Name *</label>
                <input
                  type="text"
                  placeholder="Enter section name (e.g., A, B, C)"
                  value={formData.sectionName}
                  onChange={(e) => setFormData({...formData, sectionName: e.target.value})}
                  className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Capacity *</label>
                <input
                  type="number"
                  placeholder="Maximum students"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full border-2 border-gray-300 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
                  required
                />
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
                {editingSection ? '✏️ Update Section' : '💾 Add Section'}
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
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Section List</h3>
        </div>
        {sections.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-4">📑</div>
            <p className="text-gray-500 text-base sm:text-lg">No sections added yet</p>
            <p className="text-gray-400 text-sm sm:text-base">Click "Add New Section" to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Section Name</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Capacity</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section, index) => (
                  <tr key={section.id} className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-bold">
                        Section {section.sectionName}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold">{section.capacity}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="overflow-x-auto">
                        <div className="flex gap-2 min-w-max pb-2 sm:pb-0">
                          <button 
                            onClick={() => handleEdit(section)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-xl text-xs sm:text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center gap-1 justify-center shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(section.id)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-xl text-xs sm:text-sm hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold flex items-center gap-1 justify-center shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                          >
                            🗑️ Delete
                          </button>
                        </div>
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