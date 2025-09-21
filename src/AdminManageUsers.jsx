import React, { useState } from 'react';
import { FaUsers, FaGraduationCap, FaSchool, FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import StatCard from './components/StatCard';
import UserModal from './components/UserModal';
import UserTable from './components/UserTable';
import NavbarAdmin from './components/NavbarAdmin';

const AdminManageUsers = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');

    // Mock data - in real app, this would come from an API
    const [facultyData, setFacultyData] = useState([
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@university.edu',
            department: 'Computer Science',
            position: 'Professor',
            studentsCount: 45,
            status: 'active',
            joinDate: '2019-08-15'
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            email: 'michael.chen@university.edu',
            department: 'Mathematics',
            position: 'Associate Professor',
            studentsCount: 32,
            status: 'active',
            joinDate: '2020-01-10'
        },
        {
            id: 3,
            name: 'Dr. Emily Rodriguez',
            email: 'emily.rodriguez@university.edu',
            department: 'Biology',
            position: 'Assistant Professor',
            studentsCount: 28,
            status: 'active',
            joinDate: '2021-09-01'
        },
        {
            id: 4,
            name: 'Dr. James Wilson',
            email: 'james.wilson@university.edu',
            department: 'Physics',
            position: 'Professor',
            studentsCount: 38,
            status: 'inactive',
            joinDate: '2018-03-20'
        }
    ]);

    const [studentsData, setStudentsData] = useState([
        {
            id: 1,
            name: 'Alex Thompson',
            email: 'alex.thompson@student.edu',
            department: 'Computer Science',
            advisor: 'Dr. Sarah Johnson',
            year: 'Senior',
            gpa: 3.8,
            status: 'active',
            enrollDate: '2021-09-01'
        },
        {
            id: 2,
            name: 'Jessica Martinez',
            email: 'jessica.martinez@student.edu',
            department: 'Mathematics',
            advisor: 'Dr. Michael Chen',
            year: 'Junior',
            gpa: 3.9,
            status: 'active',
            enrollDate: '2022-09-01'
        },
        {
            id: 3,
            name: 'David Kim',
            email: 'david.kim@student.edu',
            department: 'Biology',
            advisor: 'Dr. Emily Rodriguez',
            year: 'Sophomore',
            gpa: 3.7,
            status: 'active',
            enrollDate: '2023-09-01'
        },
        {
            id: 4,
            name: 'Sarah Brown',
            email: 'sarah.brown@student.edu',
            department: 'Physics',
            advisor: 'Dr. James Wilson',
            year: 'Graduate',
            gpa: 3.95,
            status: 'active',
            enrollDate: '2020-09-01'
        }
    ]);

    const departments = ['Computer Science', 'Mathematics', 'Biology', 'Physics', 'Chemistry', 'English'];

    const handleAddUser = (userType) => {
        setModalMode('add');
        setSelectedUser({ type: userType });
        setShowModal(true);
    };

    const handleEditUser = (user, userType) => {
        setModalMode('edit');
        setSelectedUser({ ...user, type: userType });
        setShowModal(true);
    };

    const handleDeleteUser = (userId, userType) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            if (userType === 'faculty') {
                setFacultyData(prev => prev.filter(f => f.id !== userId));
            } else {
                setStudentsData(prev => prev.filter(s => s.id !== userId));
            }
        }
    };

    const handleSaveUser = (userData) => {
        if (modalMode === 'add') {
            const newId = Math.max(...(userData.type === 'faculty' ? facultyData : studentsData).map(u => u.id)) + 1;
            const newUser = { ...userData, id: newId };

            if (userData.type === 'faculty') {
                setFacultyData(prev => [...prev, newUser]);
            } else {
                setStudentsData(prev => [...prev, newUser]);
            }
        } else {
            if (userData.type === 'faculty') {
                setFacultyData(prev => prev.map(f => f.id === userData.id ? userData : f));
            } else {
                setStudentsData(prev => prev.map(s => s.id === userData.id ? userData : s));
            }
        }
        setShowModal(false);
    };

    const filteredFaculty = facultyData.filter(faculty =>
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(faculty =>
        selectedDepartment === 'all' || faculty.department === selectedDepartment
    );

    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.advisor.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(student =>
        selectedDepartment === 'all' || student.department === selectedDepartment
    );

    const totalStudents = studentsData.length;
    const totalFaculty = facultyData.length;
    const activeFaculty = facultyData.filter(f => f.status === 'active').length;
    const activeStudents = studentsData.filter(s => s.status === 'active').length;

    return (
    <>
        <NavbarAdmin/>


            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">University Admin Dashboard</h1>
                                <p className="text-gray-600 mt-1">Manage faculty and students across all departments</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaSchool className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex space-x-8">
                            {[
                                { id: 'overview', label: 'Overview', icon: FaEye },
                                { id: 'faculty', label: 'Faculty Management', icon: FaUsers },
                                { id: 'students', label: 'Student Management', icon: FaGraduationCap }
                            ].map(tab => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        <IconComponent className="h-4 w-4 mr-2" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard
                                    title="Total Faculty"
                                    value={totalFaculty}
                                    icon={FaUsers}
                                    color="blue"
                                    subtitle={`${activeFaculty} active`}
                                />
                                <StatCard
                                    title="Total Students"
                                    value={totalStudents}
                                    icon={FaGraduationCap}
                                    color="green"
                                    subtitle={`${activeStudents} enrolled`}
                                />
                                <StatCard
                                    title="Departments"
                                    value={departments.length}
                                    icon={FaSchool}
                                    color="purple"
                                    subtitle="Active programs"
                                />
                                <StatCard
                                    title="Faculty-Student Ratio"
                                    value={`1:${Math.round(totalStudents / totalFaculty)}`}
                                    icon={FaUsers}
                                    color="orange"
                                    subtitle="Average ratio"
                                />
                            </div>

                            {/* Department Overview */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {departments.map(dept => {
                                        const deptFaculty = facultyData.filter(f => f.department === dept);
                                        const deptStudents = studentsData.filter(s => s.department === dept);

                                        return (
                                            <div key={dept} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                                <h4 className="font-medium text-gray-900">{dept}</h4>
                                                <div className="mt-2 space-y-1">
                                                    <p className="text-sm text-gray-600">Faculty: {deptFaculty.length}</p>
                                                    <p className="text-sm text-gray-600">Students: {deptStudents.length}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Ratio: 1:{deptStudents.length > 0 ? Math.round(deptStudents.length / (deptFaculty.length || 1)) : 0}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Faculty Management Tab */}
                    {activeTab === 'faculty' && (
                        <div className="space-y-6">
                            {/* Controls */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Faculty Management</h2>
                                    <button
                                        onClick={() => handleAddUser('faculty')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        <FaPlus className="h-4 w-4 mr-2" />
                                        Add Faculty
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <div className="flex-1 relative">
                                        <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search faculty..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="relative">
                                        <FaFilter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <select
                                            value={selectedDepartment}
                                            onChange={(e) => setSelectedDepartment(e.target.value)}
                                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                        >
                                            <option value="all">All Departments</option>
                                            {departments.map(dept => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Faculty Table */}
                            <UserTable
                                users={filteredFaculty}
                                userType="faculty"
                                onEdit={handleEditUser}
                                onDelete={handleDeleteUser}
                            />
                        </div>
                    )}

                    {/* Students Management Tab */}
                    {activeTab === 'students' && (
                        <div className="space-y-6">
                            {/* Controls */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Student Management</h2>
                                    <button
                                        onClick={() => handleAddUser('student')}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                                    >
                                        <FaPlus className="h-4 w-4 mr-2" />
                                        Add Student
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <div className="flex-1 relative">
                                        <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search students..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="relative">
                                        <FaFilter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <select
                                            value={selectedDepartment}
                                            onChange={(e) => setSelectedDepartment(e.target.value)}
                                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                                        >
                                            <option value="all">All Departments</option>
                                            {departments.map(dept => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Students Table */}
                            <UserTable
                                users={filteredStudents}
                                userType="student"
                                onEdit={handleEditUser}
                                onDelete={handleDeleteUser}
                            />
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <UserModal
                        mode={modalMode}
                        user={selectedUser}
                        departments={departments}
                        facultyList={facultyData}
                        onSave={handleSaveUser}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>
    </>    
    );
};

export default AdminManageUsers;