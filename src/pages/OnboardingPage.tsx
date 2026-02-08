import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Briefcase, GraduationCap, Lightbulb, Code, Palette, LineChart } from 'lucide-react';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    experience: '',
    background: '',
    timeCommitment: '',
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding and redirect to dashboard
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const isStepComplete = () => {
    switch (step) {
      case 1: return answers.goal !== '';
      case 2: return answers.experience !== '';
      case 3: return answers.background !== '';
      case 4: return answers.timeCommitment !== '';
      default: return false;
    }
  };

  const steps = [
    {
      title: 'What is your primary goal?',
      subtitle: 'This helps us recommend the best learning path for you.',
      options: [
        { value: 'career', label: 'Advance my career', icon: Briefcase, desc: 'Get promoted or switch to AI roles' },
        { value: 'freelance', label: 'Start freelancing', icon: Lightbulb, desc: 'Build a freelance AI business' },
        { value: 'business', label: 'Grow my business', icon: LineChart, desc: 'Use AI to scale my company' },
        { value: 'learn', label: 'Learn for fun', icon: GraduationCap, desc: 'Explore AI out of curiosity' },
      ],
      key: 'goal',
    },
    {
      title: 'What is your experience level?',
      subtitle: 'We will tailor the content to match your current skills.',
      options: [
        { value: 'beginner', label: 'Complete beginner', icon: GraduationCap, desc: 'No prior AI or coding experience' },
        { value: 'some', label: 'Some experience', icon: Lightbulb, desc: 'Used AI tools, want to go deeper' },
        { value: 'intermediate', label: 'Intermediate', icon: Code, desc: 'Built some projects, want to level up' },
        { value: 'advanced', label: 'Advanced', icon: Briefcase, desc: 'Experienced, looking for cutting-edge skills' },
      ],
      key: 'experience',
    },
    {
      title: 'What is your background?',
      subtitle: 'This helps us recommend relevant projects and examples.',
      options: [
        { value: 'tech', label: 'Tech/Engineering', icon: Code, desc: 'Developer, engineer, or technical role' },
        { value: 'creative', label: 'Creative', icon: Palette, desc: 'Designer, writer, or marketer' },
        { value: 'business', label: 'Business', icon: Briefcase, desc: 'Manager, consultant, or entrepreneur' },
        { value: 'other', label: 'Other', icon: GraduationCap, desc: 'Student, researcher, or other field' },
      ],
      key: 'background',
    },
    {
      title: 'How much time can you commit?',
      subtitle: 'We will create a schedule that works for you.',
      options: [
        { value: 'minimal', label: '1-2 hours/week', icon: Clock, desc: 'Casual learning pace' },
        { value: 'moderate', label: '3-5 hours/week', icon: Clock, desc: 'Steady progress' },
        { value: 'dedicated', label: '6-10 hours/week', icon: Clock, desc: 'Fast track learning' },
        { value: 'intensive', label: '10+ hours/week', icon: Clock, desc: 'Full immersion' },
      ],
      key: 'timeCommitment',
    },
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
        
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-black/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-coral transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Card */}
        <div className="bg-white card-border p-8">
          <h1 className="font-display font-bold text-2xl mb-2">{currentStep.title}</h1>
          <p className="text-text-secondary mb-8">{currentStep.subtitle}</p>
          
          {/* Options */}
          <div className="grid gap-4 mb-8">
            {currentStep.options.map((option) => (
              <button
                key={option.value}
                onClick={() => updateAnswer(currentStep.key, option.value)}
                className={`flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all ${
                  answers[currentStep.key as keyof typeof answers] === option.value
                    ? 'border-coral bg-coral/5'
                    : 'border-black/10 hover:border-black/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  answers[currentStep.key as keyof typeof answers] === option.value
                    ? 'bg-coral text-white'
                    : 'bg-offwhite text-text-secondary'
                }`}>
                  <option.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold">{option.label}</h3>
                  <p className="text-text-secondary text-sm">{option.desc}</p>
                </div>
                {answers[currentStep.key as keyof typeof answers] === option.value && (
                  <CheckCircle className="text-coral" size={24} />
                )}
              </button>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex gap-4">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-black rounded-xl hover:bg-offwhite transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === totalSteps ? 'Complete' : 'Continue'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        
        {/* Skip */}
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-sm text-text-secondary hover:text-black"
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
}

// Clock icon component
function Clock({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
