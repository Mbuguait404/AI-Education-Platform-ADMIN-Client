import { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';

// Mock submissions data
const mockSubmissions = [
  { id: 1, user: 'Sarah Chen', email: 'sarah.chen@example.com', project: 'Spam Email Classifier', course: 'AI Fundamentals', submitted: '2 hours ago', status: 'pending', grade: null },
  { id: 2, user: 'Marcus Johnson', email: 'marcus.j@example.com', project: 'Handwritten Digit Recognition', course: 'AI Fundamentals', submitted: '5 hours ago', status: 'reviewed', grade: 'A' },
  { id: 3, user: 'David Kim', email: 'david.kim@example.com', project: 'Customer Support Bot', course: 'Prompt Engineering', submitted: '1 day ago', status: 'pending', grade: null },
  { id: 4, user: 'Priya Patel', email: 'priya.patel@example.com', project: 'Spam Email Classifier', course: 'AI Fundamentals', submitted: '2 days ago', status: 'approved', grade: 'A+' },
  { id: 5, user: 'James Wilson', email: 'james.w@example.com', project: 'Content Calendar Generator', course: 'Prompt Engineering', submitted: '3 days ago', status: 'rejected', grade: 'F' },
  { id: 6, user: 'Lisa Thompson', email: 'lisa.t@example.com', project: 'Sentiment Analysis Tool', course: 'AI Fundamentals', submitted: '3 days ago', status: 'approved', grade: 'A' },
  { id: 7, user: 'Ahmed Hassan', email: 'ahmed.h@example.com', project: 'Spam Email Classifier', course: 'AI Fundamentals', submitted: '4 days ago', status: 'pending', grade: null },
  { id: 8, user: 'Yuki Tanaka', email: 'yuki.t@example.com', project: 'Image Classifier', course: 'AI Fundamentals', submitted: '5 days ago', status: 'reviewed', grade: 'B+' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue/10 text-blue',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const gradeColors: Record<string, string> = {
  'A+': 'text-green-600',
  'A': 'text-green-600',
  'B+': 'text-blue',
  'B': 'text-blue',
  'C': 'text-yellow-600',
  'F': 'text-red-600',
};

export default function AdminSubmissions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<typeof mockSubmissions[0] | null>(null);

  const filteredSubmissions = mockSubmissions.filter(sub => {
    const matchesSearch = sub.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         sub.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const openReviewModal = (submission: typeof mockSubmissions[0]) => {
    setSelectedSubmission(submission);
    setShowReviewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Submissions & Assignments</h1>
          <p className="text-text-secondary text-sm">Review and grade learner project submissions</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Submissions', value: '1,247', icon: '📥' },
          { label: 'Pending Review', value: '34', icon: '⏳' },
          { label: 'Approved', value: '892', icon: '✅' },
          { label: 'Needs Revision', value: '156', icon: '🔄' },
          { label: 'Avg Review Time', value: '4.2h', icon: '⏱️' },
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
              placeholder="Search by user or project..."
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
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Project</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Submitted</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Grade</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-blue text-xs font-bold">
                          {sub.user.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{sub.user}</p>
                        <p className="text-gray-500 text-xs">{sub.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm">{sub.project}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{sub.course}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock size={14} />
                      {sub.submitted}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[sub.status]}`}>
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {sub.grade ? (
                      <span className={`font-display font-bold text-lg ${gradeColors[sub.grade]}`}>
                        {sub.grade}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => openReviewModal(sub)}
                        className="px-3 py-1.5 bg-coral text-white rounded-lg text-sm hover:bg-coral-dark"
                      >
                        {sub.status === 'pending' ? 'Review' : 'View'}
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredSubmissions.length}</span> of <span className="font-medium">1,247</span> submissions
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

      {/* Review Modal */}
      {showReviewModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div>
                <h3 className="font-display font-bold text-lg">Review Submission</h3>
                <p className="text-sm text-gray-500">{selectedSubmission.project} by {selectedSubmission.user}</p>
              </div>
              <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-6">
              {/* Submission Content */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Submission Files</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center">
                        <span className="text-blue text-xs font-bold">.py</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">classifier.py</p>
                        <p className="text-xs text-gray-500">2.4 KB • Uploaded 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-coral text-sm">Download</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-xs font-bold">.md</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">README.md</p>
                        <p className="text-xs text-gray-500">1.2 KB • Uploaded 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-coral text-sm">Download</button>
                  </div>
                </div>
              </div>
              
              {/* Student Notes */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Student Notes</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    I implemented a Naive Bayes classifier for spam detection. The model achieves 94% accuracy on the test set. 
                    I also added some data preprocessing steps to handle missing values and normalize the text data.
                  </p>
                </div>
              </div>
              
              {/* Rubric */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Grading Rubric</h4>
                <div className="space-y-2">
                  {[
                    { criterion: 'Code Quality', points: 25, max: 25 },
                    { criterion: 'Model Accuracy', points: 30, max: 30 },
                    { criterion: 'Documentation', points: 18, max: 20 },
                    { criterion: 'Creativity', points: 15, max: 20 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm">{item.criterion}</span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          defaultValue={item.points}
                          className="w-16 px-2 py-1 border border-gray-200 rounded text-center"
                        />
                        <span className="text-gray-500">/ {item.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Feedback */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Feedback</h4>
                <textarea
                  rows={4}
                  placeholder="Enter your feedback for the student..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 resize-none"
                />
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200">
              <button 
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm">
                Request Changes
              </button>
              <button className="px-4 py-2 bg-coral text-white rounded-lg text-sm flex items-center gap-2">
                <CheckCircle size={16} />
                Approve & Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
