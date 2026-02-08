import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Download, 
  Share2, 
  Linkedin, 
  CheckCircle,
  Lock,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';

const earnedCertificates = [
  {
    id: 1,
    title: 'AI Fundamentals',
    issueDate: 'December 15, 2024',
    certificateId: 'MAI-AF-2024-001234',
    image: '/images/certificate_main.jpg',
    skills: ['Machine Learning', 'Neural Networks', 'Python', 'TensorFlow'],
    verified: true,
  },
];

const inProgressCertificates = [
  {
    id: 2,
    title: 'Prompt Engineering',
    progress: 60,
    totalLessons: 18,
    completedLessons: 11,
    estimatedCompletion: 'February 10, 2025',
    image: '/images/course_prompt_engineering.jpg',
  },
  {
    id: 3,
    title: 'AI for Freelancers',
    progress: 25,
    totalLessons: 30,
    completedLessons: 7,
    estimatedCompletion: 'March 15, 2025',
    image: '/images/course_freelancers.jpg',
  },
];

const lockedCertificates = [
  {
    id: 4,
    title: 'AI for Business & Automation',
    requirement: 'Complete AI Fundamentals first',
    image: '/images/course_business.jpg',
  },
];

export default function DashboardCertificates() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<typeof earnedCertificates[0] | null>(null);

  const handleShare = (cert: typeof earnedCertificates[0]) => {
    setSelectedCert(cert);
    setShowShareModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl mb-2">My Certificates</h1>
        <p className="text-text-secondary">
          Track your achievements and share your credentials
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: 'Certificates Earned', value: '1', icon: Award, color: 'coral' },
          { label: 'In Progress', value: '2', icon: TrendingUp, color: 'blue' },
          { label: 'Total Skills', value: '12', icon: Star, color: 'coral' },
          { label: 'Verified', value: '100%', icon: CheckCircle, color: 'blue' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white card-border-sm p-5">
            <stat.icon className={`${stat.color === 'coral' ? 'text-coral' : 'text-blue'} mb-3`} size={24} />
            <p className="font-display font-bold text-2xl">{stat.value}</p>
            <p className="text-text-secondary text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Earned Certificates */}
      <div>
        <h2 className="font-display font-bold text-xl mb-4">Earned Certificates</h2>
        {earnedCertificates.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {earnedCertificates.map((cert) => (
              <div key={cert.id} className="bg-white card-border overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-coral text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle size={12} />
                    Verified
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg mb-1">{cert.title}</h3>
                  <p className="text-text-secondary text-sm mb-4">
                    Issued on {cert.issueDate}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1 bg-offwhite rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-text-secondary text-xs mb-4">
                    Certificate ID: {cert.certificateId}
                  </p>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-offwhite rounded-lg font-medium text-sm hover:bg-black/5 transition-colors">
                      <Download size={16} />
                      Download
                    </button>
                    <button 
                      onClick={() => handleShare(cert)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-coral text-white rounded-lg font-medium text-sm hover:bg-coral-dark transition-colors"
                    >
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-offwhite card-border p-12 text-center">
            <Award className="mx-auto text-text-secondary mb-4" size={48} />
            <h3 className="font-display font-semibold text-lg mb-2">No certificates yet</h3>
            <p className="text-text-secondary mb-4">
              Complete a course to earn your first certificate
            </p>
            <Link to="/dashboard/courses" className="btn-primary inline-flex items-center gap-2">
              Browse Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
      
      {/* In Progress */}
      <div>
        <h2 className="font-display font-bold text-xl mb-4">In Progress</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {inProgressCertificates.map((cert) => (
            <div key={cert.id} className="bg-white card-border overflow-hidden">
              <div className="relative h-40">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                  <div 
                    className="h-full bg-coral"
                    style={{ width: `${cert.progress}%` }}
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-1">{cert.title}</h3>
                <p className="text-text-secondary text-sm mb-3">
                  {cert.completedLessons} of {cert.totalLessons} lessons completed
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-secondary">Estimated completion</p>
                    <p className="font-medium text-sm">{cert.estimatedCompletion}</p>
                  </div>
                  <Link 
                    to="/dashboard/courses"
                    className="flex items-center gap-1 text-coral font-medium text-sm hover:gap-2 transition-all"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Locked Certificates */}
      <div>
        <h2 className="font-display font-bold text-xl mb-4">Locked</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {lockedCertificates.map((cert) => (
            <div key={cert.id} className="bg-offwhite card-border overflow-hidden opacity-60">
              <div className="relative h-40">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                    <Lock className="text-white" size={24} />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-1">{cert.title}</h3>
                <p className="text-text-secondary text-sm">
                  {cert.requirement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && selectedCert && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white card-border p-6 max-w-md w-full">
            <h3 className="font-display font-bold text-xl mb-4">Share Your Achievement</h3>
            <p className="text-text-secondary mb-6">
              Let others know about your accomplishment!
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0077B5] text-white rounded-xl font-medium">
                <Linkedin size={20} />
                Share on LinkedIn
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-offwhite rounded-xl font-medium">
                <Share2 size={20} />
                Copy Link
              </button>
            </div>
            <button 
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 py-3 text-text-secondary hover:text-black transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
