import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Linkedin, 
  FileText, 
  Share2, 
  ArrowRight,
  Star
} from 'lucide-react';

export default function CertificationPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-header',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
      
      gsap.fromTo('.cert-section',
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

  const steps = [
    {
      number: '01',
      title: 'Complete the Course',
      description: 'Finish all lessons, quizzes, and hands-on projects in your chosen learning path.',
    },
    {
      number: '02',
      title: 'Submit Your Projects',
      description: 'Submit your capstone projects for review by our team of expert mentors.',
    },
    {
      number: '03',
      title: 'Pass the Assessment',
      description: 'Complete a final skills assessment to demonstrate your mastery of the material.',
    },
    {
      number: '04',
      title: 'Receive Your Certificate',
      description: 'Get your verified, shareable certificate to showcase your new skills.',
    },
  ];

  const features = [
    {
      icon: Linkedin,
      title: 'LinkedIn Integration',
      description: 'Add your certificate directly to your LinkedIn profile with one click.',
    },
    {
      icon: FileText,
      title: 'Resume Ready',
      description: 'Download a PDF version perfect for attaching to job applications.',
    },
    {
      icon: Share2,
      title: 'Share Anywhere',
      description: 'Get a unique URL to share your achievement on any platform.',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Certificates Issued' },
    { value: '92%', label: 'Learners Report Career Growth' },
    { value: '4.8/5', label: 'Average Rating' },
  ];

  return (
    <main className="bg-offwhite pt-24 pb-20">
      {/* Hero Section */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-[7vw] mb-20">
        <div className="cert-header grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary mb-4 block">
              VERIFIED CREDENTIALS
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
              Earn a Certificate That Matters
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-md">
              Complete our rigorous programs and receive industry-recognized certificates that validate your AI skills to employers worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="btn-primary flex items-center gap-2">
                Start Learning
                <ArrowRight size={18} />
              </Link>
              <Link to="/signup" className="btn-secondary">
                View Sample Certificate
              </Link>
            </div>
          </div>
          
          {/* Certificate Preview */}
          <div className="relative">
            <div className="bg-white card-border p-8 relative z-10">
              <div className="border-4 border-coral/20 p-8 text-center">
                <Award className="mx-auto text-coral mb-4" size={64} />
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary mb-2">
                  Certificate of Completion
                </p>
                <h3 className="font-display font-bold text-2xl mb-2">
                  AI Fundamentals
                </h3>
                <p className="text-text-secondary mb-4">
                  This certifies that
                </p>
                <p className="font-display font-bold text-xl mb-4">
                  Alex Johnson
                </p>
                <p className="text-text-secondary text-sm mb-6">
                  has successfully completed the Masterly AI program demonstrating proficiency in AI fundamentals, prompt engineering, and practical application.
                </p>
                <div className="flex items-center justify-center gap-8 text-sm">
                  <div className="text-center">
                    <p className="font-mono text-xs text-text-secondary">Date</p>
                    <p className="font-semibold">Jan 15, 2025</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-xs text-text-secondary">Certificate ID</p>
                    <p className="font-semibold">MAI-2025-001234</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-blue/20 card-border -z-0" />
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-coral/20 card-border -z-0" />
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-black py-16 mb-20">
        <div className="max-w-7xl mx-auto px-[7vw]">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="cert-section">
                <p className="font-display font-bold text-4xl md:text-5xl text-coral mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-[7vw] mb-20">
        <div className="cert-section text-center mb-12">
          <h2 className="font-display font-bold text-4xl mb-4">
            How to Earn Your Certificate
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Our certification process ensures you've truly mastered the skills.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="cert-section bg-white card-border-sm p-6">
              <span className="font-display font-bold text-4xl text-coral/20">
                {step.number}
              </span>
              <h3 className="font-display font-semibold text-lg mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features */}
      <div className="max-w-7xl mx-auto px-[7vw] mb-20">
        <div className="cert-section bg-blue card-border p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                Share Your Achievement
              </h2>
              <p className="text-white/80 mb-8">
                Your certificate is designed to be shared. Showcase your skills wherever it matters most.
              </p>
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/images/certificate_main.jpg" 
                alt="Certificate"
                className="rounded-2xl border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial */}
      <div className="max-w-7xl mx-auto px-[7vw] mb-20">
        <div className="cert-section bg-white card-border p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src="/images/testimonial_01.jpg" 
              alt="Graduate"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-coral fill-coral" />
                ))}
              </div>
              <p className="text-lg mb-4">
                "The Masterly AI certificate helped me land my dream job as an AI Product Manager. Employers immediately recognized the value of the practical skills I gained."
              </p>
              <p className="font-display font-semibold">Sarah Chen</p>
              <p className="text-text-secondary text-sm">AI Product Manager at TechCorp</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="max-w-7xl mx-auto px-[7vw]">
        <div className="cert-section text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Ready to Get Certified?
          </h2>
          <p className="text-text-secondary max-w-md mx-auto mb-8">
            Join thousands of learners who have transformed their careers with Masterly AI.
          </p>
          <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
            Browse Courses
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
