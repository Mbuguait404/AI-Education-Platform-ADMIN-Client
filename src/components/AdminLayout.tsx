import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Award, 
  ClipboardCheck,
  Bell,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['content']);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };
  
  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { key: 'overview', label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { key: 'users', label: 'User Management', href: '/admin/users', icon: Users },
    { 
      key: 'content', 
      label: 'Content', 
      icon: BookOpen,
      children: [
        { label: 'Courses', href: '/admin/courses', icon: BookOpen },
        { label: 'Modules & Lessons', href: '/admin/content', icon: FileText },
      ]
    },
    { key: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { key: 'certifications', label: 'Certifications', href: '/admin/certifications', icon: Award },
    { key: 'submissions', label: 'Submissions', href: '/admin/submissions', icon: ClipboardCheck },
    { key: 'notifications', label: 'Notifications', href: '/admin/notifications', icon: Bell },
    { key: 'roles', label: 'Roles & Permissions', href: '/admin/roles', icon: Shield },
    { key: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings },
    { key: 'security', label: 'Security & Logs', href: '/admin/security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">M</span>
            </div>
            <div>
              <span className="font-display font-bold text-black text-sm">Masterly AI</span>
              <span className="block text-[10px] text-text-secondary uppercase tracking-wider">Admin</span>
            </div>
          </Link>
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.key}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      item.children.some(c => isActive(c.href))
                        ? 'bg-coral/10 text-coral'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${expandedMenus.includes(item.key) ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedMenus.includes(item.key) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(child.href)
                              ? 'bg-coral/10 text-coral'
                              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                          }`}
                        >
                          <child.icon size={16} />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-coral/10 text-coral'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
        
        {/* User Section */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-blue rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">SA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Super Admin</p>
              <p className="text-xs text-text-secondary truncate">admin@masterly.ai</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-coral transition-colors mt-2"
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full" />
            </button>
            
            {/* User */}
            <Link 
              to="/admin/settings"
              className="w-9 h-9 bg-blue rounded-full flex items-center justify-center text-white text-sm font-medium"
            >
              SA
            </Link>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
