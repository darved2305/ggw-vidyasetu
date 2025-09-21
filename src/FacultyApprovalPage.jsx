import React, { useState } from 'react';
import { Check, X, FileText, Calendar, Building, HardDrive, File as FileIcon, Search, Filter } from 'lucide-react';
import NavbarForFacultyApproval from './components/NavbarForFacultyApproval';

const FacultyApprovalPage = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Academic Transcript Fall 2023',
      category: 'Academic Records',
      organizer: 'University of Technology',
      dateUploaded: '2024/01/15',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      status: 'Verified',
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
      credentialLink: 'https://coursera.org/verify/abc123',
    },
    {
      id: 3,
      title: 'Internship Completion Letter',
      category: 'Work Experience',
      organizer: 'Tech Solutions Inc.',
      dateUploaded: '2024/01/05',
      fileSize: '856 KB',
      fileType: 'PDF',
      status: 'Verified',
    },
    {
      id: 4,
      title: 'Programming Contest Certificate',
      category: 'Competitions',
      organizer: 'CodeChef',
      dateUploaded: '2023/12/28',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      status: 'Verified',
    },
    {
      id: 5,
      title: 'AWS Cloud Practitioner',
      category: 'Skill Development',
      organizer: 'Amazon Web Services',
      dateUploaded: '2023/12/20',
      fileSize: '945 KB',
      fileType: 'PDF',
      status: 'Verified',
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewDocument, setPreviewDocument] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  const statusOptions = ['All Categories', 'Verified', 'Pending'];

  const filteredDocuments = documents.filter((doc) => {
    const matchesStatus = selectedStatus === 'All Categories' || doc.status === selectedStatus;
    const needle = searchTerm.toLowerCase();
    const matchesSearch =
      doc.title.toLowerCase().includes(needle) || doc.organizer.toLowerCase().includes(needle);
    return matchesStatus && matchesSearch;
  });

  const handlePreview = (document) => setPreviewDocument(document);

  const handleVerify = () => {
    setDocuments((docs) =>
      docs.map((doc) => (doc.id === previewDocument.id ? { ...doc, status: 'Verified' } : doc)),
    );
    setShowSuccessMessage('Document verified successfully!');
    setTimeout(() => {
      setShowSuccessMessage('');
      setPreviewDocument(null);
    }, 2000);
  };

  const handleReject = () => setShowRejectModal(true);

  const submitRejection = () => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === previewDocument.id ? { ...doc, status: 'Rejected', rejectionReason } : doc,
      ),
    );
    setShowSuccessMessage('Feedback submitted successfully!');
    setTimeout(() => {
      setShowSuccessMessage('');
      setShowRejectModal(false);
      setPreviewDocument(null);
      setRejectionReason('');
    }, 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Verified
          </span>
        );
      case 'Pending':
        return (
          <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
            Pending
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <>
      <NavbarForFacultyApproval />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Approval &amp; Verification</h1>
            <p className="text-gray-600">Review and verify student documents</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search documents or organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-40"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Document</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Organization</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date Uploaded</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-red-600" size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{document.title}</div>
                          <div className="text-xs text-gray-500">{document.fileType}</div>
                          {document.credentialLink && (
                            <div className="text-xs text-blue-600 mt-1">
                              Certificate link: {document.credentialLink}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{document.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{document.organizer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{document.dateUploaded}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{document.fileSize}</td>
                    <td className="px-6 py-4">{getStatusBadge(document.status)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handlePreview(document)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        title="View Document"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {filteredDocuments.length} of {documents.length} documents
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>

          {/* Preview Modal */}
          {previewDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  {/* Modal Header */}
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{previewDocument.title}</h2>
                    <button
                      onClick={() => setPreviewDocument(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Document Preview Area */}
                  <div className="bg-gray-100 rounded-lg p-8 mb-6 min-h-96 flex items-center justify-center">
                    <div className="text-center">
                      <FileText size={64} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">Document Preview</p>
                      <p className="text-gray-500 text-sm">
                        {previewDocument.fileType} • {previewDocument.fileSize}
                      </p>
                    </div>
                  </div>

                  {/* Success Message */}
                  {showSuccessMessage && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      {showSuccessMessage}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={handleVerify}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Check size={20} />
                      <span>Verify</span>
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                    >
                      <X size={20} />
                      <span>Reject</span>
                    </button>
                  </div>

                  {/* Document Details */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Title</p>
                          <p className="text-sm text-gray-600">{previewDocument.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Category</p>
                          <p className="text-sm text-gray-600">{previewDocument.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Organizer</p>
                          <p className="text-sm text-gray-600">{previewDocument.organizer}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date Uploaded</p>
                          <p className="text-sm text-gray-600">{previewDocument.dateUploaded}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <HardDrive className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">File Size</p>
                          <p className="text-sm text-gray-600">{previewDocument.fileSize}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FileIcon className="text-gray-400" size={18} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">File Type</p>
                          <p className="text-sm text-gray-600">{previewDocument.fileType}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Modal */}
          {showRejectModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reason for Rejection</h3>

                  {showSuccessMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      {showSuccessMessage}
                    </div>
                  )}

                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a reason for rejecting this document..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />

                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => setShowRejectModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitRejection}
                      disabled={!rejectionReason.trim()}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FacultyApprovalPage;
