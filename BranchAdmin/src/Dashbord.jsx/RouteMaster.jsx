import React, { useState, useEffect } from 'react';
import { showSuccess, showError, showConfirm, showToast } from '../utils/sweetAlert';

export default function RouteMaster() {
  const [routes, setRoutes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [formData, setFormData] = useState({
    routeName: '',
    routeCode: '',
    startPoint: '',
    endPoint: '',
    totalDistance: '',
    status: 'Active'
  });

  useEffect(() => {
    const savedRoutes = localStorage.getItem('routes');
    if (savedRoutes) {
      setRoutes(JSON.parse(savedRoutes));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routeData = {
      ...formData,
      id: editingRoute?.id || Date.now(),
      createdDate: editingRoute ? editingRoute.createdDate : new Date().toLocaleDateString()
    };
    
    let updatedRoutes;
    if (editingRoute) {
      updatedRoutes = routes.map(r => r.id === editingRoute.id ? routeData : r);
      await showSuccess('Updated!', 'Route information updated successfully');
    } else {
      updatedRoutes = [...routes, routeData];
      await showSuccess('Created!', 'New route added successfully');
    }
    
    setRoutes(updatedRoutes);
    localStorage.setItem('routes', JSON.stringify(updatedRoutes));
    setShowForm(false);
    setEditingRoute(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      routeName: '',
      routeCode: '',
      startPoint: '',
      endPoint: '',
      totalDistance: '',
      status: 'Active'
    });
  };

  const handleEdit = (route) => {
    setEditingRoute(route);
    setFormData(route);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('Delete Route?', 'This will permanently delete the route record');
    if (result.isConfirmed) {
      const updatedRoutes = routes.filter(r => r.id !== id);
      setRoutes(updatedRoutes);
      localStorage.setItem('routes', JSON.stringify(updatedRoutes));
      showToast('success', 'Route deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/60">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-2xl">🗺️</span>
            </div>
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Route Master</h2>
              <p className="text-gray-600 text-lg mt-1">Manage transport routes efficiently</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-8 py-4 rounded-2xl hover:bg-blue-600 font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            ➕ Add Route
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/60">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{editingRoute ? 'Update Route' : 'Add New Route'}</h3>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Route Name *</label>
              <input
                type="text"
                value={formData.routeName}
                onChange={(e) => setFormData({...formData, routeName: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Route Code</label>
              <input
                type="text"
                value={formData.routeCode}
                onChange={(e) => setFormData({...formData, routeCode: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., RT001"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Start Point</label>
              <input
                type="text"
                value={formData.startPoint}
                onChange={(e) => setFormData({...formData, startPoint: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">End Point</label>
              <input
                type="text"
                value={formData.endPoint}
                onChange={(e) => setFormData({...formData, endPoint: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Distance (KM)</label>
              <input
                type="number"
                value={formData.totalDistance}
                onChange={(e) => setFormData({...formData, totalDistance: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
                min="0"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="md:col-span-2 flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 font-bold"
              >
                {editingRoute ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 font-bold"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Route List */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
        <div className="px-8 py-6" style={{backgroundColor: 'rgb(26,37,57)'}}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">📋</span>
            </div>
            <h3 className="text-xl font-bold text-white">Route List ({routes.length})</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Route Name</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Route Code</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Start Point</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">End Point</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Distance</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Status</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr key={route.id} className={`border-b hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <td className="px-4 py-3 font-bold">{route.routeName}</td>
                  <td className="px-4 py-3">{route.routeCode}</td>
                  <td className="px-4 py-3">{route.startPoint}</td>
                  <td className="px-4 py-3">{route.endPoint}</td>
                  <td className="px-4 py-3">{route.totalDistance} KM</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      route.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(route)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 mr-2 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(route.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}