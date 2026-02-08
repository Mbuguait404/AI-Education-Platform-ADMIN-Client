import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Ban, 
  Award,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  UserPlus,
  Eye
} from 'lucide-react';

// Mock user data
const mockUsers = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@example.com', status: 'active', plan: 'Pro', progress: 78, courses: 3, certificates: 2, joined: '2024-11-15', lastActive: '2 hours ago', country: 'USA' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus.j@example.com', status: 'active', plan: 'Enterprise', progress: 92, courses: 5, certificates: 3, joined: '2024-10-22', lastActive: '5 min ago', country: 'UK' },
  { id: 3, name: 'Elena Rodriguez', email: 'elena.r@example.com', status: 'inactive', plan: 'Free', progress: 23, courses: 1, certificates: 0, joined: '2024-12-01', lastActive: '3 days ago', country: 'Spain' },
  { id: 4, name: 'David Kim', email: 'david.kim@example.com', status: 'active', plan: 'Pro', progress: 65, courses: 2, certificates: 1, joined: '2024-09-18', lastActive: '1 hour ago', country: 'South Korea' },
  { id: 5, name: 'Priya Patel', email: 'priya.patel@example.com', status: 'active', plan: 'Pro', progress: 88, courses: 4, certificates: 2, joined: '2024-08-30', lastActive: '30 min ago', country: 'India' },
  { id: 6, name: 'James Wilson', email: 'james.w@example.com', status: 'suspended', plan: 'Free', progress: 12, courses: 1, certificates: 0, joined: '2024-12-10', lastActive: '1 week ago', country: 'Canada' },
  { id: 7, name: 'Lisa Thompson', email: 'lisa.t@example.com', status: 'active', plan: 'Enterprise', progress: 95, courses: 6, certificates: 4, joined: '2024-07-15', lastActive: '15 min ago', country: 'Australia' },
  { id: 8, name: 'Ahmed Hassan', email: 'ahmed.h@example.com', status: 'active', plan: 'Pro', progress: 71, courses: 3, certificates: 2, joined: '2024-10-05', lastActive: '4 hours ago', country: 'Egypt' },
  { id: 9, name: 'Yuki Tanaka', email: 'yuki.t@example.com', status: 'inactive', plan: 'Free', progress: 8, courses: 1, certificates: 0, joined: '2024-12-20', lastActive: '5 days ago', country: 'Japan' },
  { id: 10, name: 'Maria Garcia', email: 'maria.g@example.com', status: 'active', plan: 'Pro', progress: 54, courses: 2, certificates: 1, joined: '2024-09-28', lastActive: '2 hours ago', country: 'Mexico' },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  suspended: 'bg-red-100 text-red-700',
};

const planColors: Record<string, string> = {
  Free: 'bg-gray-100 text-gray-600',
  Pro: 'bg-blue/10 text-blue',
  Enterprise: 'bg-coral/10 text-coral',
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPlan, setSelectedPlan] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesPlan = selectedPlan === 'all' || user.plan === selectedPlan;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const openUserModal = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">User Management</h1>
          <p className="text-text-secondary text-sm">Manage and monitor all platform users</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral-dark">
            <UserPlus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '50,247', icon: '👥' },
          { label: 'Active Today', value: '3,847', icon: '🟢' },
          { label: 'New This Week', value: '+428', icon: '📈' },
          { label: 'Pro Users', value: '12,400', icon: '⭐' },
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
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
            />
          </div>
          
          {/* Filter Dropdowns */}
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral/20"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral/20"
            >
              <option value="all">All Plans</option>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
            
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
            <div className="flex gap-2 ml-auto">
              <button className="px-3 py-1.5 text-sm bg-blue text-white rounded-lg hover:bg-blue-dark">
                Enroll in Course
              </button>
              <button className="px-3 py-1.5 text-sm bg-coral text-white rounded-lg hover:bg-coral-dark">
                Grant Certificate
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                Suspend
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={selectAll}
                    className="rounded border-gray-300 text-coral focus:ring-coral"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Courses</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Active</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-gray-300 text-coral focus:ring-coral"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-blue text-sm font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'active' ? 'bg-green-500' :
                        user.status === 'inactive' ? 'bg-gray-400' :
                        'bg-red-500'
                      }`} />
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${planColors[user.plan]}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-coral rounded-full" style={{ width: `${user.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm">
                      <BookOpen size={14} className="text-gray-400" />
                      {user.courses}
                      {user.certificates > 0 && (
                        <span className="text-coral">• {user.certificates} 🏆</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.joined}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.lastActive}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => openUserModal(user)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                        title="View Details"
                      >
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Send Email">
                        <Mail size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="More Actions">
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">50,247</span> users
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 bg-coral text-white rounded-lg text-sm font-medium">1</button>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">2</button>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">502</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="font-display font-bold text-lg">User Details</h3>
              <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              {/* User Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl">{selectedUser.name}</h4>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedUser.status]}`}>
                      {selectedUser.status}
                    </span>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${planColors[selectedUser.plan]}`}>
                      {selectedUser.plan}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="font-display font-bold text-lg">{selectedUser.progress}%</p>
                  <p className="text-xs text-gray-500">Overall Progress</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="font-display font-bold text-lg">{selectedUser.courses}</p>
                  <p className="text-xs text-gray-500">Courses</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="font-display font-bold text-lg">{selectedUser.certificates}</p>
                  <p className="text-xs text-gray-500">Certificates</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="font-display font-bold text-lg">{selectedUser.country}</p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue-dark">
                  <BookOpen size={16} />
                  Enroll in Course
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral-dark">
                  <Award size={16} />
                  Grant Certificate
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Ban size={16} />
                  Suspend
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
