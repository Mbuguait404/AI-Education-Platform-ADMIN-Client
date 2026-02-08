import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Public Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CertificationPage from './pages/CertificationPage';
import CareersPage from './pages/CareersPage';
import TestimonialsPage from './pages/TestimonialsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OnboardingPage from './pages/OnboardingPage';

// Student Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import DashboardCourses from './pages/dashboard/DashboardCourses';
import LessonPlayer from './pages/dashboard/LessonPlayer';
import DashboardProjects from './pages/dashboard/DashboardProjects';
import DashboardCertificates from './pages/dashboard/DashboardCertificates';
import DashboardSettings from './pages/dashboard/DashboardSettings';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminContent from './pages/admin/AdminContent';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminCertifications from './pages/admin/AdminCertifications';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminRoles from './pages/admin/AdminRoles';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSecurity from './pages/admin/AdminSecurity';

// Components
import Navigation from './components/Navigation';
import DashboardLayout from './components/DashboardLayout';
import AdminLayout from './components/AdminLayout';
import Footer from './components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-offwhite">
        {/* Grain overlay */}
        <div className="grain-overlay" />
        
        <Routes>
          {/* Public Routes with Navigation */}
          <Route path="/" element={<><Navigation /><HomePage /><Footer /></>} />
          <Route path="/courses" element={<><Navigation /><CoursesPage /><Footer /></>} />
          <Route path="/courses/:courseId" element={<><Navigation /><CourseDetailPage /><Footer /></>} />
          <Route path="/certification" element={<><Navigation /><CertificationPage /><Footer /></>} />
          <Route path="/careers" element={<><Navigation /><CareersPage /><Footer /></>} />
          <Route path="/testimonials" element={<><Navigation /><TestimonialsPage /><Footer /></>} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          
          {/* Student Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
          <Route path="/dashboard/courses" element={<DashboardLayout><DashboardCourses /></DashboardLayout>} />
          <Route path="/dashboard/lesson/:lessonId" element={<DashboardLayout><LessonPlayer /></DashboardLayout>} />
          <Route path="/dashboard/projects" element={<DashboardLayout><DashboardProjects /></DashboardLayout>} />
          <Route path="/dashboard/certificates" element={<DashboardLayout><DashboardCertificates /></DashboardLayout>} />
          <Route path="/dashboard/settings" element={<DashboardLayout><DashboardSettings /></DashboardLayout>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminOverview /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
          <Route path="/admin/courses" element={<AdminLayout><AdminCourses /></AdminLayout>} />
          <Route path="/admin/content" element={<AdminLayout><AdminContent /></AdminLayout>} />
          <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
          <Route path="/admin/certifications" element={<AdminLayout><AdminCertifications /></AdminLayout>} />
          <Route path="/admin/submissions" element={<AdminLayout><AdminSubmissions /></AdminLayout>} />
          <Route path="/admin/notifications" element={<AdminLayout><AdminNotifications /></AdminLayout>} />
          <Route path="/admin/roles" element={<AdminLayout><AdminRoles /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
          <Route path="/admin/security" element={<AdminLayout><AdminSecurity /></AdminLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
