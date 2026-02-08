import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Redirect to onboarding
    window.location.href = '/onboarding';
  };

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-coral rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">M</span>
            </div>
            <span className="font-display font-bold text-black text-xl">
              Masterly AI
            </span>
          </Link>
        </div>
        
        {/* Card */}
        <div className="bg-white card-border p-8">
          <h1 className="font-display font-bold text-2xl mb-2">Create your account</h1>
          <p className="text-text-secondary mb-6">
            Start your AI learning journey today
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-coral transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-coral transition-all"
                  required
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-coral transition-all"
                  required
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-coral transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-black"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-text-secondary text-xs mt-2">
                Must be at least 8 characters with a number and special character
              </p>
            </div>
            
            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-2 border-black text-coral focus:ring-coral"
                required
              />
              <label htmlFor="terms" className="text-sm text-text-secondary">
                I agree to the{' '}
                <Link to="#" className="text-coral hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="#" className="text-coral hover:underline">Privacy Policy</Link>
              </label>
            </div>
            
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !agreedToTerms}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-text-secondary text-sm">or</span>
            <div className="flex-1 h-px bg-black/10" />
          </div>
          
          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-black rounded-xl hover:bg-offwhite transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          {/* Login Link */}
          <p className="text-center mt-6 text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-coral font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        
        {/* Benefits */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {[
            { icon: CheckCircle, text: 'Free to start' },
            { icon: CheckCircle, text: 'No credit card required' },
            { icon: CheckCircle, text: 'Cancel anytime' },
            { icon: CheckCircle, text: 'Lifetime access' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
              <item.icon size={16} className="text-coral" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        
        {/* Back Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-text-secondary hover:text-black">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
