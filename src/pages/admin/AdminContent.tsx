import { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  GripVertical,
  Edit2,
  Eye,
  MoreHorizontal,
  Video,
  FileText,
  Code,
  CheckCircle,
  Clock,
  Save,
  X,
  Copy,
  History
} from 'lucide-react';

// Mock course content data
const courseContent = {
  id: 1,
  title: 'AI Fundamentals',
  modules: [
    {
      id: 1,
      title: 'Week 1: Introduction to AI',
      lessons: [
        { id: 101, title: 'What is Artificial Intelligence?', type: 'video', duration: '15 min', status: 'published', views: 2847 },
        { id: 102, title: 'History and Evolution of AI', type: 'video', duration: '20 min', status: 'published', views: 2654 },
        { id: 103, title: 'Types of AI: Narrow vs General', type: 'video', duration: '18 min', status: 'published', views: 2432 },
        { id: 104, title: 'Setting Up Your Environment', type: 'code', duration: '25 min', status: 'published', views: 2198 },
        { id: 105, title: 'Your First AI Program', type: 'code', duration: '30 min', status: 'draft', views: 0 },
      ]
    },
    {
      id: 2,
      title: 'Week 2: Machine Learning Basics',
      lessons: [
        { id: 201, title: 'Supervised vs Unsupervised Learning', type: 'video', duration: '22 min', status: 'published', views: 2156 },
        { id: 202, title: 'Classification and Regression', type: 'video', duration: '28 min', status: 'published', views: 1987 },
        { id: 203, title: 'Training and Testing Data', type: 'video', duration: '20 min', status: 'published', views: 1876 },
        { id: 204, title: 'Model Evaluation Metrics', type: 'text', duration: '25 min', status: 'published', views: 1654 },
        { id: 205, title: 'Hands-on: Build a Classifier', type: 'code', duration: '45 min', status: 'published', views: 1432 },
      ]
    },
    {
      id: 3,
      title: 'Week 3: Neural Networks',
      lessons: [
        { id: 301, title: 'Introduction to Neural Networks', type: 'video', duration: '25 min', status: 'published', views: 1876 },
        { id: 302, title: 'Perceptrons and Activation Functions', type: 'video', duration: '30 min', status: 'published', views: 1654 },
        { id: 303, title: 'Backpropagation Explained', type: 'video', duration: '35 min', status: 'review', views: 0 },
        { id: 304, title: 'Building Your First Neural Network', type: 'code', duration: '50 min', status: 'draft', views: 0 },
        { id: 305, title: 'Project: Image Classifier', type: 'code', duration: '60 min', status: 'draft', views: 0 },
      ]
    },
    {
      id: 4,
      title: 'Week 4: Deployment & Ethics',
      lessons: [
        { id: 401, title: 'Model Deployment Strategies', type: 'video', duration: '28 min', status: 'draft', views: 0 },
        { id: 402, title: 'Creating an API for Your Model', type: 'code', duration: '40 min', status: 'draft', views: 0 },
        { id: 403, title: 'AI Ethics and Bias', type: 'video', duration: '35 min', status: 'draft', views: 0 },
        { id: 404, title: 'Responsible AI Development', type: 'text', duration: '30 min', status: 'draft', views: 0 },
        { id: 405, title: 'Final Project: Complete AI Application', type: 'code', duration: '90 min', status: 'draft', views: 0 },
      ]
    },
  ]
};

const lessonTypeIcons: Record<string, React.ElementType> = {
  video: Video,
  text: FileText,
  code: Code,
};

const statusColors: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  review: 'bg-yellow-100 text-yellow-700',
};

