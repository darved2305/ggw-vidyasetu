import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaBuilding, FaCalendar, FaGraduationCap, FaUsers } from 'react-icons/fa';

const UserModal = ({ mode, user, departments, facultyList, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        status: 'active',
        type: user?.type || 'faculty',
        // Faculty specific
        position: '',
        studentsCount: 0,
        joinDate: '',
        // Student specific
        advisor: '',
        year: '',
        gpa: '',
        enrollDate: ''
    });

    useEffect(() => {
        if (mode === 'edit' && user) {
            setFormData({
                ...user,
                studentsCount: user.studentsCount || 0,
                gpa: user.gpa || '',
                joinDate: user.joinDate || '',
                enrollDate: user.enrollDate || ''
            });
        } else if (mode === 'add') {
            setFormData(prev => ({
                ...prev,
                type: user?.type || 'faculty',
                joinDate: new Date().toISOString().split('T')[0],
                enrollDate: new Date().toISOString().split('T')[0]
            }));
        }
    }, [mode, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.department) {
            alert('Please fill in all required fields');
            return;
        }

        // Type-specific validation
        if (formData.type === 'faculty' && !formData.position) {
            alert('Please fill in the position field');
            return;
        }

        if (formData.type === 'student' && (!formData.advisor || !formData.year)) {
            alert('Please fill in the advisor and year fields');
            return;
        }

        onSave(formData);
    };

    const positions = [
        'Professor',
        'Associate Professor',
        'Assistant Professor',
        'Lecturer',
        'Adjunct Professor'
    ];

    const years = [
        'Freshman',
        'Sophomore',
        'Junior',
        'Senior',
        'Graduate',
        'PhD'
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                    {formData.type === 'faculty' ? <FaUsers className="h-6 w-6 text-blue-600" /> : <FaGraduationCap className="h-6 w-6 text-blue-600" />}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        {mode === 'add' ? 'Add' : 'Edit'} {formData.type === 'faculty' ? 'Faculty' : 'Student'}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {mode === 'add' ? 'Create a new' : 'Update'} {formData.type} record
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-md p-2 hover:bg-gray-100 transition-colors duration-150"
                            >
                                <FaTimes className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaUser className="inline h-4 w-4 mr-1" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaEnvelope className="inline h-4 w-4 mr-1" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaBuilding className="inline h-4 w-4 mr-1" />
                                        Department *
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Faculty-specific fields */}
                            {formData.type === 'faculty' && (
                                <div className="space-y-4 pt-4 border-t border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900">Faculty Details</h4>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Position</option>
                                            {positions.map(pos => (
                                                <option key={pos} value={pos}>{pos}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Students Count</label>
                                        <input
                                            type="number"
                                            name="studentsCount"
                                            value={formData.studentsCount}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Number of students"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <FaCalendar className="inline h-4 w-4 mr-1" />
                                            Join Date
                                        </label>
                                        <input
                                            type="date"
                                            name="joinDate"
                                            value={formData.joinDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Student-specific fields */}
                            {formData.type === 'student' && (
                                <div className="space-y-4 pt-4 border-t border-gray-200">
                                    <h4 className="text-md font-medium text-gray-900">Student Details</h4>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                                        <select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Year</option>
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Advisor *</label>
                                        <select
                                            name="advisor"
                                            value={formData.advisor}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Advisor</option>
                                            {facultyList.map(faculty => (
                                                <option key={faculty.id} value={faculty.name}>{faculty.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                                        <input
                                            type="number"
                                            name="gpa"
                                            value={formData.gpa}
                                            onChange={handleInputChange}
                                            min="0"
                                            max="4"
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <FaCalendar className="inline h-4 w-4 mr-1" />
                                            Enrollment Date
                                        </label>
                                        <input
                                            type="date"
                                            name="enrollDate"
                                            value={formData.enrollDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-150"
                        >
                            {mode === 'add' ? 'Create' : 'Update'} {formData.type === 'faculty' ? 'Faculty' : 'Student'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-150"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;