import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Courses', href: '/courses' },
      { name: 'Projects', href: '/dashboard/projects' },
      { name: 'Mentorship', href: '/careers' },
      { name: 'Community', href: '/testimonials' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Cookies', href: '#' },
    ],
  };
  
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-black text-white py-16 px-[7vw]">
      {/* CTA Section */}
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          Ready to start building?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="btn-primary text-center">
            Start free
          </Link>
          <Link to="/courses" className="btn-secondary border-white text-white hover:bg-white hover:text-black text-center">
            View pricing
          </Link>
        </div>
      </div>
      
      {/* Footer Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pt-12 border-t border-white/10">
        {/* Logo Column */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-white text-lg">
              Masterly AI
            </span>
          </Link>
          <p className="text-white/60 text-sm">
            Learn AI. Build real projects. Transform your career.
          </p>
        </div>
        
        {/* Product Links */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
            Product
          </h4>
          <ul className="space-y-3">
            {footerLinks.product.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Company Links */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
            Company
          </h4>
          <ul className="space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Legal Links */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
            Legal
          </h4>
          <ul className="space-y-3">
            {footerLinks.legal.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
        <p className="text-white/40 text-sm">
          © 2025 Masterly AI. All rights reserved.
        </p>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="text-white/40 hover:text-white transition-colors"
              aria-label={social.name}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
