import { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  Globe, 
  Camera,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications' | 'billing'>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'password', label: 'Password', icon: Lock },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Settings</h1>
        <p className="text-text-secondary">
          Manage your account preferences and settings
        </p>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white card-border overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors ${
                  activeTab === tab.key
                    ? 'bg-coral/10 text-coral border-l-4 border-coral'
                    : 'hover:bg-offwhite border-l-4 border-transparent'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white card-border p-6">
            {saved && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl flex items-center gap-2">
                <CheckCircle size={18} />
                Changes saved successfully!
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="font-display font-bold text-xl">Profile Information</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    AJ
                  </div>
                  <div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-offwhite rounded-lg font-medium text-sm hover:bg-black/5 transition-colors">
                      <Camera size={16} />
                      Change Photo
                    </button>
                    <p className="text-text-secondary text-xs mt-2">
                      JPG, GIF or PNG. Max size 2MB
                    </p>
                  </div>
                </div>
                
                {/* Form */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Alex"
                      className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Johnson"
                      className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input
                        type="email"
                        defaultValue="alex.johnson@example.com"
                        className="w-full pl-10 pr-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="AI enthusiast and lifelong learner. Currently studying machine learning and prompt engineering."
                    className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors resize-none"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input
                        type="text"
                        defaultValue="San Francisco, CA"
                        className="w-full pl-10 pr-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <input
                      type="url"
                      defaultValue="https://alexjohnson.dev"
                      className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'password' && (
              <div className="space-y-6">
                <h2 className="font-display font-bold text-xl">Change Password</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none focus:border-coral transition-colors"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-offwhite rounded-xl">
                  <p className="text-sm font-medium mb-2">Password requirements:</p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      One uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      One number
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      One special character
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="font-display font-bold text-xl">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'course', label: 'Course Updates', desc: 'New lessons, assignments, and announcements', default: true },
                    { key: 'email', label: 'Email Notifications', desc: 'Weekly progress reports and tips', default: true },
                    { key: 'community', label: 'Community Activity', desc: 'Replies to your posts and mentions', default: false },
                    { key: 'marketing', label: 'Marketing & Promotions', desc: 'Special offers and new courses', default: false },
                    { key: 'reminders', label: 'Learning Reminders', desc: 'Daily reminders to keep you on track', default: true },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-offwhite rounded-xl">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-text-secondary text-sm">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked={item.default}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="font-display font-bold text-xl">Billing & Subscription</h2>
                
                {/* Current Plan */}
                <div className="p-6 bg-blue text-white rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/70 text-sm">Current Plan</p>
                      <p className="font-display font-bold text-2xl">Pro Membership</p>
                    </div>
                    <div className="px-3 py-1 bg-coral rounded-full text-sm font-medium">
                      Active
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">
                    $29/month • Renews on Feb 15, 2025
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/10 rounded-lg font-medium text-sm hover:bg-white/20 transition-colors">
                      Change Plan
                    </button>
                    <button className="px-4 py-2 bg-white/10 rounded-lg font-medium text-sm hover:bg-white/20 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div>
                  <h3 className="font-display font-semibold mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 border-2 border-black/10 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-blue rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-text-secondary text-sm">Expires 12/26</p>
                      </div>
                    </div>
                    <button className="text-coral font-medium text-sm">
                      Update
                    </button>
                  </div>
                </div>
                
                {/* Billing History */}
                <div>
                  <h3 className="font-display font-semibold mb-4">Billing History</h3>
                  <div className="space-y-2">
                    {[
                      { date: 'Jan 15, 2025', amount: '$29.00', status: 'Paid' },
                      { date: 'Dec 15, 2024', amount: '$29.00', status: 'Paid' },
                      { date: 'Nov 15, 2024', amount: '$29.00', status: 'Paid' },
                    ].map((invoice, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-offwhite rounded-xl">
                        <div>
                          <p className="font-medium">Pro Membership</p>
                          <p className="text-text-secondary text-sm">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                          <p className="text-green-600 text-sm">{invoice.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button */}
            <div className="pt-6 border-t border-black/10">
              <button 
                onClick={handleSave}
                className="btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
