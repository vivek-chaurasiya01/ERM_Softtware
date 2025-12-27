import React, { useState, useEffect } from 'react';
import { showSuccess, showError, showConfirm, showToast, showWarning } from '../utils/sweetAlert';

export default function RouteStops() {
  const [routeStops, setRouteStops] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStop, setEditingStop] = useState(null);
  const [formData, setFormData] = useState({
    routeName: '',
    stopName: '',
    stopOrder: '',
    pickupTime: '',
    dropTime: '',
    status: 'Active'
  });

  useEffect(() => {
    const savedRouteStops = localStorage.getItem('routeStops');
    const savedRoutes = localStorage.getItem('routes');
    if (savedRouteStops) setRouteStops(JSON.parse(savedRouteStops));
    if (savedRoutes) setRoutes(JSON.parse(savedRoutes));
  }, []);

  const handleAddStop = async () => {
    if (routes.length === 0) {
      await showWarning('Routes Required!', 'Please create routes first in Route Master!');
      return;
    }
    setShowForm(true);
    setEditingStop(null);
    setFormData({
      routeName: '',
      stopName: '',
      stopOrder: '',
      pickupTime: '',
      dropTime: '',
      status: 'Active'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stopData = {
      ...formData,
      id: editingStop?.id || Date.now(),
      createdDate: editingStop ? editingStop.createdDate : new Date().toLocaleDateString()
    };
    
    let updatedStops;
    if (editingStop) {
      updatedStops = routeStops.map(s => s.id === editingStop.id ? stopData : s);
      await showSuccess('Updated!', 'Route stop updated successfully');
    } else {
      updatedStops = [...routeStops, stopData];
      await showSuccess('Created!', 'New route stop added successfully');
    }
    
    setRouteStops(updatedStops);
    localStorage.setItem('routeStops', JSON.stringify(updatedStops));
    setShowForm(false);
    setEditingStop(null);
  };

  const handleEdit = (stop) => {
    setEditingStop(stop);
    setFormData(stop);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('Delete Route Stop?', 'This will permanently delete the route stop');
    if (result.isConfirmed) {
      const updatedStops = routeStops.filter(s => s.id !== id);
      setRouteStops(updatedStops);
      localStorage.setItem('routeStops', JSON.stringify(updatedStops));
      showToast('success', 'Route stop deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/60">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-2xl">🚏</span>
            </div>
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Route Stop Master</h2>
              <p className="text-gray-600 text-lg mt-1">Manage route stops and timings</p>
            </div>
          </div>
          <button
            onClick={handleAddStop}
            className="bg-blue-500 text-white px-8 py-4 rounded-2xl hover:bg-blue-600 font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            ➕ Add Route Stop
          </button>
        </div>
      </div>

      {/* Routes Required Notice */}
      {routes.length === 0 && (
        <div className="bg-gradient-to-r from-yellow-100 to-blue-100 border-l-4 border-yellow-400 p-8 mb-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-800">Routes Required</h3>
              <p className="text-yellow-700 mt-2 text-lg">
                Please create routes first in Route Master before adding stops.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/60">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{editingStop ? 'Update Route Stop' : 'Add New Route Stop'}</h3>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Route Name *</label>
              <select
                value={formData.routeName}
                onChange={(e) => setFormData({...formData, routeName: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select Route</option>
                {routes.filter(r => r.status === 'Active').map(route => (
                  <option key={route.id} value={route.routeName}>{route.routeName}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stop Name *</label>
              <input
                type="text"
                value={formData.stopName}
                onChange={(e) => setFormData({...formData, stopName: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stop Order *</label>
              <input
                type="number"
                value={formData.stopOrder}
                onChange={(e) => setFormData({...formData, stopOrder: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Pickup Time</label>
              <input
                type="time"
                value={formData.pickupTime}
                onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Drop Time</label>
              <input
                type="time"
                value={formData.dropTime}
                onChange={(e) => setFormData({...formData, dropTime: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full border-2 border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="md:col-span-2 flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 font-bold"
              >
                {editingStop ? 'Update' : 'Save'}
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

      {/* Route Stops List */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
        <div className="px-8 py-6" style={{backgroundColor: 'rgb(26,37,57)'}}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">📋</span>
            </div>
            <h3 className="text-xl font-bold text-white">Route Stops List ({routeStops.length})</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Route Name</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Stop Name</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Order</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Pickup Time</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Drop Time</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Status</th>
                <th className="px-4 py-3 text-left font-bold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routeStops.map((stop, index) => (
                <tr key={stop.id} className={`border-b hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <td className="px-4 py-3 font-bold">{stop.routeName}</td>
                  <td className="px-4 py-3">{stop.stopName}</td>
                  <td className="px-4 py-3">{stop.stopOrder}</td>
                  <td className="px-4 py-3">{stop.pickupTime}</td>
                  <td className="px-4 py-3">{stop.dropTime}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stop.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stop.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(stop)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 mr-2 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(stop.id)}
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