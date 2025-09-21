import React, { useState } from 'react';
import {
    FiFileText,
    FiDownload,
    FiMail,
    FiFilter,
    FiBarChart2,
    FiPieChart,
    FiTrendingUp,
    FiUsers,
    FiBookOpen,
    FiAward,
    FiGlobe
} from 'react-icons/fi';
import {
    HiOutlineDocumentReport,
    HiOutlineChartBar,
    HiOutlineAcademicCap
} from 'react-icons/hi';
import NavbarAdmin from './components/NavbarAdmin';

function AdminGenerateReports() {
    const [reportType, setReportType] = useState('NAAC');
    const [selectedDepartments, setSelectedDepartments] = useState(['Computer Science']);
    const [timeRange, setTimeRange] = useState('2023-24');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [isGenerating, setIsGenerating] = useState(false);

    const reportTypes = ['NAAC', 'AICTE', 'NIRF'];
    const departments = [
        'Computer Science', 'Electronics', 'Mechanical', 'Civil',
        'MBA', 'MCA', 'Mathematics', 'Physics', 'Chemistry'
    ];
    const timeRanges = ['2023-24', '2022-23', '2021-22', 'Custom Range'];
    const categories = ['All', 'Academic', 'Research', 'Activities', 'Placements'];

    const handleGenerateReport = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
        }, 2000);
    };

    const getReportIcon = (type) => {
        switch (type) {
            case 'NAAC': return <HiOutlineAcademicCap className="w-5 h-5" />;
            case 'AICTE': return <HiOutlineChartBar className="w-5 h-5" />;
            case 'NIRF': return <HiOutlineDocumentReport className="w-5 h-5" />;
            default: return <FiFileText className="w-5 h-5" />;
        }
    };

    const renderPreviewCharts = () => {
        switch (reportType) {
            case 'NAAC':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <FiBarChart2 className="w-5 h-5 text-blue-600 mr-2" />
                                <h3 className="font-semibold text-gray-900">Curricular Aspects Completion</h3>
                            </div>
                            <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-end justify-around p-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 bg-blue-500 rounded-t" style={{ height: '120px' }}></div>
                                    <span className="text-xs mt-2 text-gray-600">CSE</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 bg-blue-400 rounded-t" style={{ height: '95px' }}></div>
                                    <span className="text-xs mt-2 text-gray-600">ECE</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 bg-blue-300 rounded-t" style={{ height: '110px' }}></div>
                                    <span className="text-xs mt-2 text-gray-600">MECH</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 bg-blue-600 rounded-t" style={{ height: '135px' }}></div>
                                    <span className="text-xs mt-2 text-gray-600">CIVIL</span>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="text-2xl font-bold text-gray-900">87.5%</span>
                                <p className="text-sm text-gray-600">Average Completion Rate</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <FiPieChart className="w-5 h-5 text-green-600 mr-2" />
                                <h3 className="font-semibold text-gray-900">Student Progression</h3>
                            </div>
                            <div className="h-48 flex items-center justify-center">
                                <div className="relative w-32 h-32">
                                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                                        <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="8" fill="none"
                                            strokeDasharray="125.6" strokeDashoffset="37.68" strokeLinecap="round" />
                                        <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="8" fill="none"
                                            strokeDasharray="125.6" strokeDashoffset="100.48" strokeLinecap="round" />
                                        <circle cx="50" cy="50" r="40" stroke="#f59e0b" strokeWidth="8" fill="none"
                                            strokeDasharray="125.6" strokeDashoffset="113.04" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-gray-900">892</div>
                                            <div className="text-xs text-gray-600">Students</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <div className="text-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-xs text-gray-600">Placed</div>
                                    <div className="font-semibold text-green-600">70%</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-xs text-gray-600">Higher Studies</div>
                                    <div className="font-semibold text-blue-600">20%</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-xs text-gray-600">Others</div>
                                    <div className="font-semibold text-amber-600">10%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'AICTE':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <FiUsers className="w-5 h-5 text-purple-600 mr-2" />
                                <h3 className="font-semibold text-gray-900">Faculty-Student Ratio</h3>
                            </div>
                            <div className="h-48 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-end justify-around p-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 bg-purple-500 rounded-t" style={{ height: '100px' }}></div>
                                    <span className="text-xs mt-2 text-gray-600">CSE</span>
                                    <span className="text-xs font-semibold text-purple-600">1:15</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 bg-purple-400 rounded-t" style={{ height: '85px' }}></div>
                                    <span className="text-xs mt-2 text-gray-600">ECE</span>
                                    <span className="text-xs font-semibold text-purple-600">1:12</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 bg-purple-300 rounded-t" style={{ height: '95px' }}></div>
                                    <span className="text-xs mt-2 text-gray-600">MECH</span>
                                    <span className="text-xs font-semibold text-purple-600">1:14</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 bg-purple-600 rounded-t" style={{ height: '110px' }}></div>
                                    <span className="text-xs mt-2 text-gray-600">CIVIL</span>
                                    <span className="text-xs font-semibold text-purple-600">1:16</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <FiBookOpen className="w-5 h-5 text-indigo-600 mr-2" />
                                <h3 className="font-semibold text-gray-900">Infrastructure Compliance</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Laboratory Facilities</span>
                                    <div className="flex items-center">
                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                                        </div>
                                        <span className="text-sm font-semibold text-indigo-600">92%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Library Resources</span>
                                    <div className="flex items-center">
                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                                        </div>
                                        <span className="text-sm font-semibold text-indigo-600">88%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Classroom Infrastructure</span>
                                    <div className="flex items-center">
                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                                        </div>
                                        <span className="text-sm font-semibold text-indigo-600">95%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Digital Infrastructure</span>
                                    <div className="flex items-center">
                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                        <span className="text-sm font-semibold text-indigo-600">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'NIRF':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <FiTrendingUp className="w-5 h-5 text-emerald-600 mr-2" />
                                <h3 className="font-semibold text-gray-900">Placement Trend</h3>
                            </div>
                            <div className="h-32 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg flex items-end justify-around p-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-4 bg-emerald-500 rounded-t" style={{ height: '60px' }}></div>
                                    <span className="text-xs mt-1 text-gray-600">2020</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-4 bg-emerald-500 rounded-t" style={{ height: '70px' }}></div>
                                    <span className="text-xs mt-1 text-gray-600">2021</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-4 bg-emerald-500 rounded-t" style={{ height: '85px' }}></div>
                                    <span className="text-xs mt-1 text-gray-600">2022</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-4 bg-emerald-600 rounded-t" style={{ height: '95px' }}></div>
                                    <span className="text-xs mt-1 text-gray-600">2023</span>
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <span className="text-lg font-bold text-emerald-600">78.5%</span>
                                <p className="text-xs text-gray-600">Current Year</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <FiUsers className="w-5 h-5 text-pink-600 mr-2" />
                                <h3 className="font-semibold text-gray-900">Gender Ratio</h3>
                            </div>
                            <div className="h-32 flex items-center justify-center">
                                <div className="relative w-24 h-24">
                                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="35" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                                        <circle cx="50" cy="50" r="35" stroke="#ec4899" strokeWidth="8" fill="none"
                                            strokeDasharray="219.8" strokeDashoffset="87.92" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-sm font-bold text-gray-900">60:40</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center gap-4 mt-2">
                                <div className="text-center">
                                    <div className="w-2 h-2 bg-pink-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-xs text-gray-600">Male</div>
                                    <div className="text-xs font-semibold text-pink-600">60%</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full mx-auto mb-1"></div>
                                    <div className="text-xs text-gray-600">Female</div>
                                    <div className="text-xs font-semibold text-gray-600">40%</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <FiAward className="w-5 h-5 text-orange-600 mr-2" />
                                <h3 className="font-semibold text-gray-900">Perception Score</h3>
                            </div>
                            <div className="h-32 flex items-center justify-center">
                                <div className="relative w-20 h-20">
                                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="35" stroke="#fed7aa" strokeWidth="6" fill="none" />
                                        <circle cx="50" cy="50" r="35" stroke="#f97316" strokeWidth="6" fill="none"
                                            strokeDasharray="219.8" strokeDashoffset="43.96" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-orange-600">4.2</div>
                                            <div className="text-xs text-gray-600">/5.0</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <div className="flex justify-center items-center">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span key={star} className={`text-sm ${star <= 4 ? 'text-orange-400' : 'text-gray-300'}`}>★</span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600 mt-1">Industry Rating</p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <NavbarAdmin/>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center">
                                    <HiOutlineDocumentReport className="w-8 h-8 text-indigo-600 mr-3" />
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">Generate Reports</h1>
                                        <p className="text-gray-600 mt-1">Select report type, filters, and generate in PDF/Excel format</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Last generated: 2 hours ago</p>
                                <p className="text-sm text-indigo-600 font-medium">Academic Year 2023-24</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        {/* Filters Section */}
                        <div className="xl:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
                                <div className="flex items-center mb-6">
                                    <FiFilter className="w-5 h-5 text-gray-600 mr-2" />
                                    <h2 className="text-lg font-semibold text-gray-900">Report Filters</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Report Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Report Type
                                        </label>
                                        <div className="space-y-2">
                                            {reportTypes.map((type) => (
                                                <label key={type} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="reportType"
                                                        value={type}
                                                        checked={reportType === type}
                                                        onChange={(e) => setReportType(e.target.value)}
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                    />
                                                    <span className="ml-2 flex items-center">
                                                        {getReportIcon(type)}
                                                        <span className="ml-2 text-sm text-gray-900">{type}</span>
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Department Selector */}
                                    <div >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department(s)
                                        </label>
                                        <div className="max-h-32 overflow-y-auto border scroll-smooth  border-gray-300 rounded-md p-2">
                                            <h1 className='flex items-center gap-1.5 text-xl font-bold'>

                                                <input type="checkbox" checked={selectedDepartments.length === departments.length} onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedDepartments(departments);
                                                    } else {
                                                        setSelectedDepartments([]);
                                                    }
                                                }}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                Select All
                                            </h1>
                                            {departments.map((dept) => (
                                                <label key={dept} className="flex items-center py-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedDepartments.includes(dept)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedDepartments([...selectedDepartments, dept]);
                                                            } else {
                                                                setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                                                            }
                                                        }}
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-900">{dept}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {selectedDepartments.length} department(s) selected
                                        </p>
                                    </div>

                                    {/* Time Range */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Time Range
                                        </label>
                                        <select
                                            value={timeRange}
                                            onChange={(e) => setTimeRange(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {timeRanges.map((range) => (
                                                <option key={range} value={range}>{range}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category Filter
                                        </label>
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Generate Preview Button */}
                                    <button
                                        onClick={handleGenerateReport}
                                        disabled={isGenerating}
                                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        {isGenerating ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Generating...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <FiBarChart2 className="w-4 h-4 mr-2" />
                                                Generate Preview
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="xl:col-span-3 space-y-8">
                            {/* Report Summary */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        {getReportIcon(reportType)}
                                        <div className="ml-3">
                                            <h2 className="text-xl font-semibold text-gray-900">{reportType} Report Preview</h2>
                                            <p className="text-gray-600">
                                                {selectedDepartments.length} department(s) • {timeRange} • {categoryFilter}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                            Data Available
                                        </span>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <FiUsers className="w-5 h-5 text-blue-600 mr-2" />
                                            <span className="text-sm font-medium text-blue-900">Total Students</span>
                                        </div>
                                        <p className="text-2xl font-bold text-blue-900 mt-1">2,847</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <FiAward className="w-5 h-5 text-green-600 mr-2" />
                                            <span className="text-sm font-medium text-green-900">Faculty</span>
                                        </div>
                                        <p className="text-2xl font-bold text-green-900 mt-1">189</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <FiBookOpen className="w-5 h-5 text-purple-600 mr-2" />
                                            <span className="text-sm font-medium text-purple-900">Programs</span>
                                        </div>
                                        <p className="text-2xl font-bold text-purple-900 mt-1">24</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <FiGlobe className="w-5 h-5 text-orange-600 mr-2" />
                                            <span className="text-sm font-medium text-orange-900">Research</span>
                                        </div>
                                        <p className="text-2xl font-bold text-orange-900 mt-1">156</p>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Charts */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Visualization</h3>
                                {renderPreviewCharts()}
                            </div>

                            {/* Export Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Export Options</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors duration-200 group">
                                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-200">
                                            <FiFileText className="w-6 h-6 text-red-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Download PDF</h4>
                                        <p className="text-sm text-gray-600 text-center">Formatted report with charts and institutional branding</p>
                                    </button>

                                    <button className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors duration-200 group">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200">
                                            <FiDownload className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Download Excel</h4>
                                        <p className="text-sm text-gray-600 text-center">Raw data with formulas and pivot tables</p>
                                    </button>

                                    <button className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 group">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200">
                                            <FiMail className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Email Report</h4>
                                        <p className="text-sm text-gray-600 text-center">Send to faculty and administrative staff</p>
                                    </button>
                                </div>

                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Report Contents:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Executive summary and key metrics</li>
                                        <li>• Department-wise detailed breakdown</li>
                                        <li>• Visual charts and trend analysis</li>
                                        <li>• Compliance checklist for {reportType}</li>
                                        <li>• Recommendations and action items</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminGenerateReports;