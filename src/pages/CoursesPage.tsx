import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Clock, BarChart, ArrowRight, CheckCircle, Users, Star } from 'lucide-react';

const courses = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description: 'Master the basics of artificial intelligence and machine learning. Perfect for beginners looking to understand AI concepts and applications.',
    image: '/images/course_ai_fundamentals.jpg',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 24,
    students: 12500,
    rating: 4.9,
    outcomes: [
      'Understand AI/ML core concepts',
      'Build your first neural network',
      'Deploy a simple AI model',
      'Evaluate model performance',
    ],
    tools: ['Python', 'TensorFlow', 'Jupyter', 'Google Colab'],
    color: 'blue',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'Learn to craft powerful prompts that get the best results from AI language models. Essential skill for the AI-powered workplace.',
    image: '/images/course_prompt_engineering.jpg',
    level: 'Intermediate',
    duration: '3 weeks',
    lessons: 18,
    students: 8900,
    rating: 4.8,
    outcomes: [
      'Write effective prompts for any task',
      'Use chain-of-thought techniques',
      'Build prompt templates',
      'Optimize for specific use cases',
    ],
    tools: ['ChatGPT', 'Claude', 'Midjourney', 'DALL-E'],
    color: 'coral',
  },
  {
    id: 'ai-for-freelancers',
    title: 'AI for Freelancers',
    description: 'Supercharge your freelance career with AI tools. Automate workflows, create content faster, and deliver more value to clients.',
    image: '/images/course_freelancers.jpg',
    level: 'All Levels',
    duration: '5 weeks',
    lessons: 30,
    students: 6700,
    rating: 4.9,
    outcomes: [
      'Automate repetitive tasks',
      'Create AI-powered content',
      'Build client workflows',
      'Scale your freelance business',
    ],
    tools: ['Make', 'Zapier', 'Notion AI', 'Copy.ai'],
    color: 'blue',
  },
  {
    id: 'ai-for-business',
    title: 'AI for Business & Automation',
    description: 'Transform your business operations with AI automation. From customer service to data analysis, learn to implement AI at scale.',
    image: '/images/course_business.jpg',
    level: 'Advanced',
    duration: '6 weeks',
    lessons: 36,
    students: 4200,
    rating: 4.7,
    outcomes: [
      'Design AI automation workflows',
      'Implement AI customer support',
      'Build data pipelines',
      'Measure ROI on AI investments',
    ],
    tools: ['OpenAI API', 'LangChain', 'Pinecone', 'Stripe'],
    color: 'coral',
  },
];

export default function CoursesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.courses-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      );
      
      gsap.fromTo('.course-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-offwhite pt-24 pb-20">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-[7vw] mb-16">
        <div className="courses-header text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary mb-4 block">
            OUR CURRICULUM
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            Choose Your Path
          </h1>
          <p className="text-lg text-text-secondary">
            From beginner fundamentals to advanced automation, find the perfect course to level up your AI skills.
          </p>
        </div>
      </div>
      
      {/* Course Cards */}
      <div ref={cardsRef} className="max-w-7xl mx-auto px-[7vw]">
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="course-card bg-white card-border overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  course.color === 'coral' ? 'bg-coral text-white' : 'bg-blue text-white'
                }`}>
                  {course.level}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart size={14} />
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-coral" />
                    {course.rating}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-2xl mb-2">{course.title}</h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                {/* Outcomes */}
                <div className="mb-4">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary mb-2">
                    What you'll learn
                  </p>
                  <ul className="space-y-1">
                    {course.outcomes.slice(0, 2).map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={14} className="text-coral mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="px-2 py-1 bg-offwhite rounded text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-black/10">
                  <span className="flex items-center gap-1 text-sm text-text-secondary">
                    <Users size={14} />
                    {course.students.toLocaleString()} students
                  </span>
                  <Link 
                    to={`/courses/${course.id}`}
                    className={`flex items-center gap-2 font-semibold text-sm ${
                      course.color === 'coral' ? 'text-coral' : 'text-blue'
                    } hover:gap-3 transition-all`}
                  >
                    View Course
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-[7vw] mt-20">
        <div className="bg-blue card-border p-8 md:p-12 text-center text-white">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Not sure where to start?
          </h2>
          <p className="text-white/80 max-w-md mx-auto mb-6">
            Take our 2-minute assessment and get a personalized learning path recommendation.
          </p>
          <Link 
            to="/onboarding"
            className="inline-flex items-center gap-2 bg-coral text-white font-semibold px-6 py-3 rounded-full hover:-translate-y-0.5 transition-all"
          >
            Take Assessment
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
