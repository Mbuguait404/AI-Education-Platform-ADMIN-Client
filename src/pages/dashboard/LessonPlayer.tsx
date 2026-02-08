import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Clock,
  FileText,
  MessageCircle,
  Download,
  Bookmark,
  Share2
} from 'lucide-react';

const lessonData = {
  title: 'Building Your First Neural Network',
  duration: '45:30',
  description: 'In this lesson, we will build a simple neural network from scratch using Python and TensorFlow. You will learn about layers, activation functions, and how to train your model on real data.',
  course: 'AI Fundamentals',
  module: 'Week 3: Neural Networks',
  progress: 65,
  transcript: [
    { time: '00:00', text: 'Welcome back! In this lesson, we are going to build our first neural network.' },
    { time: '02:15', text: 'First, let us understand what a neural network is. At its core, it is a series of algorithms that endeavors to recognize underlying relationships in a set of data.' },
    { time: '05:30', text: 'We will start by importing the necessary libraries. TensorFlow is our main framework here.' },
    { time: '10:45', text: 'Now let us define our model architecture. We will use a simple sequential model with three layers.' },
    { time: '18:20', text: 'The activation function is crucial. We will use ReLU for the hidden layers and softmax for the output.' },
    { time: '25:00', text: 'Let us compile our model. We need to specify the optimizer, loss function, and metrics.' },
    { time: '32:15', text: 'Now for the exciting part - training! We will fit our model to the training data.' },
    { time: '40:00', text: 'Finally, let us evaluate our model on the test set and see how well it performs.' },
  ],
  resources: [
    { name: 'Lesson Slides.pdf', size: '2.4 MB' },
    { name: 'Code Notebook.ipynb', size: '1.8 MB' },
    { name: 'Dataset.zip', size: '15.2 MB' },
  ],
  nextLesson: {
    title: 'Project: Image Classifier',
    duration: '60:00',
  },
  prevLesson: {
    title: 'Activation Functions Explained',
    duration: '35:00',
  },
};

const moduleLessons = [
  { id: 1, title: 'Introduction to Neural Networks', duration: '25 min', completed: true },
  { id: 2, title: 'Perceptrons and Activation Functions', duration: '30 min', completed: true },
  { id: 3, title: 'Backpropagation Explained', duration: '35 min', completed: true },
  { id: 4, title: 'Building Your First Neural Network', duration: '45 min', completed: false, current: true },
  { id: 5, title: 'Project: Image Classifier', duration: '60 min', completed: false },
];

export default function LessonPlayer() {
  const { lessonId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'resources' | 'discussion'>('transcript');

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Link to="/dashboard/courses" className="hover:text-black">My Courses</Link>
        <ChevronRight size={14} />
        <Link to="/dashboard/courses" className="hover:text-black">{lessonData.course}</Link>
        <ChevronRight size={14} />
        <span className="text-black">{lessonData.title}</span>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="bg-black rounded-2xl overflow-hidden aspect-video relative group">
            {/* Placeholder for video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-coral rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </div>
                <p className="text-white/60">Click to play</p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Progress bar */}
              <div className="h-1 bg-white/20 rounded-full mb-4 cursor-pointer">
                <div className="h-full w-1/3 bg-coral rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-coral rounded-full" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
                  </button>
                  <div className="flex items-center gap-2">
                    <Volume2 size={18} className="text-white" />
                    <div className="w-20 h-1 bg-white/20 rounded-full">
                      <div className="h-full w-2/3 bg-white rounded-full" />
                    </div>
                  </div>
                  <span className="text-white text-sm">15:10 / {lessonData.duration}</span>
                </div>
                <button>
                  <Maximize size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Lesson Info */}
          <div className="bg-white card-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-display font-bold text-2xl mb-2">{lessonData.title}</h1>
                <p className="text-text-secondary">{lessonData.module}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked ? 'bg-coral/10 text-coral' : 'bg-offwhite text-text-secondary'
                  }`}
                >
                  <Bookmark size={20} className={isBookmarked ? 'fill-coral' : ''} />
                </button>
                <button className="p-2 bg-offwhite rounded-lg text-text-secondary hover:bg-black/5">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">{lessonData.description}</p>
            
            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-black/10">
              <Link 
                to={`/dashboard/lesson/${parseInt(lessonId || '1') - 1}`}
                className="flex items-center gap-2 text-text-secondary hover:text-black transition-colors"
              >
                <ChevronLeft size={18} />
                <div className="text-left">
                  <p className="text-xs text-text-secondary">Previous</p>
                  <p className="text-sm font-medium truncate max-w-[150px]">{lessonData.prevLesson.title}</p>
                </div>
              </Link>
              
              <button className="btn-primary flex items-center gap-2">
                <CheckCircle size={18} />
                Mark Complete
              </button>
              
              <Link 
                to={`/dashboard/lesson/${parseInt(lessonId || '1') + 1}`}
                className="flex items-center gap-2 text-text-secondary hover:text-black transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs text-text-secondary">Next</p>
                  <p className="text-sm font-medium truncate max-w-[150px]">{lessonData.nextLesson.title}</p>
                </div>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
          
          {/* Tabs Content */}
          <div className="bg-white card-border overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b-2 border-black/10">
              {[
                { key: 'transcript', label: 'Transcript', icon: FileText },
                { key: 'resources', label: 'Resources', icon: Download },
                { key: 'discussion', label: 'Discussion', icon: MessageCircle },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-coral text-coral'
                      : 'border-transparent text-text-secondary hover:text-black'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'transcript' && (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {lessonData.transcript.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="text-coral font-mono text-sm flex-shrink-0">{item.time}</span>
                      <p className="text-text-secondary text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'resources' && (
                <div className="space-y-3">
                  {lessonData.resources.map((resource, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-offwhite rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText className="text-coral" size={20} />
                        <div>
                          <p className="font-medium text-sm">{resource.name}</p>
                          <p className="text-text-secondary text-xs">{resource.size}</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'discussion' && (
                <div className="text-center py-8">
                  <MessageCircle className="mx-auto text-text-secondary mb-4" size={48} />
                  <h3 className="font-display font-semibold mb-2">Join the Discussion</h3>
                  <p className="text-text-secondary text-sm mb-4">
                    Ask questions and connect with other learners
                  </p>
                  <button className="btn-secondary">
                    Open Discussion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar - Module Lessons */}
        <div className="bg-white card-border overflow-hidden">
          <div className="p-4 border-b-2 border-black/10">
            <h3 className="font-display font-semibold">Module Lessons</h3>
            <p className="text-text-secondary text-sm">{lessonData.module}</p>
          </div>
          <div className="divide-y divide-black/5">
            {moduleLessons.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/dashboard/lesson/${lesson.id}`}
                className={`flex items-center gap-3 p-4 hover:bg-offwhite transition-colors ${
                  lesson.current ? 'bg-coral/5' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  lesson.completed ? 'bg-green-100 text-green-600' :
                  lesson.current ? 'bg-coral text-white' :
                  'bg-offwhite text-text-secondary'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle size={16} />
                  ) : lesson.current ? (
                    <Play size={14} />
                  ) : (
                    <span className="text-xs font-medium">{lesson.id}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    lesson.current ? 'text-coral' : ''
                  }`}>
                    {lesson.title}
                  </p>
                  <p className="text-text-secondary text-xs flex items-center gap-1">
                    <Clock size={10} />
                    {lesson.duration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
