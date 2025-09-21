import React from 'react';
import { FaEdit, FaTrash, FaEnvelope, FaCalendar, FaUsers, FaGraduationCap } from 'react-icons/fa';

const UserTable = ({ users, userType, onEdit, onDelete }) => {
    const getStatusBadge = (status) => {
        return status === 'active' ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
            </span>
        ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Inactive
            </span>
        );
    };

    if (users.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-gray-400 mb-4">
                    {userType === 'faculty' ? <FaUsers className="h-12 w-12 mx-auto" /> : <FaGraduationCap className="h-12 w-12 mx-auto" />}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No {userType} found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name & Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {userType === 'faculty' ? 'Position' : 'Year & Advisor'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {userType === 'faculty' ? 'Students' : 'GPA'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                <span className="text-sm font-medium text-white">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <FaEnvelope className="h-3 w-3 mr-1" />
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.department}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {userType === 'faculty' ? (
                                        <div className="text-sm text-gray-900">{user.position}</div>
                                    ) : (
                                        <div>
                                            <div className="text-sm text-gray-900">{user.year}</div>
                                            <div className="text-sm text-gray-500">{user.advisor}</div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {userType === 'faculty' ? (
                                        <div className="text-sm text-gray-900">{user.studentsCount} students</div>
                                    ) : (
                                        <div className="text-sm text-gray-900">{user.gpa}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(user.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 flex items-center">
                                        <FaCalendar className="h-3 w-3 mr-1" />
                                        {new Date(userType === 'faculty' ? user.joinDate : user.enrollDate).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => onEdit(user, userType)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors duration-150"
                                            title="Edit"
                                        >
                                            <FaEdit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id, userType)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded transition-colors duration-150"
                                            title="Delete"
                                        >
                                            <FaTrash className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;