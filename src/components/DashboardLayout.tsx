import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderKanban, 
  Award, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  User
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  
  const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Certificates', href: '/dashboard/certificates', icon: Award },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-offwhite flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r-[3px] border-black transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b-[3px] border-black">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-black text-lg">
              Masterly AI
            </span>
          </Link>
          <button 
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* User Info */}
        <div className="p-6 border-b-[3px] border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div>
              <p className="font-display font-semibold text-black">Alex Johnson</p>
              <p className="text-text-secondary text-sm">Pro Member</p>
            </div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(link.href)
                  ? 'bg-blue text-white'
                  : 'text-black hover:bg-black/5'
              }`}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.name}</span>
              {isActive(link.href) && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </Link>
          ))}
        </nav>
        
        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-[3px] border-black">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-coral transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Log out</span>
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b-[3px] border-black flex items-center justify-between px-6">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <Link 
              to="/dashboard/settings"
              className="w-10 h-10 rounded-full bg-offwhite flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <User size={20} />
            </Link>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
