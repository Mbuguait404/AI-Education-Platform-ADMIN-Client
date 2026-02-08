import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Star
} from 'lucide-react';

const enrolledCourses = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description: 'Master the basics of AI and machine learning',
    image: '/images/course_ai_fundamentals.jpg',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    lastAccessed: '2 hours ago',
    status: 'in-progress',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'Learn to craft powerful prompts for AI models',
    image: '/images/course_prompt_engineering.jpg',
    progress: 30,
    totalLessons: 18,
    completedLessons: 5,
    lastAccessed: '1 day ago',
    status: 'in-progress',
  },
  {
    id: 'ai-for-freelancers',
    title: 'AI for Freelancers',
    description: 'Supercharge your freelance career with AI',
    image: '/images/course_freelancers.jpg',
    progress: 0,
    totalLessons: 30,
    completedLessons: 0,
    lastAccessed: 'Not started',
    status: 'not-started',
  },
];

const completedCourses = [
  {
    id: 'ai-basics',
    title: 'AI Basics Workshop',
    description: 'Introduction to AI concepts',
    image: '/images/hero_certificate.jpg',
    completedDate: 'Dec 15, 2024',
    certificate: true,
  },
];

export default function DashboardCourses() {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filteredCourses = () => {
    switch (activeTab) {
      case 'in-progress':
        return enrolledCourses.filter(c => c.status === 'in-progress');
      case 'completed':
        return completedCourses;
      default:
        return [...enrolledCourses, ...completedCourses];
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">My Courses</h1>
        <p className="text-text-secondary">
          Manage your learning journey and track your progress
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-black/10">
        {[
          { key: 'all', label: 'All Courses', count: enrolledCourses.length + completedCourses.length },
          { key: 'in-progress', label: 'In Progress', count: enrolledCourses.filter(c => c.status === 'in-progress').length },
          { key: 'completed', label: 'Completed', count: completedCourses.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-coral text-coral'
                : 'border-transparent text-text-secondary hover:text-black'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.key ? 'bg-coral/10' : 'bg-offwhite'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
      
      {/* Course Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCourses().map((course) => (
          <div key={course.id} className="bg-white card-border overflow-hidden">
            {/* Image */}
            <div className="relative h-40">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              {'progress' in course && course.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                  <div 
                    className="h-full bg-coral"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              )}
              {'certificate' in course && course.certificate && (
                <div className="absolute top-4 right-4 bg-coral text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star size={12} />
                  Certified
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h3 className="font-display font-bold text-lg mb-1">{course.title}</h3>
              <p className="text-text-secondary text-sm mb-4">{course.description}</p>
              
              {'progress' in course ? (
                <>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-text-secondary flex items-center gap-1">
                      <CheckCircle size={14} />
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                    <span className="text-text-secondary flex items-center gap-1">
                      <Clock size={14} />
                      {course.lastAccessed}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/dashboard/lesson/1`}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                      course.progress > 0
                        ? 'bg-coral text-white hover:bg-coral-dark'
                        : 'bg-offwhite text-black hover:bg-black/5'
                    }`}
                  >
                    {course.progress > 0 ? (
                      <>
                        <Play size={18} />
                        Continue
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        Start Course
                      </>
                    )}
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <CheckCircle size={14} className="text-green-500" />
                    Completed on {course.completedDate}
                  </div>
                  <div className="flex gap-3">
                    <Link 
                      to="/dashboard/certificates"
                      className="flex-1 bg-coral text-white px-4 py-3 rounded-xl font-medium text-center hover:bg-coral-dark transition-colors"
                    >
                      View Certificate
                    </Link>
                    <Link 
                      to={`/dashboard/lesson/1`}
                      className="px-4 py-3 border-2 border-black rounded-xl font-medium hover:bg-offwhite transition-colors"
                    >
                      Review
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Browse More */}
      <div className="bg-blue card-border p-8 text-center text-white">
        <h2 className="font-display font-bold text-2xl mb-2">Want to learn more?</h2>
        <p className="text-white/80 mb-6">
          Explore our full catalog of AI courses and expand your skills
        </p>
        <Link 
          to="/courses"
          className="inline-flex items-center gap-2 bg-coral text-white font-semibold px-6 py-3 rounded-full hover:-translate-y-0.5 transition-all"
        >
          Browse All Courses
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
