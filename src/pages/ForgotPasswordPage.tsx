import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
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
          {!isSubmitted ? (
            <>
              <h1 className="font-display font-bold text-2xl mb-2">Reset your password</h1>
              <p className="text-text-secondary mb-6">
                Enter your email address and we will send you instructions to reset your password.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
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
                
                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="font-display font-bold text-2xl mb-2">Check your email</h2>
              <p className="text-text-secondary mb-6">
                We have sent password reset instructions to <strong>{email}</strong>
              </p>
              <p className="text-sm text-text-secondary mb-6">
                Did not receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-coral hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
          )}
          
          {/* Back to Login */}
          <div className="mt-6 pt-6 border-t border-black/10">
            <Link 
              to="/login"
              className="flex items-center justify-center gap-2 text-text-secondary hover:text-black transition-colors"
            >
              <ArrowLeft size={18} />
              Back to sign in
            </Link>
          </div>
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
