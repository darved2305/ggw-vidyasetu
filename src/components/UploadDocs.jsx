import React, { useState } from 'react';
import { Upload, FileText, Search, Filter, Download, Eye, MoreVertical } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    description: '',
    date_done: '',
    organizer: '',
    duration: '',
    credential_link: '',
    file: null
  });

  const documents = [
    {
      id: 1,
      title: 'Academic Transcript Fall 2023',
      category: 'Academic Records',
      organizer: 'University of Technology',
      dateUploaded: '2024/01/15',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      status: 'Verified'
    },
    {
      id: 2,
      title: 'React Developer Certificate',
      category: 'Certificates',
      organizer: 'Meta Professional Certificates',
      dateUploaded: '2024/01/10',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      status: 'Pending',
      credentialLink: 'https://coursera.org/verify/abc123'
    },
    {
      id: 3,
      title: 'Internship Completion Letter',
      category: 'Work Experience',
      organizer: 'Tech Solutions Inc.',
      dateUploaded: '2024/01/05',
      fileSize: '856 KB',
      fileType: 'PDF',
      status: 'Verified'
    },
    {
      id: 4,
      title: 'Programming Contest Certificate',
      category: 'Competitions',
      organizer: 'CodeChef',
      dateUploaded: '2023/12/28',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      status: 'Verified'
    },
    {
      id: 5,
      title: 'AWS Cloud Practitioner',
      category: 'Skill Development',
      organizer: 'Amazon Web Services',
      dateUploaded: '2023/12/20',
      fileSize: '945 KB',
      fileType: 'PDF',
      status: 'Verified'
    }
  ];

  const categories = [
    'All Categories',
    'Academic Records',
    'Certificates', 
    'Work Experience',
    'Competitions',
    'Skill Development',
    'Projects',
    'Other'
  ];

  const getStatusStyle = (status) => {
    const statusStyles = {
      'Verified': 'text-green-600 bg-green-100',
      'Pending': 'text-yellow-600 bg-yellow-100',
      'Rejected': 'text-red-600 bg-red-100'
    };
    return statusStyles[status] || 'text-gray-600 bg-gray-100';
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || 
                           doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, file }));
  };

  const handleDragEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, file: e.dataTransfer.files[0] }));
    }
  };

  const submitDocument = (e) => {
    e.preventDefault();
    console.log('Document submission:', formData);
    
    setShowSuccess(true);
    setShowUploadModal(false);
    setTimeout(() => setShowSuccess(false), 3000);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      category: '',
      description: '',
      date_done: '',
      organizer: '',
      duration: '',
      credential_link: '',
      file: null
    });
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Files & Assets</h1>
            <p className="text-gray-600">Manage your academic records, certificates, and other documents</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>

        {showSuccess && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 text-center transition-all duration-300">
            Document uploaded successfully!
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents or organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-48"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Document</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Organization</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date Uploaded</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{doc.title}</div>
                          <div className="text-sm text-gray-500">{doc.fileType}</div>
                          {doc.credentialLink && (
                            <div className="text-xs text-blue-600 mt-1">
                              Certificate link: {doc.credentialLink}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{doc.category}</td>
                    <td className="py-4 px-4 text-gray-600">{doc.organizer}</td>
                    <td className="py-4 px-4 text-gray-600">{doc.dateUploaded}</td>
                    <td className="py-4 px-4 text-gray-600">{doc.fileSize}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredDocs.length} of {documents.length} documents
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Upload Document</h2>
                <button
                  onClick={closeUploadModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-blue-100 rounded-xl p-8 shadow-md border border-blue-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Select Document
                  </h3>
                </div>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDragEvents}
                  onDragLeave={handleDragEvents}
                  onDragOver={handleDragEvents}
                  onDrop={handleFileDrop}
                >
                  <Upload className="w-14 h-14 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {formData.file 
                      ? formData.file.name 
                      : 'Drop your document here or click to browse'
                    }
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </p>
                  
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer transition-colors font-medium text-base shadow-sm"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              <div className="bg-blue-100 rounded-xl p-8 shadow-md border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={updateFormData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.filter(cat => cat !== 'All Categories').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organizer/Institution
                    </label>
                    <input
                      type="text"
                      name="organizer"
                      value={formData.organizer}
                      onChange={updateFormData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Enter organizer name"
                      required
                    />
                  </div>

                  {formData.category === 'Certificates' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Credential Link
                      </label>
                      <input
                        type="url"
                        name="credential_link"
                        value={formData.credential_link}
                        onChange={updateFormData}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Enter certificate verification link"
                        required
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={updateFormData}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      placeholder="Describe your document..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Completed
                    </label>
                    <input
                      type="date"
                      name="date_done"
                      value={formData.date_done}
                      onChange={updateFormData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={updateFormData}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g., 3 months, 1 year, 40 hours"
                      required
                    />
                  </div>
                </div>

                {formData.credential_link && formData.category === 'Certificates' && (
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Certificate link:</span> {formData.credential_link}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="px-6 py-3 text-lg font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={closeUploadModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitDocument}
                  className="px-8 py-3 text-lg font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors shadow-sm"
                >
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
