import { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Lock,
  User,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Globe,
  Monitor
} from 'lucide-react';

// Mock security logs
const mockLogs = [
  { id: 1, user: 'Alex Johnson', action: 'Login', ip: '192.168.1.1', location: 'San Francisco, US', device: 'Chrome / MacOS', timestamp: '2025-01-15 14:32:15', status: 'success' },
  { id: 2, user: 'Sarah Chen', action: 'Course Updated', ip: '192.168.1.45', location: 'New York, US', device: 'Firefox / Windows', timestamp: '2025-01-15 14:28:42', status: 'success' },
  { id: 3, user: 'Unknown', action: 'Failed Login', ip: '203.45.67.89', location: 'Beijing, CN', device: 'Chrome / Windows', timestamp: '2025-01-15 14:25:10', status: 'failed' },
  { id: 4, user: 'Marcus Williams', action: 'User Deleted', ip: '192.168.1.23', location: 'London, UK', device: 'Safari / MacOS', timestamp: '2025-01-15 14:20:33', status: 'success' },
  { id: 5, user: 'Emily Davis', action: 'Settings Changed', ip: '192.168.1.67', location: 'Toronto, CA', device: 'Chrome / Windows', timestamp: '2025-01-15 14:15:22', status: 'success' },
  { id: 6, user: 'Unknown', action: 'Failed Login', ip: '185.22.67.123', location: 'Moscow, RU', device: 'Firefox / Linux', timestamp: '2025-01-15 14:10:05', status: 'failed' },
  { id: 7, user: 'Michael Brown', action: 'Certificate Issued', ip: '192.168.1.89', location: 'Sydney, AU', device: 'Chrome / MacOS', timestamp: '2025-01-15 14:05:47', status: 'success' },
  { id: 8, user: 'Alex Johnson', action: 'Logout', ip: '192.168.1.1', location: 'San Francisco, US', device: 'Chrome / MacOS', timestamp: '2025-01-15 13:58:12', status: 'success' },
];

const loginHistory = [
  { id: 1, user: 'Alex Johnson', email: 'alex@masterly.ai', time: '2 hours ago', ip: '192.168.1.1', device: 'Chrome on macOS', location: 'San Francisco, CA' },
  { id: 2, user: 'Sarah Chen', email: 'sarah@masterly.ai', time: '3 hours ago', ip: '192.168.1.45', device: 'Firefox on Windows', location: 'New York, NY' },
  { id: 3, user: 'Marcus Williams', email: 'marcus@masterly.ai', time: '5 hours ago', ip: '192.168.1.23', device: 'Safari on macOS', location: 'London, UK' },
  { id: 4, user: 'Emily Davis', email: 'emily@masterly.ai', time: '6 hours ago', ip: '192.168.1.67', device: 'Chrome on Windows', location: 'Toronto, Canada' },
];

export default function AdminSecurity() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'logs' | 'login' | 'settings'>('logs');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.ip.includes(searchQuery);
    const matchesAction = selectedAction === 'all' || log.action.toLowerCase().includes(selectedAction.toLowerCase());
    return matchesSearch && matchesAction;
  });

  const tabs = [
    { key: 'logs', label: 'Activity Logs' },
    { key: 'login', label: 'Login History' },
    { key: 'settings', label: 'Security Settings' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Security & Logs</h1>
          <p className="text-text-secondary text-sm">Monitor platform activity and security</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download size={16} />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: '45,892', icon: '📊' },
          { label: 'Failed Logins', value: '127', icon: '⚠️' },
          { label: 'Active Sessions', value: '342', icon: '👥' },
          { label: 'Security Alerts', value: '3', icon: '🚨' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className="font-display font-bold text-xl">{stat.value}</p>
            <p className="text-text-secondary text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-coral shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activity Logs Tab */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search logs by user, action, or IP..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="all">All Actions</option>
                  <option value="login">Login</option>
                  <option value="update">Updates</option>
                  <option value="delete">Deletions</option>
                </select>
                
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Filter size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">IP Address</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Device</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-blue/10 rounded-full flex items-center justify-center">
                            <User size={14} className="text-blue" />
                          </div>
                          <span className="text-sm">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{log.action}</td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{log.ip}</code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Globe size={12} />
                          {log.location}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Monitor size={12} />
                          {log.device}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{log.timestamp}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {log.status === 'success' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">45,892</span> events
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
        </div>
      )}

      {/* Login History Tab */}
      {activeTab === 'login' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-display font-semibold">Recent Login Activity</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {loginHistory.map((login) => (
              <div key={login.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                <div className="w-10 h-10 bg-blue/10 rounded-full flex items-center justify-center">
                  <User size={18} className="text-blue" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{login.user}</p>
                  <p className="text-xs text-gray-500">{login.email}</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{login.device}</p>
                  <p className="text-xs text-gray-400">{login.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{login.time}</p>
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{login.ip}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <h2 className="font-display font-semibold text-lg">Security Settings</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Lock size={20} className="text-gray-500" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-coral rounded-full relative">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-gray-500" />
                  <div>
                    <p className="font-medium">Password Policy</p>
                    <p className="text-sm text-gray-500">Minimum 8 characters, 1 uppercase, 1 number</p>
                  </div>
                </div>
                <button className="text-coral text-sm">Configure</button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-gray-500" />
                  <div>
                    <p className="font-medium">Failed Login Attempts</p>
                    <p className="text-sm text-gray-500">Lock account after 5 failed attempts</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-coral rounded-full relative">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-gray-500" />
                  <div>
                    <p className="font-medium">IP Whitelist</p>
                    <p className="text-sm text-gray-500">Restrict admin access to specific IPs</p>
                  </div>
                </div>
                <button className="text-coral text-sm">Manage</button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Settings size={20} className="text-gray-500" />
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-gray-500">Auto-logout after 30 minutes of inactivity</p>
                  </div>
                </div>
                <select className="px-3 py-1 border border-gray-200 rounded text-sm">
                  <option>15 minutes</option>
                  <option selected>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral-dark">
              Save Security Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
