import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  Globe, 
  ArrowRight,
  CheckCircle,
  DollarSign,
  Clock
} from 'lucide-react';

export default function CareersPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.careers-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
      
      gsap.fromTo('.careers-section',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 60%',
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);

  const paths = [
    {
      title: 'Get a Job',
      description: 'Land roles at top tech companies, startups, and enterprises looking for AI talent.',
      icon: Briefcase,
      roles: ['AI Product Manager', 'Prompt Engineer', 'AI Specialist', 'Automation Consultant'],
      color: 'blue',
    },
    {
      title: 'Freelance',
      description: 'Build a thriving freelance business helping clients implement AI solutions.',
      icon: Globe,
      roles: ['AI Consultant', 'Content Creator', 'Workflow Automator', 'AI Trainer'],
      color: 'coral',
    },
    {
      title: 'Build Products',
      description: 'Launch your own AI-powered products and services.',
      icon: TrendingUp,
      roles: ['SaaS Founder', 'AI App Developer', 'Course Creator', 'Agency Owner'],
      color: 'blue',
    },
  ];

  const successStories = [
    {
      name: 'Marcus Johnson',
      role: 'AI Automation Consultant',
      before: 'Marketing Manager',
      after: '$150/hr freelance rate',
      image: '/images/testimonial_02.jpg',
      quote: 'Masterly AI gave me the skills to automate workflows for clients. I went from a 9-5 to a six-figure freelance business in 8 months.',
    },
    {
      name: 'Elena Rodriguez',
      role: 'AI Product Manager',
      before: 'Business Analyst',
      after: '$145K at tech startup',
      image: '/images/testimonial_01.jpg',
      quote: 'The practical projects in the course were exactly what I needed to transition into AI product management.',
    },
    {
      name: 'David Kim',
      role: 'Founder, AI Tools Agency',
      before: 'Software Developer',
      after: '$20K MRR agency',
      image: '/images/testimonial_04.jpg',
      quote: 'I learned how to build AI agents and automation systems. Now I run an agency with 12 team members.',
    },
  ];

  const stats = [
    { value: '$125K', label: 'Average Salary Increase' },
    { value: '85%', label: 'Learners Report New Opportunities' },
    { value: '3x', label: 'Faster Career Growth' },
  ];

  return (
    <main className="bg-offwhite pt-24 pb-20">
      {/* Hero Section */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-[7vw] mb-20">
        <div className="careers-header text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary mb-4 block">
            CAREER OUTCOMES
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            Built for Your Career Growth
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Whether you want to land a new job, start freelancing, or build your own AI-powered products—our curriculum is designed around real outcomes.
          </p>
          <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
            Explore Learning Paths
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="bg-black py-16 mb-20">
        <div className="max-w-7xl mx-auto px-[7vw]">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="careers-section">
                <p className="font-display font-bold text-4xl md:text-5xl text-coral mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Career Paths */}
      <div className="max-w-7xl mx-auto px-[7vw] mb-20">
        <div className="careers-section text-center mb-12">
          <h2 className="font-display font-bold text-4xl mb-4">
            Choose Your Path
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Three proven paths to success with AI skills.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path, idx) => (
            <div 
              key={idx} 
              className={`careers-section bg-white card-border p-6 hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                path.color === 'coral' ? 'bg-coral/10' : 'bg-blue/10'
              }`}>
                <path.icon className={path.color === 'coral' ? 'text-coral' : 'text-blue'} size={24} />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{path.title}</h3>
              <p className="text-text-secondary text-sm mb-4">{path.description}</p>
              <div className="space-y-2">
                {path.roles.map((role, ridx) => (
                  <div key={ridx} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className={path.color === 'coral' ? 'text-coral' : 'text-blue'} />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-[7vw] mb-20">
        <div className="careers-section text-center mb-12">
          <h2 className="font-display font-bold text-4xl mb-4">
            Success Stories
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Real learners, real results. See how Masterly AI transformed their careers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {successStories.map((story, idx) => (
            <div key={idx} className="careers-section bg-white card-border overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-display font-semibold">{story.name}</h4>
                    <p className="text-coral text-sm">{story.role}</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  "{story.quote}"
                </p>
                <div className="pt-4 border-t border-black/10">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-text-secondary text-xs">Before</p>
                      <p className="font-medium">{story.before}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-text-secondary text-xs">After</p>
                      <p className="font-medium text-coral">{story.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-[7vw] mb-20">
        <div className="careers-section bg-blue card-border p-8 md:p-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, title: 'Job-Ready Skills', desc: 'Learn what employers actually want' },
              { icon: DollarSign, title: 'Salary Growth', desc: 'Average 40% increase post-completion' },
              { icon: Clock, title: 'Flexible Learning', desc: 'Study at your own pace' },
              { icon: Users, title: 'Network Access', desc: 'Connect with industry professionals' },
            ].map((item, idx) => (
              <div key={idx} className="text-center text-white">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} />
                </div>
                <h4 className="font-display font-semibold mb-1">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="max-w-7xl mx-auto px-[7vw]">
        <div className="careers-section text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-text-secondary max-w-md mx-auto mb-8">
            Join thousands of professionals who have accelerated their careers with AI skills.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link to="/testimonials" className="btn-secondary">
              Read More Stories
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
