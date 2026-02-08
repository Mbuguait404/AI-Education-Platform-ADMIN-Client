import { useState } from 'react';
import { 
  Plus, 
  Send, 
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

// Mock notifications data
const mockAnnouncements = [
  { 
    id: 1, 
    title: 'New Course: Advanced LLM Fine-tuning', 
    content: 'We are excited to announce our newest course on fine-tuning large language models. Enroll now!',
    type: 'all',
    status: 'sent',
    sentAt: '2025-01-15 09:30',
    recipients: 50247,
    openRate: 34.2
  },
  { 
    id: 2, 
    title: 'Platform Maintenance Scheduled', 
    content: 'We will be performing scheduled maintenance on Jan 20, 2025 from 2-4 AM UTC.',
    type: 'all',
    status: 'scheduled',
    scheduledFor: '2025-01-19 18:00',
    recipients: 50247,
    openRate: 0
  },
  { 
    id: 3, 
    title: 'Complete Your AI Fundamentals Course', 
    content: 'You are 80% through the course. Keep going to earn your certificate!',
    type: 'course',
    targetCourse: 'AI Fundamentals',
    status: 'sent',
    sentAt: '2025-01-14 14:00',
    recipients: 1247,
    openRate: 52.8
  },
  { 
    id: 4, 
    title: 'Weekly Learning Tips', 
    content: 'Here are this week top tips for maximizing your AI learning journey.',
    type: 'all',
    status: 'draft',
    recipients: 0,
    openRate: 0
  },
];

const notificationHistory = [
  { id: 1, user: 'Sarah Chen', action: 'opened', announcement: 'New Course: Advanced LLM Fine-tuning', time: '2 min ago' },
  { id: 2, user: 'Marcus Johnson', action: 'clicked', announcement: 'New Course: Advanced LLM Fine-tuning', time: '5 min ago' },
  { id: 3, user: 'Elena Rodriguez', action: 'opened', announcement: 'Complete Your AI Fundamentals Course', time: '12 min ago' },
  { id: 4, user: 'David Kim', action: 'dismissed', announcement: 'Platform Maintenance Scheduled', time: '18 min ago' },
  { id: 5, user: 'Priya Patel', action: 'opened', announcement: 'New Course: Advanced LLM Fine-tuning', time: '25 min ago' },
];

export default function AdminNotifications() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'announcements' | 'history' | 'templates'>('announcements');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Notifications & Communication</h1>
          <p className="text-text-secondary text-sm">Send announcements and manage user communications</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg text-sm hover:bg-coral-dark"
        >
          <Plus size={16} />
          New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent', value: '156', icon: '📨' },
          { label: 'Avg Open Rate', value: '42.3%', icon: '👁️' },
          { label: 'Scheduled', value: '3', icon: '⏰' },
          { label: 'Drafts', value: '5', icon: '📝' },
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
        {[
          { key: 'announcements', label: 'Announcements' },
          { key: 'history', label: 'History' },
          { key: 'templates', label: 'Templates' },
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

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {mockAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-semibold">{announcement.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      announcement.status === 'sent' ? 'bg-green-100 text-green-700' :
                      announcement.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                    </span>
                    {announcement.type === 'course' && (
                      <span className="px-2 py-0.5 bg-blue/10 text-blue rounded-full text-xs font-medium">
                        Course: {announcement.targetCourse}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {announcement.status === 'sent' && (
                      <>
                        <span className="flex items-center gap-1">
                          <Send size={12} />
                          Sent {announcement.sentAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {announcement.recipients.toLocaleString()} recipients
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle size={12} />
                          {announcement.openRate}% opened
                        </span>
                      </>
                    )}
                    {announcement.status === 'scheduled' && (
                      <>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          Scheduled for {announcement.scheduledFor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {announcement.recipients.toLocaleString()} recipients
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit2 size={16} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Trash2 size={16} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-display font-semibold">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {notificationHistory.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                <div className="w-8 h-8 bg-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-blue text-xs font-bold">
                    {item.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{item.user}</span>
                    {' '}{item.action}{' '}
                    <span className="text-coral">{item.announcement}</span>
                  </p>
                </div>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Welcome Email', type: 'Email', lastUsed: '2 days ago' },
            { name: 'Course Completion', type: 'In-app + Email', lastUsed: '1 week ago' },
            { name: 'Weekly Digest', type: 'Email', lastUsed: '3 days ago' },
            { name: 'Re-engagement', type: 'Email', lastUsed: '2 weeks ago' },
            { name: 'New Course Alert', type: 'In-app', lastUsed: '5 days ago' },
            { name: 'Certificate Earned', type: 'Email', lastUsed: '1 day ago' },
          ].map((template, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-gray-500">{template.type}</p>
                  <p className="text-xs text-gray-400 mt-1">Last used: {template.lastUsed}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit2 size={16} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Send size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="font-display font-bold text-lg">Create Announcement</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter announcement title"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  rows={4}
                  placeholder="Enter announcement content..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Audience</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="all">All Users</option>
                    <option value="course">Specific Course</option>
                    <option value="plan">Plan Type</option>
                    <option value="inactive">Inactive Users</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Method</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="both">Email + In-app</option>
                    <option value="email">Email Only</option>
                    <option value="inapp">In-app Only</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Schedule</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="schedule" defaultChecked className="text-coral" />
                    <span className="text-sm">Send immediately</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="schedule" className="text-coral" />
                    <span className="text-sm">Schedule for later</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-coral text-white rounded-lg text-sm flex items-center gap-2">
                <Send size={16} />
                Send Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
