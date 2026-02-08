import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Users, Award, MessageCircle, Briefcase, FolderKanban } from 'lucide-react';

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo('.hero-headline-line', 
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
      );
      
      gsap.fromTo('.hero-subheadline',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.6 }
      );
      
      gsap.fromTo('.hero-cta',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.7 }
      );
      
      gsap.fromTo('.hero-card',
        { scale: 0.92, rotate: -6, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.6)', delay: 0.4 }
      );
      
      // Scroll parallax
      gsap.to('.hero-card-1', {
        y: -28,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        }
      });
      
      gsap.to('.hero-card-2', {
        y: -44,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        }
      });
      
      gsap.to('.hero-card-3', {
        y: -18,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-offwhite relative overflow-hidden pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div ref={headlineRef} className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary mb-4 block">
              MASTERLY AI PROGRAM
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6">
              <span className="hero-headline-line block">Learn AI.</span>
              <span className="hero-headline-line block">Build Real Projects.</span>
            </h1>
            <p className="hero-subheadline text-lg md:text-xl text-text-secondary max-w-md mb-8">
              A hands-on program that turns beginners into builders—prompt engineering, automation, and real client-ready work.
            </p>
            <div className="hero-cta flex flex-wrap gap-4">
              <Link to="/signup" className="btn-primary flex items-center gap-2">
                Start free
                <ArrowRight size={18} />
              </Link>
              <Link to="/courses" className="btn-secondary">
                View curriculum
              </Link>
            </div>
          </div>
          
          {/* Right Content - Floating Cards */}
          <div ref={cardsRef} className="relative h-[500px] lg:h-[600px] hidden md:block">
            {/* Card A - Mentor */}
            <div className="hero-card hero-card-1 floating-card absolute w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] left-[10%] top-[5%]">
              <img 
                src="/images/hero_mentor.jpg" 
                alt="Mentor" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Card B - Community */}
            <div className="hero-card hero-card-2 floating-card absolute w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] right-[5%] top-[25%]">
              <img 
                src="/images/hero_community.jpg" 
                alt="Community" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Card C - Certificate */}
            <div className="hero-card hero-card-3 floating-card absolute w-[200px] h-[200px] lg:w-[260px] lg:h-[260px] left-[5%] bottom-[10%]">
              <img 
                src="/images/hero_certificate.jpg" 
                alt="Certificate" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Sparkle */}
            <Sparkles className="absolute left-0 bottom-[35%] text-coral sparkle" size={32} />
          </div>
        </div>
      </div>
    </section>
  );
}

