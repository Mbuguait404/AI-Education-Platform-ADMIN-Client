import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { 
  Play, 
  BookOpen, 
  Award, 
  FolderKanban, 
  ArrowRight, 
  TrendingUp,
  Clock,
  Star,
  CheckCircle
} from 'lucide-react';

export default function DashboardHome() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dashboard-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);

  const currentCourse = {
    title: 'AI Fundamentals',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    currentLesson: 'Building Your First Neural Network',
    timeRemaining: '2h 15m',
    image: '/images/course_ai_fundamentals.jpg',
  };

  const stats = [
    { label: 'Courses in Progress', value: '3', icon: BookOpen, color: 'blue' },
    { label: 'Completed Lessons', value: '42', icon: CheckCircle, color: 'coral' },
    { label: 'Certificates Earned', value: '1', icon: Award, color: 'blue' },
    { label: 'Projects Submitted', value: '5', icon: FolderKanban, color: 'coral' },
  ];

  const recommendedLessons = [
    { title: 'Introduction to Neural Networks', duration: '25 min', course: 'AI Fundamentals' },
    { title: 'Advanced Prompt Engineering', duration: '30 min', course: 'Prompt Engineering' },
    { title: 'Building AI Workflows', duration: '40 min', course: 'AI for Business' },
  ];

  const achievements = [
    { title: 'First Steps', desc: 'Completed your first lesson', icon: Star },
    { title: 'Week Streak', desc: '7 days of learning', icon: TrendingUp },
    { title: 'Project Master', desc: 'Submitted 5 projects', icon: Award },
  ];

  return (
    <div ref={headerRef} className="space-y-8">
      {/* Welcome Header */}
      <div className="dashboard-card">
        <h1 className="font-display font-bold text-3xl mb-2">
          Welcome back, Alex! 👋
        </h1>
        <p className="text-text-secondary">
          You are making great progress. Keep up the momentum!
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="dashboard-card bg-white card-border-sm p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
              stat.color === 'coral' ? 'bg-coral/10' : 'bg-blue/10'
            }`}>
              <stat.icon className={stat.color === 'coral' ? 'text-coral' : 'text-blue'} size={20} />
            </div>
            <p className="font-display font-bold text-2xl">{stat.value}</p>
            <p className="text-text-secondary text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Course */}
        <div className="lg:col-span-2 dashboard-card bg-white card-border overflow-hidden">
          <div className="p-6 border-b-2 border-black/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl">Continue Learning</h2>
              <Link 
                to="/dashboard/courses"
                className="text-coral text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                View all courses
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Course Image */}
              <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={currentCourse.image} 
                  alt={currentCourse.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Course Info */}
              <div className="flex-1">
                <h3 className="font-display font-bold text-lg mb-1">{currentCourse.title}</h3>
                <p className="text-text-secondary text-sm mb-4">
                  {currentCourse.completedLessons} of {currentCourse.totalLessons} lessons completed
                </p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-text-secondary">Progress</span>
                    <span className="font-medium">{currentCourse.progress}%</span>
                  </div>
                  <div className="h-2 bg-offwhite rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-coral rounded-full transition-all"
                      style={{ width: `${currentCourse.progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Current Lesson */}
                <div className="flex items-center gap-3 p-3 bg-offwhite rounded-xl mb-4">
                  <Play className="text-coral" size={20} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary">Current lesson</p>
                    <p className="font-medium text-sm truncate">{currentCourse.currentLesson}</p>
                  </div>
                  <span className="text-text-secondary text-sm flex items-center gap-1">
                    <Clock size={14} />
                    {currentCourse.timeRemaining}
                  </span>
                </div>
                
                <Link 
                  to="/dashboard/lesson/1"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Continue Learning
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Achievements */}
        <div className="dashboard-card bg-white card-border p-6">
          <h2 className="font-display font-bold text-xl mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <achievement.icon className="text-coral" size={18} />
                </div>
                <div>
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <p className="text-text-secondary text-xs">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link 
            to="/dashboard/certificates"
            className="mt-6 text-coral text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all achievements
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      
      {/* Recommended & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recommended Lessons */}
        <div className="dashboard-card bg-white card-border p-6">
          <h2 className="font-display font-bold text-xl mb-4">Recommended for You</h2>
          <div className="space-y-3">
            {recommendedLessons.map((lesson, idx) => (
              <Link 
                key={idx}
                to="/dashboard/lesson/1"
                className="flex items-center gap-4 p-4 bg-offwhite rounded-xl hover:bg-black/5 transition-colors"
              >
                <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Play className="text-blue" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{lesson.title}</p>
                  <p className="text-text-secondary text-xs">{lesson.course}</p>
                </div>
                <span className="text-text-secondary text-sm flex items-center gap-1">
                  <Clock size={14} />
                  {lesson.duration}
                </span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="dashboard-card bg-blue card-border p-6 text-white">
          <h2 className="font-display font-bold text-xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/dashboard/courses"
              className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-center"
            >
              <BookOpen className="mx-auto mb-2" size={24} />
              <p className="font-medium text-sm">Browse Courses</p>
            </Link>
            <Link 
              to="/dashboard/projects"
              className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-center"
            >
              <FolderKanban className="mx-auto mb-2" size={24} />
              <p className="font-medium text-sm">View Projects</p>
            </Link>
            <Link 
              to="/dashboard/certificates"
              className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-center"
            >
              <Award className="mx-auto mb-2" size={24} />
              <p className="font-medium text-sm">Certificates</p>
            </Link>
            <Link 
              to="/dashboard/settings"
              className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-center"
            >
              <TrendingUp className="mx-auto mb-2" size={24} />
              <p className="font-medium text-sm">My Progress</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
