import { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Edit2, 
  Trash2, 
  XCircle,
  Users,
  BookOpen,
  BarChart3,
  Award,
  Settings
} from 'lucide-react';

// Mock roles data
const mockRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all platform features and settings',
    users: 2,
    color: 'bg-coral',
    permissions: {
      users: { read: true, write: true, delete: true },
      courses: { read: true, write: true, delete: true },
      content: { read: true, write: true, delete: true },
      analytics: { read: true, write: true, export: true },
      certifications: { read: true, write: true, revoke: true },
      settings: { read: true, write: true },
    }
  },
  {
    id: 2,
    name: 'Content Admin',
    description: 'Manage courses, lessons, and content',
    users: 5,
    color: 'bg-blue',
    permissions: {
      users: { read: true, write: false, delete: false },
      courses: { read: true, write: true, delete: true },
      content: { read: true, write: true, delete: true },
      analytics: { read: true, write: false, export: true },
      certifications: { read: true, write: false, revoke: false },
      settings: { read: false, write: false },
    }
  },
  {
    id: 3,
    name: 'Instructor',
    description: 'Create and manage their own courses',
    users: 12,
    color: 'bg-green-500',
    permissions: {
      users: { read: true, write: false, delete: false },
      courses: { read: true, write: true, delete: false },
      content: { read: true, write: true, delete: false },
      analytics: { read: true, write: false, export: false },
      certifications: { read: true, write: false, revoke: false },
      settings: { read: false, write: false },
    }
  },
  {
    id: 4,
    name: 'Support',
    description: 'Help users and view basic information',
    users: 8,
    color: 'bg-yellow-500',
    permissions: {
      users: { read: true, write: true, delete: false },
      courses: { read: true, write: false, delete: false },
      content: { read: true, write: false, delete: false },
      analytics: { read: false, write: false, export: false },
      certifications: { read: true, write: false, revoke: false },
      settings: { read: false, write: false },
    }
  },
  {
    id: 5,
    name: 'Analyst',
    description: 'View analytics and generate reports',
    users: 3,
    color: 'bg-purple-500',
    permissions: {
      users: { read: true, write: false, delete: false },
      courses: { read: true, write: false, delete: false },
      content: { read: true, write: false, delete: false },
      analytics: { read: true, write: false, export: true },
      certifications: { read: true, write: false, revoke: false },
      settings: { read: false, write: false },
    }
  },
];

const mockUsers = [
  { id: 1, name: 'Alex Johnson', email: 'alex@masterly.ai', role: 'Super Admin', lastActive: '2 min ago' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@masterly.ai', role: 'Content Admin', lastActive: '1 hour ago' },
  { id: 3, name: 'Marcus Williams', email: 'marcus@masterly.ai', role: 'Instructor', lastActive: '3 hours ago' },
  { id: 4, name: 'Emily Davis', email: 'emily@masterly.ai', role: 'Support', lastActive: '5 min ago' },
  { id: 5, name: 'Michael Brown', email: 'michael@masterly.ai', role: 'Analyst', lastActive: '1 day ago' },
];

export default function AdminRoles() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<typeof mockRoles[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'roles' | 'users'>('roles');

  const openRoleModal = (role?: typeof mockRoles[0]) => {
    setSelectedRole(role || null);
    setShowRoleModal(true);
  };

  const permissionSections = [
    { key: 'users', label: 'User Management', icon: Users },
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'content', label: 'Content', icon: BookOpen },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'certifications', label: 'Certifications', icon: Award },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Roles & Permissions</h1>
          <p className="text-text-secondary text-sm">Manage team access and permissions</p>
        </div>
        <button 
          onClick={() => openRoleModal()}
          className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg text-sm hover:bg-coral-dark"
        >
          <Plus size={16} />
          Create Role
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'roles', label: 'Roles' },
          { key: 'users', label: 'Team Members' },
        ].map((tab) => (
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

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRoles.map((role) => (
            <div key={role.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${role.color} rounded-lg flex items-center justify-center`}>
                  <Shield className="text-white" size={20} />
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => openRoleModal(role)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 size={16} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Trash2 size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <h3 className="font-display font-semibold text-lg mb-1">{role.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{role.description}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Users size={16} />
                {role.users} users
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase">Permissions</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(role.permissions)
                    .filter(([_, perms]) => perms.read || perms.write)
                    .slice(0, 4)
                    .map(([key]) => (
                      <span key={key} className="px-2 py-1 bg-gray-100 rounded text-xs capitalize">
                        {key}
                      </span>
                    ))}
                  {Object.entries(role.permissions).filter(([_, perms]) => perms.read || perms.write).length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      +{Object.entries(role.permissions).filter(([_, perms]) => perms.read || perms.write).length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Role Card */}
          <button 
            onClick={() => openRoleModal()}
            className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center text-gray-500 hover:border-coral hover:text-coral transition-colors"
          >
            <Plus size={32} className="mb-2" />
            <span className="font-medium">Create New Role</span>
          </button>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-display font-semibold">Team Members</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-coral text-white rounded-lg text-sm">
              <Plus size={14} />
              Invite User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Active</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
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
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.lastActive}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                          <Edit2 size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                          <Trash2 size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="font-display font-bold text-lg">
                {selectedRole ? 'Edit Role' : 'Create New Role'}
              </h3>
              <button onClick={() => setShowRoleModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Role Name</label>
                <input
                  type="text"
                  defaultValue={selectedRole?.name}
                  placeholder="e.g., Content Manager"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  rows={2}
                  defaultValue={selectedRole?.description}
                  placeholder="Describe what this role can do..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">Permissions</label>
                <div className="space-y-3">
                  {permissionSections.map((section) => (
                    <div key={section.key} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <section.icon size={16} className="text-gray-500" />
                        <span className="font-medium text-sm">{section.label}</span>
                      </div>
                      <div className="flex gap-4 ml-6">
                        <label className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            defaultChecked={selectedRole?.permissions[section.key as keyof typeof selectedRole.permissions]?.read}
                            className="rounded text-coral"
                          />
                          <span className="text-sm">View</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            defaultChecked={selectedRole?.permissions[section.key as keyof typeof selectedRole.permissions]?.write}
                            className="rounded text-coral"
                          />
                          <span className="text-sm">Edit</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            defaultChecked={(selectedRole?.permissions[section.key as keyof typeof selectedRole.permissions] as any)?.delete}
                            className="rounded text-coral"
                          />
                          <span className="text-sm">Delete</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200">
              <button 
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-coral text-white rounded-lg text-sm">
                {selectedRole ? 'Save Changes' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
