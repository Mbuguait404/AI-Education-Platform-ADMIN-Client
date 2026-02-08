import { useState } from 'react';
import { 
  FolderKanban, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Star,
  MessageCircle
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Spam Email Classifier',
    course: 'AI Fundamentals',
    description: 'Build a model that can distinguish between spam and legitimate emails using machine learning techniques.',
    difficulty: 'Beginner',
    status: 'completed',
    submittedDate: 'Jan 10, 2025',
    grade: '95%',
    feedback: 'Excellent work! Your model achieved high accuracy.',
    deadline: null,
  },
  {
    id: 2,
    title: 'Handwritten Digit Recognition',
    course: 'AI Fundamentals',
    description: 'Create a neural network that recognizes handwritten digits using the MNIST dataset.',
    difficulty: 'Intermediate',
    status: 'in-progress',
    submittedDate: null,
    grade: null,
    feedback: null,
    deadline: 'Jan 25, 2025',
  },
  {
    id: 3,
    title: 'Customer Support Bot',
    course: 'Prompt Engineering',
    description: 'Create a prompt-based customer support assistant that can handle common inquiries.',
    difficulty: 'Intermediate',
    status: 'not-started',
    submittedDate: null,
    grade: null,
    feedback: null,
    deadline: 'Feb 5, 2025',
  },
  {
    id: 4,
    title: 'Content Calendar Generator',
    course: 'Prompt Engineering',
    description: 'Build a tool that generates monthly content calendars using AI.',
    difficulty: 'Advanced',
    status: 'not-started',
    submittedDate: null,
    grade: null,
    feedback: null,
    deadline: 'Feb 15, 2025',
  },
];

const challenges = [
  {
    id: 1,
    title: 'Weekly Prompt Challenge',
    description: 'Create the most effective prompt for summarizing long articles.',
    participants: 234,
    daysLeft: 3,
    reward: 'Badge + 100 XP',
  },
  {
    id: 2,
    title: 'AI Automation Sprint',
    description: 'Build a workflow that automates a common business task.',
    participants: 156,
    daysLeft: 5,
    reward: 'Certificate + 200 XP',
  },
];

export default function DashboardProjects() {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filteredProjects = () => {
    switch (activeTab) {
      case 'in-progress':
        return projects.filter(p => p.status === 'in-progress' || p.status === 'not-started');
      case 'completed':
        return projects.filter(p => p.status === 'completed');
      default:
        return projects;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-orange-100 text-orange-700';
      case 'Expert': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">Projects & Practice</h1>
        <p className="text-text-secondary">
          Apply what you have learned through hands-on projects and challenges
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: '12', icon: FolderKanban },
          { label: 'Completed', value: '5', icon: CheckCircle },
          { label: 'In Progress', value: '3', icon: Clock },
          { label: 'Average Grade', value: '92%', icon: Star },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white card-border-sm p-5">
            <stat.icon className="text-coral mb-3" size={24} />
            <p className="font-display font-bold text-2xl">{stat.value}</p>
            <p className="text-text-secondary text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Projects Section */}
      <div>
        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 border-b-2 border-black/10">
            {[
              { key: 'all', label: 'All Projects', count: projects.length },
              { key: 'in-progress', label: 'In Progress', count: projects.filter(p => p.status !== 'completed').length },
              { key: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
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
        </div>
        
        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects().map((project) => (
            <div key={project.id} className="bg-white card-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                    getDifficultyColor(project.difficulty)
                  }`}>
                    {project.difficulty}
                  </span>
                  <h3 className="font-display font-bold text-lg">{project.title}</h3>
                  <p className="text-text-secondary text-sm">{project.course}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  project.status === 'completed' ? 'bg-green-100 text-green-600' :
                  project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {project.status === 'completed' ? (
                    <CheckCircle size={20} />
                  ) : project.status === 'in-progress' ? (
                    <Clock size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                </div>
              </div>
              
              <p className="text-text-secondary text-sm mb-4">
                {project.description}
              </p>
              
              {project.status === 'completed' ? (
                <div className="flex items-center justify-between pt-4 border-t border-black/10">
                  <div>
                    <p className="text-xs text-text-secondary">Grade</p>
                    <p className="font-display font-bold text-xl text-coral">{project.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">Submitted</p>
                    <p className="text-sm">{project.submittedDate}</p>
                  </div>
                </div>
              ) : project.status === 'in-progress' ? (
                <div className="flex items-center justify-between pt-4 border-t border-black/10">
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <Clock size={14} />
                    Due {project.deadline}
                  </div>
                  <button className="flex items-center gap-2 text-coral font-medium text-sm hover:gap-3 transition-all">
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-4 border-t border-black/10">
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <Clock size={14} />
                    Due {project.deadline}
                  </div>
                  <button className="flex items-center gap-2 text-coral font-medium text-sm hover:gap-3 transition-all">
                    Start Project
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Active Challenges */}
      <div>
        <h2 className="font-display font-bold text-xl mb-4">Active Challenges</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-blue card-border p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg">{challenge.title}</h3>
                  <p className="text-white/80 text-sm">{challenge.description}</p>
                </div>
                <Star className="text-coral" size={24} />
              </div>
              
              <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  {challenge.participants} participants
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {challenge.daysLeft} days left
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-coral text-sm font-medium">
                  Reward: {challenge.reward}
                </span>
                <button className="bg-coral text-white px-4 py-2 rounded-lg font-medium text-sm hover:-translate-y-0.5 transition-all">
                  Join Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