// What You'll Learn Section
function WhatYouLearnSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.learn-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.learn-card',
        { y: 60, scale: 0.96, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const learnItems = [
    {
      title: 'Prompt Engineering',
      description: 'Write clear, powerful prompts for any model.',
      image: '/images/course_prompt_engineering.jpg',
      featured: false,
    },
    {
      title: 'AI Agents & Automation',
      description: 'Build workflows that save hours every week.',
      image: '/images/course_business.jpg',
      featured: true,
    },
    {
      title: 'Content & Design',
      description: 'Create images, copy, and prototypes with AI.',
      image: '/images/build_workspace.jpg',
      featured: false,
    },
    {
      title: 'Real-World Projects',
      description: 'Client-ready deliverables you can ship immediately.',
      image: '/images/career_workspace.jpg',
      featured: false,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite">
      <div className="max-w-7xl mx-auto px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Header */}
          <div className="learn-header">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              What You'll Learn
            </h2>
            <p className="text-lg text-text-secondary max-w-md">
              From first prompt to finished product. You'll work with today's most useful AI tools and leave with a portfolio.
            </p>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-2 gap-4">
            {learnItems.map((item, index) => (
              <div 
                key={index}
                className={`learn-card bg-white card-border-sm overflow-hidden ${
                  item.featured ? '-rotate-2' : ''
                }`}
              >
                <div className="h-24 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-xs">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Learn by Building Section
function LearnByBuildingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.build-panel',
        { x: '-6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.build-text',
        { x: '6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.build-card',
        { y: '10vh', rotate: 6, opacity: 0 },
        {
          y: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Panel */}
        <div className="build-panel split-panel-blue flex items-center justify-center p-12">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-white/70">
              WEEKLY SPRINTS • PEER REVIEWS
            </span>
          </div>
        </div>
        
        {/* Right Content */}
        <div className="relative p-12 lg:p-16">
          <div className="build-text max-w-md">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Learn by Building
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              Short lessons. Real tasks. Every module ends with a project you can add to your portfolio.
            </p>
            <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
              See the projects
              <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* Floating Cards */}
          <div className="hidden lg:block relative h-[300px] mt-12">
            <div className="build-card floating-card absolute w-[200px] h-[200px] left-0 top-0">
              <img src="/images/build_workspace.jpg" alt="Workspace" className="w-full h-full object-cover" />
            </div>
            <div className="build-card floating-card absolute w-[140px] h-[140px] right-[20%] top-[20%]">
              <img src="/images/build_mentor.jpg" alt="Mentor" className="w-full h-full object-cover" />
            </div>
            <div className="build-card floating-card absolute w-[160px] h-[160px] left-[10%] bottom-0">
              <img src="/images/build_community.jpg" alt="Community" className="w-full h-full object-cover" />
            </div>
            <Sparkles className="absolute right-[10%] top-0 text-coral sparkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Community Section
function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.community-text',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.community-tile',
        { scale: 0.85, y: 60, opacity: 0 },
        {
          scale: 1, y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite">
      <div className="max-w-7xl mx-auto px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="community-text">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              A Community That Builds Together
            </h2>
            <p className="text-lg text-text-secondary max-w-md">
              Share work, get feedback, and find collaborators. Our community is active daily—not just a chat archive.
            </p>
          </div>
          
          {/* Collage */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Large Photo */}
            <div className="community-tile floating-card absolute w-[300px] h-[340px] left-[5%] top-[5%]">
              <img src="/images/community_collage_01.jpg" alt="Team" className="w-full h-full object-cover" />
            </div>
            
            {/* Small Photo */}
            <div className="community-tile floating-card absolute w-[140px] h-[140px] right-[5%] top-[10%]">
              <img src="/images/community_collage_02.jpg" alt="Collaboration" className="w-full h-full object-cover" />
            </div>
            
            {/* Blue Stat Card */}
            <div className="community-tile stat-card-blue absolute w-[220px] h-[180px] left-[10%] top-[55%] flex flex-col items-center justify-center">
              <span className="font-display font-bold text-5xl">4.9/5</span>
              <span className="text-white/80 text-sm mt-2">Average session rating</span>
            </div>
            
            {/* Coral Stat Card */}
            <div className="community-tile stat-card-coral absolute w-[180px] h-[180px] right-[15%] top-[45%] flex flex-col items-center justify-center">
              <span className="font-display font-bold text-5xl">10k+</span>
              <span className="text-white/80 text-sm mt-2">Active builders</span>
            </div>
            
            {/* Wide Photo */}
            <div className="community-tile floating-card absolute w-[280px] h-[140px] right-[10%] bottom-[5%]">
              <img src="/images/community_collage_03.jpg" alt="Workshop" className="w-full h-full object-cover" />
            </div>
            
            <Sparkles className="absolute left-0 bottom-[30%] text-coral sparkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Certificate Section
function CertificateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-panel',
        { x: '-6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.cert-text',
        { x: '6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.cert-card',
        { y: '8vh', rotate: -5, opacity: 0 },
        {
          y: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Panel */}
        <div className="cert-panel split-panel-blue flex items-center justify-center p-12">
          <Award className="text-white/20" size={120} />
        </div>
        
        {/* Right Content */}
        <div className="relative p-12 lg:p-16">
          <div className="cert-text max-w-md">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Earn a Certificate
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              Complete the program, pass the project reviews, and receive a verified certificate you can share on LinkedIn.
            </p>
            <Link to="/certification" className="btn-primary inline-flex items-center gap-2">
              How certification works
              <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* Floating Cards */}
          <div className="hidden lg:block relative h-[300px] mt-12">
            <div className="cert-card floating-card absolute w-[220px] h-[220px] left-0 top-0">
              <img src="/images/certificate_main.jpg" alt="Certificate" className="w-full h-full object-cover" />
            </div>
            <div className="cert-card floating-card absolute w-[140px] h-[140px] right-[20%] top-[20%]">
              <img src="/images/mentor_main.jpg" alt="Mentor" className="w-full h-full object-cover" />
            </div>
            <div className="cert-card floating-card absolute w-[160px] h-[160px] left-[10%] bottom-0">
              <img src="/images/build_workspace.jpg" alt="Workspace" className="w-full h-full object-cover" />
            </div>
            <Sparkles className="absolute right-[10%] top-0 text-coral sparkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Mentorship Section
function MentorshipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mentor-panel',
        { x: '-6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.mentor-text',
        { x: '6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.mentor-card',
        { y: '8vh', rotate: -5, opacity: 0 },
        {
          y: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Panel */}
        <div className="mentor-panel split-panel-blue flex flex-col items-center justify-center p-12">
          <MessageCircle className="text-white/20 mb-4" size={80} />
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-white/70 text-center">
            WEEKLY OFFICE HOURS<br/>DIRECT MESSAGES
          </span>
        </div>
        
        {/* Right Content */}
        <div className="relative p-12 lg:p-16">
          <div className="mentor-text max-w-md">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              1:1 Mentorship
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              Get unstuck fast. Book sessions with mentors who've shipped AI products and coached teams.
            </p>
            <Link to="/careers" className="btn-primary inline-flex items-center gap-2">
              Meet the mentors
              <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* Floating Cards */}
          <div className="hidden lg:block relative h-[300px] mt-12">
            <div className="mentor-card floating-card absolute w-[200px] h-[200px] left-0 top-0">
              <img src="/images/mentor_main.jpg" alt="Mentor" className="w-full h-full object-cover" />
            </div>
            <div className="mentor-card floating-card absolute w-[140px] h-[140px] right-[20%] top-[20%]">
              <img src="/images/build_community.jpg" alt="Community" className="w-full h-full object-cover" />
            </div>
            <div className="mentor-card floating-card absolute w-[160px] h-[160px] left-[10%] bottom-0">
              <img src="/images/hero_certificate.jpg" alt="Certificate" className="w-full h-full object-cover" />
            </div>
            <Sparkles className="absolute right-[10%] top-0 text-coral sparkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Career Section
function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.career-panel',
        { x: '-6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.career-text',
        { x: '6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.career-card',
        { y: '8vh', rotate: -5, opacity: 0 },
        {
          y: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.career-badge',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Panel */}
        <div className="career-panel split-panel-blue flex flex-col items-center justify-center p-12 relative">
          <Briefcase className="text-white/20 mb-4" size={80} />
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-white/70 text-center">
            PORTFOLIO REVIEWS<br/>JOB TEMPLATES
          </span>
          <div className="career-badge absolute top-8 right-8 bg-coral text-white px-4 py-2 rounded-full text-sm font-semibold">
            New
          </div>
        </div>
        
        {/* Right Content */}
        <div className="relative p-12 lg:p-16">
          <div className="career-text max-w-md">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Built for Your Career
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              Freelance, land a new role, or launch a product. The curriculum is designed around outcomes that matter.
            </p>
            <Link to="/careers" className="btn-primary inline-flex items-center gap-2">
              Explore career paths
              <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* Floating Cards */}
          <div className="hidden lg:block relative h-[300px] mt-12">
            <div className="career-card floating-card absolute w-[200px] h-[200px] left-0 top-0">
              <img src="/images/career_workspace.jpg" alt="Workspace" className="w-full h-full object-cover" />
            </div>
            <div className="career-card floating-card absolute w-[140px] h-[140px] right-[20%] top-[20%]">
              <img src="/images/build_mentor.jpg" alt="Mentor" className="w-full h-full object-cover" />
            </div>
            <div className="career-card floating-card absolute w-[160px] h-[160px] left-[10%] bottom-0">
              <img src="/images/build_community.jpg" alt="Community" className="w-full h-full object-cover" />
            </div>
            <Sparkles className="absolute right-[10%] top-0 text-coral sparkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Join Community Section
function JoinCommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.join-text',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.join-tile',
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.6,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite">
      <div className="max-w-7xl mx-auto px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="join-text">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Join 10,000+ Learners
            </h2>
            <p className="text-lg text-text-secondary max-w-md">
              A global community of designers, developers, marketers, and founders learning AI together.
            </p>
          </div>
          
          {/* Collage */}
          <div className="relative h-[500px] hidden lg:block">
            <div className="join-tile floating-card absolute w-[300px] h-[340px] left-[5%] top-[5%]">
              <img src="/images/community_collage_01.jpg" alt="Team" className="w-full h-full object-cover" />
            </div>
            <div className="join-tile floating-card absolute w-[140px] h-[140px] right-[5%] top-[10%]">
              <img src="/images/community_collage_02.jpg" alt="Collaboration" className="w-full h-full object-cover" />
            </div>
            <div className="join-tile stat-card-blue absolute w-[220px] h-[180px] left-[10%] top-[55%] flex flex-col items-center justify-center">
              <span className="font-display font-bold text-5xl">120+</span>
              <span className="text-white/80 text-sm mt-2">Countries represented</span>
            </div>
            <div className="join-tile stat-card-coral absolute w-[180px] h-[180px] right-[15%] top-[45%] flex flex-col items-center justify-center">
              <span className="font-display font-bold text-5xl">3x</span>
              <span className="text-white/80 text-sm mt-2 text-center px-4">More likely to finish with a study group</span>
            </div>
            <div className="join-tile floating-card absolute w-[280px] h-[140px] right-[10%] bottom-[5%]">
              <img src="/images/community_collage_03.jpg" alt="Workshop" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Master Skills Section
function MasterSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.skills-card',
        { y: 60, scale: 0.96, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const skills = [
    {
      title: 'Learn by Doing',
      description: 'Projects over lectures. Feedback over theory.',
      icon: FolderKanban,
    },
    {
      title: 'Real Tools',
      description: 'ChatGPT, Claude, Midjourney, Runway, Make, and more.',
      icon: Briefcase,
    },
    {
      title: 'Flexible Pace',
      description: 'Full-time or part-time. Pick a track that fits.',
      icon: Award,
    },
    {
      title: 'Community Support',
      description: 'Study groups, peer reviews, and mentor access.',
      icon: Users,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite">
      <div className="max-w-7xl mx-auto px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Header */}
          <div className="skills-header">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Master AI Skills
            </h2>
            <p className="text-lg text-text-secondary max-w-md">
              Short, focused modules that fit into your week—and stick long-term.
            </p>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`skills-card bg-white card-border-sm p-6 ${
                  index === 1 ? '-rotate-1' : ''
                }`}
              >
                <skill.icon className="text-coral mb-4" size={28} />
                <h3 className="font-display font-semibold text-lg mb-2">{skill.title}</h3>
                <p className="text-text-secondary text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Start Journey Section
function StartJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.journey-panel',
        { x: '-6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.journey-text',
        { x: '6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.journey-card',
        { y: '8vh', rotate: -5, opacity: 0 },
        {
          y: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Panel */}
        <div className="journey-panel split-panel-blue flex items-center justify-center p-12">
          <Users className="text-white/20" size={120} />
        </div>
        
        {/* Right Content */}
        <div className="relative p-12 lg:p-16">
          <div className="journey-text max-w-md">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Start Your Journey
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              Free trial. No credit card. Get your first project started in under an hour.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
                Start free
                <ArrowRight size={18} />
              </Link>
              <Link to="/courses" className="btn-secondary">
                Talk to us
              </Link>
            </div>
          </div>
          
          {/* Floating Cards */}
          <div className="hidden lg:block relative h-[300px] mt-12">
            <div className="journey-card floating-card absolute w-[200px] h-[200px] left-0 top-0">
              <img src="/images/journey_certificate.jpg" alt="Certificate" className="w-full h-full object-cover" />
            </div>
            <div className="journey-card floating-card absolute w-[140px] h-[140px] right-[20%] top-[20%]">
              <img src="/images/build_mentor.jpg" alt="Mentor" className="w-full h-full object-cover" />
            </div>
            <div className="journey-card floating-card absolute w-[160px] h-[160px] left-[10%] bottom-0">
              <img src="/images/build_workspace.jpg" alt="Workspace" className="w-full h-full object-cover" />
            </div>
            <Sparkles className="absolute right-[10%] top-0 text-coral sparkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Future Section
function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.future-panel',
        { x: '-6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.future-text',
        { x: '6vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );
      
      gsap.fromTo('.future-card',
        { y: '8vh', rotate: -5, opacity: 0 },
        {
          y: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-offwhite overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Panel */}
        <div className="future-panel split-panel-blue flex items-center justify-center p-12">
          <Award className="text-white/20" size={120} />
        </div>
        
        {/* Right Content */}
        <div className="relative p-12 lg:p-16">
          <div className="future-text max-w-md">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Your Future Starts Now
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              AI won't wait. The best time to start building was last year. The second best time is today.
            </p>
            <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
              Start free
              <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* Floating Cards */}
          <div className="hidden lg:block relative h-[300px] mt-12">
            <div className="future-card floating-card absolute w-[200px] h-[200px] left-0 top-0">
              <img src="/images/future_mentor.jpg" alt="Mentor" className="w-full h-full object-cover" />
            </div>
            <div className="future-card floating-card absolute w-[140px] h-[140px] right-[20%] top-[20%]">
              <img src="/images/build_community.jpg" alt="Community" className="w-full h-full object-cover" />
            </div>
            <div className="future-card floating-card absolute w-[160px] h-[160px] left-[10%] bottom-0">
              <img src="/images/hero_certificate.jpg" alt="Certificate" className="w-full h-full object-cover" />
            </div>
            <Sparkles className="absolute right-[10%] top-0 text-coral sparkle" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Main HomePage Component
export default function HomePage() {
  return (
    <main className="bg-offwhite">
      <HeroSection />
      <WhatYouLearnSection />
      <LearnByBuildingSection />
      <CommunitySection />
      <CertificateSection />
      <MentorshipSection />
      <CareerSection />
      <JoinCommunitySection />
      <MasterSkillsSection />
      <StartJourneySection />
      <FutureSection />
    </main>
  );
}
