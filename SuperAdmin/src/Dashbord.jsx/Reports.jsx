import React, { useState, useEffect, useRef } from "react";
import {
  FaChartBar,
  FaUsers,
  FaSchool,
  FaGem,
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaEye,
  FaArrowUp,
  FaMoneyBillWave,
  FaGraduationCap,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState("overview");

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [1200000, 1900000, 1500000, 2200000, 2800000, 2400000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const schoolGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Schools',
        data: [12, 19, 15, 22, 28, 24],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const planDistributionData = {
    labels: ['Premium Plan', 'Professional Plan', 'Basic Plan', 'Enterprise Plan'],
    datasets: [
      {
        data: [45, 38, 52, 21],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Sample data
  const stats = {
    totalSchools: 156,
    totalStudents: 45280,
    activePlans: 12,
    monthlyRevenue: 2850000,
    growthRate: 15.8,
  };

  const recentActivity = [
    { id: 1, school: "ABC Public School", action: "Plan Upgraded", time: "2 hours ago", type: "upgrade" },
    { id: 2, school: "XYZ International", action: "New Registration", time: "4 hours ago", type: "new" },
    { id: 3, school: "Modern High School", action: "Payment Received", time: "6 hours ago", type: "payment" },
    { id: 4, school: "Elite Academy", action: "Plan Renewed", time: "1 day ago", type: "renewal" },
  ];

  const topPlans = [
    { name: "Premium Plan", schools: 45, revenue: "₹890,000", growth: "+12%" },
    { name: "Professional Plan", schools: 38, revenue: "₹760,000", growth: "+8%" },
    { name: "Basic Plan", schools: 52, revenue: "₹520,000", growth: "+15%" },
    { name: "Enterprise Plan", schools: 21, revenue: "₹680,000", growth: "+5%" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <FaChartBar className="text-blue-600" />
            Reports & Analytics
          </h1>
          <p className="text-slate-600 mt-1">
            Comprehensive insights and performance metrics
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500"
          >
            <option value="weekly">Last 7 Days</option>
            <option value="monthly">Last 30 Days</option>
            <option value="quarterly">Last 3 Months</option>
            <option value="yearly">Last Year</option>
          </select>
          
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow hover:shadow-lg transition">
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Schools</p>
              <p className="text-2xl font-bold">{stats.totalSchools}</p>
            </div>
            <FaSchool className="text-3xl text-blue-200" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowUp className="text-green-300" />
            <span className="text-sm text-blue-100">+12% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Students</p>
              <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
            </div>
            <FaUsers className="text-3xl text-green-200" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowUp className="text-green-300" />
            <span className="text-sm text-green-100">+8% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Active Plans</p>
              <p className="text-2xl font-bold">{stats.activePlans}</p>
            </div>
            <FaGem className="text-3xl text-purple-200" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowUp className="text-green-300" />
            <span className="text-sm text-purple-100">+3 new plans</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold">₹{(stats.monthlyRevenue / 100000).toFixed(1)}L</p>
            </div>
            <FaMoneyBillWave className="text-3xl text-orange-200" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowUp className="text-green-300" />
            <span className="text-sm text-orange-100">+{stats.growthRate}% growth</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm">Growth Rate</p>
              <p className="text-2xl font-bold">{stats.growthRate}%</p>
            </div>
            <FaChartLine className="text-3xl text-teal-200" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <FaArrowUp className="text-green-300" />
            <span className="text-sm text-teal-100">Excellent performance</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaChartLine className="text-blue-500" />
              Revenue Analytics
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">Monthly</button>
              <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm">Yearly</button>
            </div>
          </div>
          
          {/* Real Chart */}
          <div className="h-64">
            <Line data={revenueData} options={chartOptions} />
          </div>

          {/* Chart Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Projections</span>
            </div>
          </div>
        </div>

        {/* School Growth Chart */}
        <div className="bg-white rounded-2xl shadow-lg border p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FaChartBar className="text-green-500" />
            School Growth
          </h3>
          
          <div className="h-64">
            <Bar data={schoolGrowthData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Plan Distribution Chart */}
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FaChartPie className="text-purple-500" />
            Plan Distribution
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <Doughnut data={planDistributionData} options={doughnutOptions} />
          </div>
          
          <div className="space-y-4">
            {topPlans.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-purple-500' :
                    index === 2 ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">{plan.schools} schools</div>
                  <div className="text-sm text-green-600">{plan.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Plans Performance */}
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FaChartPie className="text-purple-500" />
            Top Performing Plans
          </h3>
          <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium">
            View Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topPlans.map((plan, index) => (
            <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-slate-800">{plan.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  plan.growth.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {plan.growth}
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Schools:</span>
                  <span className="font-medium">{plan.schools}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Revenue:</span>
                  <span className="font-medium text-green-600">{plan.revenue}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(plan.schools / 60) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center">
            <FaDownload className="text-2xl text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-800">Export Data</p>
          </button>
          
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-center">
            <FaFilter className="text-2xl text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-800">Filter Reports</p>
          </button>
          
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center">
            <FaEye className="text-2xl text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-800">View Details</p>
          </button>
          
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center">
            <FaCalendarAlt className="text-2xl text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-800">Schedule Report</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;