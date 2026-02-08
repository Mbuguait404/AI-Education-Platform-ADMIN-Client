import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Copy, 
  Eye, 
  CheckCircle,
  Clock,
  BarChart,
  Filter,
  X
} from 'lucide-react';

// Mock course data
const mockCourses = [
  { 
    id: 1, 
    title: 'AI Fundamentals', 
    description: 'Master the basics of AI and machine learning',
    status: 'published', 
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 24,
    students: 1247,
    completionRate: 68,
    revenue: 28400,
    image: '/images/course_ai_fundamentals.jpg',
    lastUpdated: '2025-01-10',
    category: 'Core'
  },
  { 
    id: 2, 
    title: 'Prompt Engineering', 
    description: 'Learn to craft powerful prompts for AI models',
    status: 'published', 
    level: 'Intermediate',
    duration: '3 weeks',
    lessons: 18,
    students: 892,
    completionRate: 72,
    revenue: 19500,
    image: '/images/course_prompt_engineering.jpg',
    lastUpdated: '2025-01-08',
    category: 'Skills'
  },
  { 
    id: 3, 
    title: 'AI for Freelancers', 
    description: 'Supercharge your freelance career with AI tools',
    status: 'published', 
    level: 'All Levels',
    duration: '5 weeks',
    lessons: 30,
    students: 654,
    completionRate: 55,
    revenue: 15200,
    image: '/images/course_freelancers.jpg',
    lastUpdated: '2025-01-05',
    category: 'Career'
  },
  { 
    id: 4, 
    title: 'AI for Business & Automation', 
    description: 'Transform business operations with AI',
    status: 'draft', 
    level: 'Advanced',
    duration: '6 weeks',
    lessons: 36,
    students: 0,
    completionRate: 0,
    revenue: 0,
    image: '/images/course_business.jpg',
    lastUpdated: '2025-01-12',
    category: 'Business'
  },
  { 
    id: 5, 
    title: 'Advanced LLM Fine-tuning', 
    description: 'Deep dive into fine-tuning large language models',
    status: 'review', 
    level: 'Expert',
    duration: '8 weeks',
    lessons: 48,
    students: 0,
    completionRate: 0,
    revenue: 0,
    image: '/images/build_workspace.jpg',
    lastUpdated: '2025-01-11',
    category: 'Advanced'
  },
];

const statusColors: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  review: 'bg-yellow-100 text-yellow-700',
  archived: 'bg-red-100 text-red-700',
};

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-orange-100 text-orange-700',
  Expert: 'bg-red-100 text-red-700',
  'All Levels': 'bg-blue/10 text-blue',
};

export default function AdminCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<typeof mockCourses[0] | null>(null);

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const openCreateModal = () => {
    setEditingCourse(null);
    setShowCourseModal(true);
  };

  const openEditModal = (course: typeof mockCourses[0]) => {
    setEditingCourse(course);
    setShowCourseModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Course Management</h1>
          <p className="text-text-secondary text-sm">Create, edit, and manage all courses</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral-dark"
        >
          <Plus size={16} />
          Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Courses', value: '24', color: 'blue' },
          { label: 'Published', value: '18', color: 'green' },
          { label: 'In Review', value: '3', color: 'yellow' },
          { label: 'Drafts', value: '3', color: 'gray' },
          { label: 'Total Students', value: '12.4K', color: 'coral' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="font-display font-bold text-xl">{stat.value}</p>
            <p className="text-text-secondary text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="review">In Review</option>
            </select>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[course.status]}`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <button 
                    onClick={() => openEditModal(course)}
                    className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                    <Copy size={14} />
                  </button>
                  <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
                  {course.level}
                </span>
                <span className="text-xs text-gray-500">{course.category}</span>
              </div>
              
              <h3 className="font-display font-semibold text-lg mb-1">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{course.description}</p>
              
              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart size={14} />
                  {course.lessons} lessons
                </span>
              </div>
              
              {course.status === 'published' && (
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="font-semibold text-sm">{course.students.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">{course.completionRate}%</p>
                    <p className="text-xs text-gray-500">Complete</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">${(course.revenue / 1000).toFixed(1)}k</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
              )}
              
              {course.status !== 'published' && (
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-coral text-white rounded-lg text-sm">
                    <CheckCircle size={14} />
                    Publish
                  </button>
                  <button className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <Eye size={14} />
                    Preview
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="font-display font-bold text-lg">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h3>
              <button onClick={() => setShowCourseModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Course Title</label>
                <input
                  type="text"
                  defaultValue={editingCourse?.title}
                  placeholder="Enter course title"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  rows={3}
                  defaultValue={editingCourse?.description}
                  placeholder="Enter course description"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 resize-none"
                />
              </div>
              
              {/* Two Column */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <select 
                    defaultValue={editingCourse?.level}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                    <option>All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20">
                    <option>Core</option>
                    <option>Skills</option>
                    <option>Career</option>
                    <option>Business</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              
              {/* Duration & Lessons */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    defaultValue={editingCourse?.duration}
                    placeholder="e.g., 4 weeks"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Total Lessons</label>
                  <input
                    type="number"
                    defaultValue={editingCourse?.lessons}
                    placeholder="24"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                  />
                </div>
              </div>
              
              {/* Outcomes */}
              <div>
                <label className="block text-sm font-medium mb-2">Learning Outcomes</label>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Outcome ${i}`}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                    />
                  ))}
                </div>
              </div>
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Course Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Plus size={24} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200">
              <button 
                onClick={() => setShowCourseModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral-dark">
                {editingCourse ? 'Save Changes' : 'Create Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