export default function AdminContent() {
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2, 3]);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showLessonEditor, setShowLessonEditor] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const openLessonEditor = (lesson: any) => {
    setSelectedLesson(lesson);
    setShowLessonEditor(true);
  };

  const versionHistory = [
    { version: '1.3', date: 'Jan 12, 2025', author: 'Admin', changes: 'Updated code examples' },
    { version: '1.2', date: 'Jan 8, 2025', author: 'Admin', changes: 'Fixed typos' },
    { version: '1.1', date: 'Jan 5, 2025', author: 'Admin', changes: 'Added new section' },
    { version: '1.0', date: 'Jan 1, 2025', author: 'Admin', changes: 'Initial release' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Content Management</h1>
          <p className="text-text-secondary text-sm">Organize modules and lessons for {courseContent.title}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Eye size={16} />
            Preview as Student
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral-dark">
            <Plus size={16} />
            Add Module
          </button>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Modules', value: '4', icon: '📚' },
          { label: 'Total Lessons', value: '20', icon: '📖' },
          { label: 'Published', value: '14', icon: '✅' },
          { label: 'Completion Rate', value: '68%', icon: '📈' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className="font-display font-bold text-xl">{stat.value}</p>
            <p className="text-text-secondary text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Modules List */}
        <div className="lg:col-span-2 space-y-4">
          {courseContent.modules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Module Header */}
              <div 
                className="flex items-center gap-3 p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleModule(module.id)}
              >
                <GripVertical size={18} className="text-gray-400 cursor-grab" />
                {expandedModules.includes(module.id) ? (
                  <ChevronDown size={18} className="text-gray-500" />
                ) : (
                  <ChevronRight size={18} className="text-gray-500" />
                )}
                <span className="font-display font-semibold flex-1">{module.title}</span>
                <span className="text-sm text-gray-500">{module.lessons.length} lessons</span>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-white rounded-lg">
                    <Edit2 size={14} className="text-gray-500" />
                  </button>
                  <button className="p-1.5 hover:bg-white rounded-lg">
                    <Plus size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Lessons */}
              {expandedModules.includes(module.id) && (
                <div className="divide-y divide-gray-100">
                  {module.lessons.map((lesson, idx) => {
                    const Icon = lessonTypeIcons[lesson.type];
                    return (
                      <div 
                        key={lesson.id} 
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 group"
                      >
                        <GripVertical size={16} className="text-gray-300 cursor-grab" />
                        <span className="text-sm text-gray-400 w-6">{idx + 1}</span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          lesson.type === 'video' ? 'bg-red-100' :
                          lesson.type === 'code' ? 'bg-blue/10' :
                          'bg-gray-100'
                        }`}>
                          <Icon size={14} className={`${
                            lesson.type === 'video' ? 'text-red-500' :
                            lesson.type === 'code' ? 'text-blue' :
                            'text-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{lesson.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {lesson.duration}
                            </span>
                            {lesson.views > 0 && (
                              <span>• {lesson.views.toLocaleString()} views</span>
                            )}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[lesson.status]}`}>
                          {lesson.status}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openLessonEditor(lesson)}
                            className="p-1.5 hover:bg-gray-200 rounded-lg"
                          >
                            <Edit2 size={14} className="text-gray-500" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-200 rounded-lg">
                            <Eye size={14} className="text-gray-500" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-200 rounded-lg">
                            <MoreHorizontal size={14} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          
          {/* Add Module Button */}
          <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-coral hover:text-coral transition-colors">
            <Plus size={18} />
            Add New Module
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-display font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm">
                <Copy size={16} />
                Duplicate Course
              </button>
              <button 
                onClick={() => setShowVersionHistory(true)}
                className="w-full flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm"
              >
                <History size={16} />
                Version History
              </button>
              <button className="w-full flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm">
                <CheckCircle size={16} />
                Publish All Drafts
              </button>
            </div>
          </div>

          {/* Course Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-display font-semibold mb-3">Course Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Completion Rules</span>
                <select className="text-sm border border-gray-200 rounded px-2 py-1">
                  <option>All lessons</option>
                  <option>80% of lessons</option>
                  <option>Pass final quiz</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Certificate</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-coral"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Prerequisites</span>
                <button className="text-coral text-sm">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Editor Modal */}
      {showLessonEditor && selectedLesson && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="font-display font-bold text-lg">Edit Lesson</h3>
              <button onClick={() => setShowLessonEditor(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Lesson Title</label>
                <input
                  type="text"
                  defaultValue={selectedLesson.title}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select 
                    defaultValue={selectedLesson.type}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  >
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                    <option value="code">Code Exercise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    defaultValue={selectedLesson.duration}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select 
                    defaultValue={selectedLesson.status}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                    {['B', 'I', 'U', 'Code', 'Link'].map((tool) => (
                      <button key={tool} className="px-2 py-1 text-sm hover:bg-gray-200 rounded">
                        {tool}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={8}
                    placeholder="Enter lesson content..."
                    className="w-full p-4 resize-none focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Prompt Examples</label>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium mb-1">Example 1</p>
                    <code className="text-xs text-gray-600 block">Write a Python function to...</code>
                  </div>
                  <button className="text-coral text-sm">+ Add Example</button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200">
              <button 
                onClick={() => setShowLessonEditor(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-coral text-white rounded-lg text-sm flex items-center gap-2">
                <Save size={16} />
                Save & Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {showVersionHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="font-display font-bold text-lg">Version History</h3>
              <button onClick={() => setShowVersionHistory(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <div className="space-y-4">
                {versionHistory.map((version, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue text-sm font-bold">v{version.version}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{version.changes}</p>
                      <p className="text-xs text-gray-500">
                        {version.date} • {version.author}
                      </p>
                    </div>
                    {idx > 0 && (
                      <button className="text-coral text-sm hover:underline">
                        Restore
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
