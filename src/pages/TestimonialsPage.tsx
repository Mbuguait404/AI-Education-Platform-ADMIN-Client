import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Quote, 
  ArrowRight
} from 'lucide-react';

export default function TestimonialsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
      
      gsap.fromTo('.testimonial-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 60%',
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'AI Product Manager',
      company: 'TechCorp',
      image: '/images/testimonial_01.jpg',
      category: 'Career Change',
      rating: 5,
      quote: 'Masterly AI completely transformed my career. I went from being a business analyst to an AI Product Manager at a top tech company. The hands-on projects gave me exactly the skills I needed to succeed.',
    },
    {
      name: 'Marcus Johnson',
      role: 'Freelance AI Consultant',
      company: 'Self-Employed',
      image: '/images/testimonial_02.jpg',
      category: 'Freelancing',
      rating: 5,
      quote: 'Within 6 months of completing the program, I was earning $150/hour helping businesses implement AI automation. The mentorship and community support were invaluable.',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Founder',
      company: 'AI Solutions Agency',
      image: '/images/testimonial_03.jpg',
      category: 'Entrepreneurship',
      rating: 5,
      quote: 'I started my own AI consultancy after completing the Business Automation track. Now I have a team of 8 and we are serving clients globally. This program gave me the confidence and skills to build something real.',
    },
    {
      name: 'David Kim',
      role: 'Software Engineer',
      company: 'Google',
      image: '/images/testimonial_04.jpg',
      category: 'Skill Upgrade',
      rating: 5,
      quote: 'Even as an experienced developer, I learned so much about practical AI implementation. The prompt engineering course alone has made me 10x more productive in my daily work.',
    },
    {
      name: 'Priya Patel',
      role: 'Marketing Director',
      company: 'StartupXYZ',
      image: '/images/hero_mentor.jpg',
      category: 'Career Growth',
      rating: 5,
      quote: 'The AI for Business course helped me automate our entire marketing workflow. We have cut costs by 40% and increased output by 3x. My CEO was amazed by the results.',
    },
    {
      name: 'James Wilson',
      role: 'Content Creator',
      company: 'Independent',
      image: '/images/build_mentor.jpg',
      category: 'Freelancing',
      rating: 5,
      quote: 'As a content creator, AI tools have 10x my output. I can now produce a week worth of content in a single day. The course paid for itself in the first week.',
    },
    {
      name: 'Lisa Thompson',
      role: 'Data Analyst',
      company: 'FinanceHub',
      image: '/images/mentor_main.jpg',
      category: 'Skill Upgrade',
      rating: 5,
      quote: 'The AI Fundamentals course gave me a solid foundation that I use every day. I have built predictive models that have saved my company millions.',
    },
    {
      name: 'Ahmed Hassan',
      role: 'Product Designer',
      company: 'DesignCo',
      image: '/images/future_mentor.jpg',
      category: 'Career Growth',
      rating: 5,
      quote: 'Learning to use AI for design has completely changed how I work. I can iterate faster and explore more creative directions than ever before.',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Active Learners' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '92%', label: 'Recommend to Friends' },
    { value: '120+', label: 'Countries' },
  ];

  return (
    <main className="bg-offwhite pt-24 pb-20">
      {/* Hero Section */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-[7vw] mb-16">
        <div className="testimonials-header text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary mb-4 block">
            COMMUNITY STORIES
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            Loved by Learners Worldwide
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Join thousands of professionals who have transformed their careers with Masterly AI. Here is what they have to say.
          </p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="bg-black py-12 mb-16">
        <div className="max-w-7xl mx-auto px-[7vw]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="testimonials-header">
                <p className="font-display font-bold text-3xl md:text-4xl text-coral mb-1">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-[7vw]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className={`testimonial-card bg-white card-border p-6 ${
                idx === 0 || idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-display font-semibold">{testimonial.name}</h4>
                    <p className="text-text-secondary text-sm">{testimonial.role}</p>
                    <p className="text-coral text-xs">{testimonial.company}</p>
                  </div>
                </div>
                <Quote className="text-coral/20" size={32} />
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-coral fill-coral" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                "{testimonial.quote}"
              </p>
              
              {/* Category Tag */}
              <span className="inline-block px-3 py-1 bg-offwhite rounded-full text-xs font-medium">
                {testimonial.category}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Story */}
      <div className="max-w-7xl mx-auto px-[7vw] mt-16">
        <div className="testimonial-card bg-blue card-border overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12 text-white">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-4">
                Featured Story
              </span>
              <h2 className="font-display font-bold text-3xl mb-4">
                From Barista to AI Engineer in 12 Months
              </h2>
              <p className="text-white/80 mb-6">
                "I had zero coding experience when I started. The beginner-friendly approach and supportive community helped me go from complete novice to landing my dream job as an AI Engineer at a startup."
              </p>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/images/testimonial_04.jpg" 
                  alt="Featured"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-display font-semibold">Michael Torres</p>
                  <p className="text-white/70 text-sm">AI Engineer at InnovateLab</p>
                </div>
              </div>
              <Link 
                to="/courses"
                className="inline-flex items-center gap-2 bg-coral text-white font-semibold px-6 py-3 rounded-full hover:-translate-y-0.5 transition-all"
              >
                Read Full Story
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hidden lg:block relative">
              <img 
                src="/images/community_collage_01.jpg" 
                alt="Community"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="max-w-7xl mx-auto px-[7vw] mt-16">
        <div className="testimonial-card text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-text-secondary max-w-md mx-auto mb-8">
            Join our community of learners and start your journey to an AI-powered career today.
          </p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
            Start Your Journey
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
