import { useState } from 'react';
import { 
  Settings, 
  Palette, 
  Mail, 
  Award,
  Upload,
  CheckCircle,
  Save
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'branding' | 'general' | 'email' | 'certificates'>('branding');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { key: 'branding', label: 'Branding', icon: Palette },
    { key: 'general', label: 'General', icon: Settings },
    { key: 'email', label: 'Email', icon: Mail },
    { key: 'certificates', label: 'Certificates', icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl">Platform Settings</h1>
        <p className="text-text-secondary text-sm">Configure your platform appearance and behavior</p>
      </div>

      {saved && (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} />
          Settings saved successfully!
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === tab.key
                    ? 'bg-coral/10 text-coral border-l-4 border-coral'
                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Branding Tab */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <h2 className="font-display font-semibold text-lg">Branding</h2>
                
                {/* Logo */}
                <div>
                  <label className="block text-sm font-medium mb-3">Platform Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-coral rounded-xl flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">M</span>
                    </div>
                    <div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                        <Upload size={16} />
                        Upload New Logo
                      </button>
                      <p className="text-xs text-gray-500 mt-2">Recommended: 512x512px, PNG or SVG</p>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium mb-3">Brand Colors</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-coral rounded-lg border-2 border-gray-200" />
                        <input 
                          type="text" 
                          defaultValue="#FF4D2E"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Secondary Color</label>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue rounded-lg border-2 border-gray-200" />
                        <input 
                          type="text" 
                          defaultValue="#2F45FF"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Favicon */}
                <div>
                  <label className="block text-sm font-medium mb-3">Favicon</label>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-coral rounded flex items-center justify-center">
                      <span className="text-white text-lg font-bold">M</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                      <Upload size={16} />
                      Upload Favicon
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="font-display font-semibold text-lg">General Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="Masterly AI"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tagline</label>
                  <input
                    type="text"
                    defaultValue="Learn AI. Build Real Projects."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Default Language</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Japanese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Timezone</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                    <option>UTC-08:00 Pacific Time</option>
                    <option>UTC-05:00 Eastern Time</option>
                    <option>UTC+00:00 London</option>
                    <option>UTC+01:00 Central European</option>
                    <option>UTC+09:00 Tokyo</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium">Feature Toggles</label>
                  {[
                    { label: 'Enable user registration', checked: true },
                    { label: 'Enable course reviews', checked: true },
                    { label: 'Enable community features', checked: true },
                    { label: 'Enable certificates', checked: true },
                    { label: 'Maintenance mode', checked: false },
                  ].map((toggle, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-sm">{toggle.label}</span>
                      <div className={`w-11 h-6 rounded-full relative transition-colors ${toggle.checked ? 'bg-coral' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggle.checked ? 'left-6' : 'left-1'}`} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Email Tab */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <h2 className="font-display font-semibold text-lg">Email Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">From Name</label>
                  <input
                    type="text"
                    defaultValue="Masterly AI"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">From Email</label>
                  <input
                    type="email"
                    defaultValue="noreply@masterly.ai"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Reply-To Email</label>
                  <input
                    type="email"
                    defaultValue="support@masterly.ai"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium">Email Templates</label>
                  {[
                    { name: 'Welcome Email', lastEdited: '2 days ago' },
                    { name: 'Course Completion', lastEdited: '1 week ago' },
                    { name: 'Password Reset', lastEdited: '3 weeks ago' },
                    { name: 'Weekly Digest', lastEdited: '5 days ago' },
                  ].map((template, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{template.name}</p>
                        <p className="text-xs text-gray-500">Last edited: {template.lastEdited}</p>
                      </div>
                      <button className="text-coral text-sm hover:underline">Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <h2 className="font-display font-semibold text-lg">Certificate Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Certificate Title</label>
                  <input
                    type="text"
                    defaultValue="Certificate of Completion"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Issuer Name</label>
                  <input
                    type="text"
                    defaultValue="Masterly AI"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Signature</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-500">Upload signature image</p>
                    <p className="text-xs text-gray-400">PNG with transparent background</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Certificate Template</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((template) => (
                      <div 
                        key={template} 
                        className={`border-2 rounded-lg p-4 cursor-pointer ${
                          template === 1 ? 'border-coral bg-coral/5' : 'border-gray-200'
                        }`}
                      >
                        <div className="aspect-[1.4/1] bg-gray-100 rounded mb-2" />
                        <p className="text-sm font-medium text-center">Template {template}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium">Verification Settings</label>
                  {[
                    { label: 'Enable certificate verification', checked: true },
                    { label: 'Show certificate ID', checked: true },
                    { label: 'Allow social sharing', checked: true },
                  ].map((toggle, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-sm">{toggle.label}</span>
                      <div className={`w-11 h-6 rounded-full relative transition-colors ${toggle.checked ? 'bg-coral' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${toggle.checked ? 'left-6' : 'left-1'}`} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-200 mt-6">
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-coral text-white rounded-lg hover:bg-coral-dark"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
