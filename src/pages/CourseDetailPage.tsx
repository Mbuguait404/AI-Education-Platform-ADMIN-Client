import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  BarChart, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  Star, 
  Play,
  Award,
  FileText,
  Lock
} from 'lucide-react';

const coursesData = {
  'ai-fundamentals': {
    title: 'AI Fundamentals',
    description: 'Master the basics of artificial intelligence and machine learning. Perfect for beginners looking to understand AI concepts and applications.',
    longDescription: 'This comprehensive course takes you from zero to hero in AI fundamentals. You will learn the core concepts behind machine learning, neural networks, and deep learning. By the end of this course, you will be able to build and deploy your own AI models.',
    image: '/images/course_ai_fundamentals.jpg',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 24,
    students: 12500,
    rating: 4.9,
    reviews: 2847,
    outcomes: [
      'Understand AI/ML core concepts and terminology',
      'Build your first neural network from scratch',
      'Deploy a simple AI model to production',
      'Evaluate and improve model performance',
      'Work with real-world datasets',
      'Understand ethical considerations in AI',
    ],
    tools: ['Python', 'TensorFlow', 'Jupyter', 'Google Colab', 'Scikit-learn'],
    modules: [
      {
        title: 'Week 1: Introduction to AI',
        lessons: [
          { title: 'What is Artificial Intelligence?', duration: '15 min', free: true },
          { title: 'History and Evolution of AI', duration: '20 min', free: true },
          { title: 'Types of AI: Narrow vs General', duration: '18 min', free: false },
          { title: 'Setting Up Your Environment', duration: '25 min', free: false },
          { title: 'Your First AI Program', duration: '30 min', free: false },
        ]
      },
      {
        title: 'Week 2: Machine Learning Basics',
        lessons: [
          { title: 'Supervised vs Unsupervised Learning', duration: '22 min', free: false },
          { title: 'Classification and Regression', duration: '28 min', free: false },
          { title: 'Training and Testing Data', duration: '20 min', free: false },
          { title: 'Model Evaluation Metrics', duration: '25 min', free: false },
          { title: 'Hands-on: Build a Classifier', duration: '45 min', free: false },
        ]
      },
      {
        title: 'Week 3: Neural Networks',
        lessons: [
          { title: 'Introduction to Neural Networks', duration: '25 min', free: false },
          { title: 'Perceptrons and Activation Functions', duration: '30 min', free: false },
          { title: 'Backpropagation Explained', duration: '35 min', free: false },
          { title: 'Building Your First Neural Network', duration: '50 min', free: false },
          { title: 'Project: Image Classifier', duration: '60 min', free: false },
        ]
      },
      {
        title: 'Week 4: Deployment & Ethics',
        lessons: [
          { title: 'Model Deployment Strategies', duration: '28 min', free: false },
          { title: 'Creating an API for Your Model', duration: '40 min', free: false },
          { title: 'AI Ethics and Bias', duration: '35 min', free: false },
          { title: 'Responsible AI Development', duration: '30 min', free: false },
          { title: 'Final Project: Complete AI Application', duration: '90 min', free: false },
        ]
      },
    ],
    projects: [
      {
        title: 'Spam Email Classifier',
        description: 'Build a model that can distinguish between spam and legitimate emails.',
        difficulty: 'Beginner',
      },
      {
        title: 'Handwritten Digit Recognition',
        description: 'Create a neural network that recognizes handwritten digits.',
        difficulty: 'Intermediate',
      },
      {
        title: 'Sentiment Analysis Tool',
        description: 'Develop a tool that analyzes the sentiment of text data.',
        difficulty: 'Intermediate',
      },
    ],
  },
  'prompt-engineering': {
    title: 'Prompt Engineering',
    description: 'Learn to craft powerful prompts that get the best results from AI language models.',
    longDescription: 'Prompt engineering is the key to unlocking the full potential of AI language models. In this course, you will master the art of crafting prompts that produce accurate, relevant, and useful outputs.',
    image: '/images/course_prompt_engineering.jpg',
    level: 'Intermediate',
    duration: '3 weeks',
    lessons: 18,
    students: 8900,
    rating: 4.8,
    reviews: 1956,
    outcomes: [
      'Write effective prompts for any AI model',
      'Use chain-of-thought prompting techniques',
      'Build reusable prompt templates',
      'Optimize prompts for specific use cases',
      'Understand model limitations and biases',
      'Create multi-step AI workflows',
    ],
    tools: ['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'OpenAI API'],
    modules: [
      {
        title: 'Week 1: Prompt Foundations',
        lessons: [
          { title: 'What is Prompt Engineering?', duration: '15 min', free: true },
          { title: 'Anatomy of a Great Prompt', duration: '20 min', free: true },
          { title: 'Context and Constraints', duration: '18 min', free: false },
          { title: 'Role-Based Prompting', duration: '22 min', free: false },
        ]
      },
      {
        title: 'Week 2: Advanced Techniques',
        lessons: [
          { title: 'Chain-of-Thought Prompting', duration: '25 min', free: false },
          { title: 'Few-Shot Learning', duration: '28 min', free: false },
          { title: 'Zero-Shot Capabilities', duration: '20 min', free: false },
          { title: 'Prompt Chaining', duration: '30 min', free: false },
        ]
      },
      {
        title: 'Week 3: Real-World Applications',
        lessons: [
          { title: 'Content Generation Workflows', duration: '35 min', free: false },
          { title: 'Code Assistant Prompts', duration: '40 min', free: false },
          { title: 'Data Analysis with AI', duration: '35 min', free: false },
          { title: 'Building a Prompt Library', duration: '30 min', free: false },
        ]
      },
    ],
    projects: [
      {
        title: 'Customer Support Bot',
        description: 'Create a prompt-based customer support assistant.',
        difficulty: 'Intermediate',
      },
      {
        title: 'Content Calendar Generator',
        description: 'Build a tool that generates monthly content calendars.',
        difficulty: 'Advanced',
      },
    ],
  },
  'ai-for-freelancers': {
    title: 'AI for Freelancers',
    description: 'Supercharge your freelance career with AI tools.',
    longDescription: 'Transform your freelance business with AI automation. Learn to use cutting-edge AI tools to work faster, deliver better results, and scale your income.',
    image: '/images/course_freelancers.jpg',
    level: 'All Levels',
    duration: '5 weeks',
    lessons: 30,
    students: 6700,
    rating: 4.9,
    reviews: 1423,
    outcomes: [
      'Automate repetitive freelance tasks',
      'Create AI-powered content at scale',
      'Build client onboarding workflows',
      'Scale your freelance business',
      'Increase your hourly rate',
      'Find and win more clients',
    ],
    tools: ['Make', 'Zapier', 'Notion AI', 'Copy.ai', 'Grammarly'],
    modules: [
      {
        title: 'Week 1: AI-Powered Workflow',
        lessons: [
          { title: 'Introduction to AI for Freelancers', duration: '15 min', free: true },
          { title: 'Identifying Automation Opportunities', duration: '25 min', free: true },
          { title: 'Setting Up Your AI Toolkit', duration: '30 min', free: false },
        ]
      },
      {
        title: 'Week 2-3: Content Creation',
        lessons: [
          { title: 'AI Writing Assistants', duration: '35 min', free: false },
          { title: 'Image Generation for Clients', duration: '40 min', free: false },
          { title: 'Video and Audio Tools', duration: '35 min', free: false },
        ]
      },
      {
        title: 'Week 4-5: Business Growth',
        lessons: [
          { title: 'Client Acquisition with AI', duration: '30 min', free: false },
          { title: 'Building Productized Services', duration: '45 min', free: false },
          { title: 'Scaling Your Freelance Business', duration: '40 min', free: false },
        ]
      },
    ],
    projects: [
      {
        title: 'Automated Client Onboarding',
        description: 'Build a complete onboarding system using AI tools.',
        difficulty: 'Intermediate',
      },
      {
        title: 'Content Agency Workflow',
        description: 'Create a scalable content production pipeline.',
        difficulty: 'Advanced',
      },
    ],
  },
  'ai-for-business': {
    title: 'AI for Business & Automation',
    description: 'Transform your business operations with AI automation.',
    longDescription: 'Learn to implement AI solutions that drive real business results. From customer service automation to data analysis, this course covers enterprise-grade AI implementation.',
    image: '/images/course_business.jpg',
    level: 'Advanced',
    duration: '6 weeks',
    lessons: 36,
    students: 4200,
    rating: 4.7,
    reviews: 892,
    outcomes: [
      'Design enterprise AI automation workflows',
      'Implement AI-powered customer support',
      'Build scalable data pipelines',
      'Measure ROI on AI investments',
      'Lead AI transformation initiatives',
      'Integrate AI with existing systems',
    ],
    tools: ['OpenAI API', 'LangChain', 'Pinecone', 'Stripe', 'AWS'],
    modules: [
      {
        title: 'Week 1-2: AI Strategy',
        lessons: [
          { title: 'AI Transformation Framework', duration: '30 min', free: true },
          { title: 'Identifying High-Impact Use Cases', duration: '35 min', free: true },
          { title: 'Building the Business Case', duration: '40 min', free: false },
        ]
      },
      {
        title: 'Week 3-4: Implementation',
        lessons: [
          { title: 'AI Architecture Patterns', duration: '45 min', free: false },
          { title: 'Building Production Systems', duration: '50 min', free: false },
          { title: 'Security and Compliance', duration: '40 min', free: false },
        ]
      },
      {
        title: 'Week 5-6: Scale & Optimize',
        lessons: [
          { title: 'Monitoring and Maintenance', duration: '35 min', free: false },
          { title: 'Continuous Improvement', duration: '40 min', free: false },
          { title: 'Measuring Business Impact', duration: '35 min', free: false },
        ]
      },
    ],
    projects: [
      {
        title: 'Customer Support Automation',
        description: 'Build an AI-powered support system that handles 80% of inquiries.',
        difficulty: 'Advanced',
      },
      {
        title: 'Sales Pipeline Optimizer',
        description: 'Create an AI system that prioritizes and nurtures leads.',
        difficulty: 'Expert',
      },
    ],
  },
};

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const course = courseId ? coursesData[courseId as keyof typeof coursesData] : null;
  
  useEffect(() => {
    if (!course) {
      navigate('/courses');
      return;
    }
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.course-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
      
      gsap.fromTo('.course-detail-section',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, [course, navigate]);
  
  if (!course) return null;

  return (
    <main className="bg-offwhite pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="course-hero-content absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/courses"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Courses
            </Link>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-4">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-1">
                <BarChart size={16} />
                {course.level}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <Play size={16} />
                {course.lessons} lessons
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} />
                {course.students.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1">
                <Star size={16} className="text-coral" />
                {course.rating} ({course.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-[7vw] py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section className="course-detail-section">
              <h2 className="font-display font-bold text-2xl mb-4">About This Course</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                {course.longDescription}
              </p>
            </section>
            
            {/* Learning Outcomes */}
            <section className="course-detail-section">
              <h2 className="font-display font-bold text-2xl mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-coral mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-text-secondary text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Course Modules */}
            <section className="course-detail-section">
              <h2 className="font-display font-bold text-2xl mb-4">Course Curriculum</h2>
              <div className="space-y-4">
                {course.modules.map((module, idx) => (
                  <div key={idx} className="bg-white card-border-sm overflow-hidden">
                    <div className="p-4 bg-offwhite border-b-2 border-black">
                      <h3 className="font-display font-semibold">{module.title}</h3>
                    </div>
                    <div className="divide-y divide-black/10">
                      {module.lessons.map((lesson, lidx) => (
                        <div key={lidx} className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {lesson.free ? (
                              <Play size={16} className="text-coral" />
                            ) : (
                              <Lock size={16} className="text-text-secondary" />
                            )}
                            <span className="text-sm">{lesson.title}</span>
                            {lesson.free && (
                              <span className="px-2 py-0.5 bg-coral/10 text-coral text-xs rounded-full">
                                Free
                              </span>
                            )}
                          </div>
                          <span className="text-text-secondary text-sm">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Projects */}
            <section className="course-detail-section">
              <h2 className="font-display font-bold text-2xl mb-4">Hands-On Projects</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.projects.map((project, idx) => (
                  <div key={idx} className="bg-white card-border-sm p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="text-blue" size={20} />
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        project.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold mb-1">{project.title}</h4>
                    <p className="text-text-secondary text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enroll Card */}
            <div className="course-detail-section bg-white card-border p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-display font-bold text-coral mb-1">Free</p>
                <p className="text-text-secondary text-sm">Start learning today</p>
              </div>
              
              <Link 
                to="/signup"
                className="btn-primary w-full text-center mb-4 block"
              >
                Enroll Now
              </Link>
              
              <p className="text-center text-text-secondary text-sm mb-6">
                No credit card required
              </p>
              
              <div className="space-y-3 pt-6 border-t border-black/10">
                <div className="flex items-center gap-3 text-sm">
                  <Award className="text-coral" size={18} />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="text-coral" size={18} />
                  <span>{course.lessons} video lessons</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="text-coral" size={18} />
                  <span>Community access</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Play className="text-coral" size={18} />
                  <span>Lifetime access</span>
                </div>
              </div>
            </div>
            
            {/* Tools Card */}
            <div className="course-detail-section bg-white card-border-sm p-5">
              <h3 className="font-display font-semibold mb-3">Tools You'll Use</h3>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool) => (
                  <span 
                    key={tool}
                    className="px-3 py-1 bg-offwhite rounded-full text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
