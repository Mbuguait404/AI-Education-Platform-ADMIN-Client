import { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Download, 
  Eye,
  MoreHorizontal,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock certification data
const mockCertificates = [
  { id: 'CERT-001', user: 'Sarah Chen', email: 'sarah.chen@example.com', course: 'AI Fundamentals', issuedDate: '2025-01-15', status: 'active', grade: '95%', verified: true },
  { id: 'CERT-002', user: 'Marcus Johnson', email: 'marcus.j@example.com', course: 'AI Fundamentals', issuedDate: '2025-01-14', status: 'active', grade: '88%', verified: true },
  { id: 'CERT-003', user: 'Elena Rodriguez', email: 'elena.r@example.com', course: 'Prompt Engineering', issuedDate: '2025-01-12', status: 'active', grade: '92%', verified: true },
  { id: 'CERT-004', user: 'David Kim', email: 'david.kim@example.com', course: 'AI Fundamentals', issuedDate: '2025-01-10', status: 'revoked', grade: '76%', verified: false },
  { id: 'CERT-005', user: 'Priya Patel', email: 'priya.patel@example.com', course: 'AI for Freelancers', issuedDate: '2025-01-08', status: 'active', grade: '98%', verified: true },
  { id: 'CERT-006', user: 'James Wilson', email: 'james.w@example.com', course: 'AI Fundamentals', issuedDate: '2025-01-05', status: 'pending', grade: 'Pending', verified: false },
  { id: 'CERT-007', user: 'Lisa Thompson', email: 'lisa.t@example.com', course: 'Prompt Engineering', issuedDate: '2025-01-03', status: 'active', grade: '91%', verified: true },
  { id: 'CERT-008', user: 'Ahmed Hassan', email: 'ahmed.h@example.com', course: 'AI Fundamentals', issuedDate: '2025-01-01', status: 'active', grade: '85%', verified: true },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  revoked: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

export default function AdminCertifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<typeof mockCertificates[0] | null>(null);

  const filteredCerts = mockCertificates.filter(cert => {
    const matchesSearch = cert.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cert.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || cert.status === selectedStatus;
    const matchesCourse = selectedCourse === 'all' || cert.course === selectedCourse;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const openCertModal = (cert: typeof mockCertificates[0]) => {
    setSelectedCert(cert);
    setShowCertModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Certification Management</h1>
          <p className="text-text-secondary text-sm">Manage and verify all issued certificates</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download size={16} />
            Export All
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg text-sm hover:bg-coral-dark">
            <Award size={16} />
            Issue Certificate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Issued', value: '3,847', icon: '🏆' },
          { label: 'Active', value: '3,654', icon: '✅' },
          { label: 'Pending Review', value: '127', icon: '⏳' },
          { label: 'Revoked', value: '66', icon: '🚫' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className="font-display font-bold text-xl">{stat.value}</p>
            <p className="text-text-secondary text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or certificate ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="revoked">Revoked</option>
            </select>
            
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Courses</option>
              <option value="AI Fundamentals">AI Fundamentals</option>
              <option value="Prompt Engineering">Prompt Engineering</option>
              <option value="AI for Freelancers">AI for Freelancers</option>
            </select>
            
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Certificate ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Issued Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCerts.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm">{cert.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-sm">{cert.user}</p>
                      <p className="text-gray-500 text-xs">{cert.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{cert.course}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold text-sm ${
                      cert.grade === 'Pending' ? 'text-gray-400' : 'text-coral'
                    }`}>
                      {cert.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cert.issuedDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[cert.status]}`}>
                      {cert.status === 'active' && <CheckCircle size={10} />}
                      {cert.status === 'revoked' && <XCircle size={10} />}
                      {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => openCertModal(cert)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                      >
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                        <Download size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCerts.length}</span> of <span className="font-medium">3,847</span> certificates
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 bg-coral text-white rounded-lg text-sm font-medium">1</button>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">2</button>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">3</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {showCertModal && selectedCert && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="font-display font-bold text-lg">Certificate Details</h3>
              <button onClick={() => setShowCertModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-5">
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-blue to-blue-dark rounded-xl p-8 text-white text-center mb-6">
                <Award className="mx-auto mb-4" size={64} />
                <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Certificate of Completion</p>
                <h4 className="font-display font-bold text-2xl mb-2">{selectedCert.course}</h4>
                <p className="text-white/80 mb-4">This certifies that</p>
                <p className="font-display font-bold text-xl mb-4">{selectedCert.user}</p>
                <p className="text-white/80 text-sm mb-6">
                  has successfully completed the Masterly AI program demonstrating proficiency in the subject matter.
                </p>
                <div className="flex items-center justify-center gap-8 text-sm">
                  <div>
                    <p className="text-white/60 text-xs">Grade</p>
                    <p className="font-semibold">{selectedCert.grade}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Issued</p>
                    <p className="font-semibold">{selectedCert.issuedDate}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Certificate ID</p>
                    <p className="font-semibold">{selectedCert.id}</p>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral-dark">
                  <Download size={16} />
                  Download PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Share2 size={16} />
                  Share
                </button>
                {selectedCert.status === 'active' ? (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                    <XCircle size={16} />
                    Revoke
                  </button>
                ) : (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-green-200 text-green-600 rounded-lg hover:bg-green-50">
                    <CheckCircle size={16} />
                    Reactivate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
