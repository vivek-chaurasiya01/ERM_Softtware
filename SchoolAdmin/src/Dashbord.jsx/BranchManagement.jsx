import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BranchManagement() {
  const navigate = useNavigate();
  
  // Initial default branches
  const defaultBranches = [
    { 
      id: 1, 
      name: 'Main Campus', 
      location: 'Downtown City', 
      address: '123 Education Street, Downtown City, State 12345',
      students: 450, 
      teachers: 25, 
      classes: 18,
      capacity: 500,
      status: 'Active',
      principal: 'Dr. Sarah Johnson',
      phone: '+1234567890',
      email: 'main@school.edu',
      adminEmail: 'admin.main@school.edu',
      adminPassword: 'main123',
      established: '2010',
      rating: 4.8,
      fees: 125000
    },
    { 
      id: 2, 
      name: 'North Branch', 
      location: 'North District', 
      address: '456 Learning Avenue, North District, State 12346',
      students: 320, 
      teachers: 18, 
      classes: 14,
      capacity: 400,
      status: 'Active',
      principal: 'Prof. Michael Brown',
      phone: '+1234567891',
      email: 'north@school.edu',
      adminEmail: 'admin.north@school.edu',
      adminPassword: 'north123',
      established: '2015',
      rating: 4.6,
      fees: 98000
    },
    { 
      id: 3, 
      name: 'South Branch', 
      location: 'South District', 
      address: '789 Knowledge Road, South District, State 12347',
      students: 280, 
      teachers: 15, 
      classes: 12,
      capacity: 350,
      status: 'Inactive',
      principal: 'Ms. Emily Davis',
      phone: '+1234567892',
      email: 'south@school.edu',
      adminEmail: 'admin.south@school.edu',
      adminPassword: 'south123',
      established: '2018',
      rating: 4.4,
      fees: 87000
    },
    { 
      id: 4, 
      name: 'East Campus', 
      location: 'East Side', 
      address: '321 Wisdom Boulevard, East Side, State 12348',
      students: 380, 
      teachers: 22, 
      classes: 16,
      capacity: 450,
      status: 'Active',
      principal: 'Dr. Robert Wilson',
      phone: '+1234567893',
      email: 'east@school.edu',
      adminEmail: 'admin.east@school.edu',
      adminPassword: 'east123',
      established: '2012',
      rating: 4.7,
      fees: 115000
    }
  ];

  const [branches, setBranches] = useState(defaultBranches);

  // Load branches from localStorage on component mount
  useEffect(() => {
    const savedBranches = localStorage.getItem('branches');
    if (savedBranches) {
      const parsedBranches = JSON.parse(savedBranches);
      // Merge default branches with saved ones, avoiding duplicates
      const mergedBranches = [...defaultBranches];
      parsedBranches.forEach(savedBranch => {
        if (!mergedBranches.find(branch => branch.id === savedBranch.id)) {
          mergedBranches.push(savedBranch);
        }
      });
      setBranches(mergedBranches);
    }
  }, []);

  // Save branches to localStorage whenever branches change
  useEffect(() => {
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [branches]);

  const handleBranchClick = (branch) => {
    navigate(`/dashbord/branch/${branch.id}`, { state: { branch } });
  };

  const toggleBranchStatus = (branchId) => {
    const updatedBranches = branches.map(branch => 
      branch.id === branchId 
        ? { ...branch, status: branch.status === 'Active' ? 'Inactive' : 'Active' }
        : branch
    );
    setBranches(updatedBranches);
    localStorage.setItem('branches', JSON.stringify(updatedBranches));
  };

  const handleAddBranch = () => {
    navigate('/dashbord/add-branch');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Branch Management</h1>
          <p className="text-gray-600 mt-1">Manage all school branches from here</p>
        </div>
        <button 
          onClick={handleAddBranch}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg"
        >
          Add New Branch
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Branches</p>
              <p className="text-2xl font-bold text-gray-800">{branches.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-800">{branches.reduce((sum, branch) => sum + branch.students, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Teachers</p>
              <p className="text-2xl font-bold text-gray-800">{branches.reduce((sum, branch) => sum + branch.teachers, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Branches</p>
              <p className="text-2xl font-bold text-gray-800">{branches.filter(b => b.status === 'Active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Inactive Branches</p>
              <p className="text-2xl font-bold text-gray-800">{branches.filter(b => b.status === 'Inactive').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div 
            key={branch.id} 
            onClick={() => handleBranchClick(branch)}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{branch.name.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-semibold text-gray-800">{branch.name}</h3>
                  <p className="text-gray-600 text-sm">{branch.location}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                branch.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {branch.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Principal:</span>
                <span className="font-medium text-gray-800 text-sm">{branch.principal}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Students:</span>
                <span className="font-bold text-blue-600">{branch.students}/{branch.capacity}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Teachers:</span>
                <span className="font-bold text-purple-600">{branch.teachers}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Classes:</span>
                <span className="font-medium text-gray-800 text-sm">{branch.classes}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Rating:</span>
                <div className="flex items-center">
                  <span className="font-medium text-yellow-600 text-sm">{branch.rating}</span>
                  <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Monthly Fees:</span>
                <span className="font-medium text-green-600 text-sm">₹{branch.fees.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Admin Email:</span>
                <span className="font-medium text-gray-800 text-xs">{branch.adminEmail}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-2 mb-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBranchClick(branch);
                  }}
                  className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Manage Branch
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBranchStatus(branch.id);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    branch.status === 'Active'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {branch.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
              <div className="text-xs text-gray-500">
                <div>📧 {branch.email}</div>
                <div>📞 {branch.phone}</div>
                <div>📍 {branch.address}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BranchManagement;