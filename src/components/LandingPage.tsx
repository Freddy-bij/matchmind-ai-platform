'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Activity, 
  ChevronUp, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Brain,
  Briefcase
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Abstract Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MatchMind AI</span>
            </div>

            {/* Desktop Menu - Center */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavigation('#features')}
                className="text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavigation('#how-it-works')}
                className="text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
              >
                How It Works
              </button>
              <button 
                onClick={() => handleNavigation('#pricing')}
                className="text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation('#contact')}
                className="text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
              >
                Contact
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => handleNavigation('/login')}
                className="text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium mr-4"
              >
                Sign In
              </button>
              <button 
                onClick={() => handleNavigation('/register')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100">
              <div className="px-4 py-4 space-y-3">
                <button 
                  onClick={() => handleNavigation('#features')}
                  className="block w-full text-left text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavigation('#how-it-works')}
                  className="block w-full text-left text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => handleNavigation('#pricing')}
                  className="block w-full text-left text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => handleNavigation('#contact')}
                  className="block w-full text-left text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
                >
                  Contact
                </button>
                <button 
                  onClick={() => handleNavigation('/login')}
                  className="block w-full text-left text-gray-600 hover:text-blue-500 transition-colors text-sm font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleNavigation('/register')}
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Match talent with opportunity in <span className="text-blue-500">2026</span>,
                  <br />
                  <span className="text-blue-500">not keywords</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Modernized, professional hiring powered by intelligent matching, skill-focused evaluation, and candidate insight.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => handleNavigation('/register')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setShowDemo(true)}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 border border-blue-200"
                >
                  View Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side - App Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <img 
                    src="/1.png" 
                    alt="MatchMind AI Platform" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl opacity-10 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl opacity-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Highlights */}
      <section className="py-14 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Better Hiring, Faster Outcomes
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Precision Match</p>
              <h3 className="text-2xl font-semibold text-gray-900">94% Accuracy</h3>
              <p className="text-gray-600 mt-2">Intelligent semantic matching reduces false positives and saves you time.</p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Time Savings</p>
              <h3 className="text-2xl font-semibold text-gray-900">70% Faster</h3>
              <p className="text-gray-600 mt-2">Automated candidate screening and scoring keeps your team efficient.</p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Quality</p>
              <h3 className="text-2xl font-semibold text-gray-900">40% Better Leads</h3>
              <p className="text-gray-600 mt-2">Focus on high-fit talent and reduce churn with smarter selection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-14 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Key features that matter
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-900">Semantic AI Matching</h3>
              <p className="text-gray-600 mt-2">Beyond keywords: skills, context, and role fit in one score.</p>
            </div>
            <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-900">Bias-Reduced Selection</h3>
              <p className="text-gray-600 mt-2">Objective scoring removes manual bias and standardizes outcomes.</p>
            </div>
            <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-900">Instant Insights</h3>
              <p className="text-gray-600 mt-2">Clear analytics and reports for data-driven hiring decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Challenge & Our Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Traditional recruitment methods miss qualified candidates. Our AI understands skills, not just keywords.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <X className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Recruiter Pain Points</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-500 text-xs font-bold">✕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Keyword Limitations</h4>
                    <p className="text-gray-600 text-sm">Traditional searches miss candidates with relevant skills but different terminology</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-500 text-xs font-bold">✕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Time-Consuming Screening</h4>
                    <p className="text-gray-600 text-sm">Recruiters spend hours reviewing resumes that don't match requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-500 text-xs font-bold">✕</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Unconscious Bias</h4>
                    <p className="text-gray-600 text-sm">Manual screening introduces bias and inconsistent evaluation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI-Powered Solutions</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Semantic Understanding</h4>
                    <p className="text-gray-600 text-sm">Our AI comprehends skills, not just keywords</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Intelligent Matching</h4>
                    <p className="text-gray-600 text-sm">Reduce screening time by 70% with AI-powered candidate ranking and scoring</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Bias Reduction</h4>
                    <p className="text-gray-600 text-sm">Objective evaluation based on skills and qualifications, eliminating unconscious bias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Smart Recruitment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need to find perfect candidates efficiently.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 rounded-xl shadow-sm border border-gray-100 mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest product news</h3>
            <p className="text-gray-600 text-sm mb-4">Simplified experience, faster candidate matches, and a lean UI for professionals.</p>
            <ul className="space-y-2 text-gray-700">
              <li>• New: streamlined cards for quick insights</li>
              <li>• Updated: minimalist call-to-action buttons for high-clarity CTAs</li>
              <li>• Added: more concise reporting for recruitment metrics</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Semantic Matching */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Semantic Matching</h3>
              <p className="text-gray-600 text-sm">AI understands skills and context beyond keywords for top candidates.</p>
            </div>

            {/* Bias Reduction */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Bias Reduction</h3>
              <p className="text-gray-600 text-sm">Objective, skills-first ranking.
</p>
            </div>

            {/* AI Match Scores */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 mb-1">AI Match Scores</h3>
              <p className="text-gray-600 text-sm">Scorecards explain candidate relevance in clear, actionable terms.</p>
            </div>

            {/* Real-time Communication */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Real-time Communication</h3>
              <p className="text-gray-600 text-sm">Connect immediately and keep hiring in flow.</p>
            </div>

            {/* Reverse Matching */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Reverse Matching</h3>
              <p className="text-gray-600 text-sm">Jobs find qualified candidates proactively, not just candidates finding jobs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with MatchMind in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload</h3>
              <p className="text-gray-600">Post your job requirements or upload candidate resumes</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Match</h3>
              <p className="text-gray-600">Our AI analyzes and matches candidates based on skills and potential</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">Connect with matched candidates and start the hiring process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Match Score Demo */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See AI Matching in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the power of our AI-driven candidate matching system
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Match Score Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Candidate Match Score</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl font-bold">92%</span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-30 animate-pulse"></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="font-semibold text-gray-900">Excellent Match</div>
                      <div className="text-xs">Based on skills, experience, and potential</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">React Expertise</h4>
                    <p className="text-gray-600 text-sm">5+ years of React development experience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Team Leadership</h4>
                    <p className="text-gray-600 text-sm">Led teams of 5+ developers successfully</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cloud Architecture</h4>
                    <p className="text-gray-600 text-sm">Extensive AWS and cloud platform experience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-600 text-xs font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Skill Gap</h4>
                    <p className="text-gray-600 text-sm">Needs experience with enterprise security protocols</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI Recommendation</h4>
                    <p className="text-gray-600 text-sm">Strong candidate with 92% match. Consider for senior frontend role.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Explanation */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How AI Calculated This Score</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p><span className="font-semibold">Skills Analysis:</span> React, TypeScript, Node.js matched 95%</p>
                <p><span className="font-semibold">Experience Weight:</span> 5 years relevant experience scored 85%</p>
                <p><span className="font-semibold">Project Portfolio:</span> 3 relevant projects evaluated positively</p>
                <p><span className="font-semibold">Cultural Fit:</span> Communication style and leadership potential assessed</p>
                <p><span className="font-semibold">Learning Capacity:</span> Aptitude for new technologies considered high</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your recruitment needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Recruiter Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Recruiters</h3>
                <div className="text-3xl font-bold text-blue-500 mb-4">Free<span className="text-lg text-gray-600"> for now</span></div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Unlimited candidate searches</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">AI-powered matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleNavigation('/register?plan=recruiter')}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-shadow shadow-sm"
              >
                Start Recruiting
              </button>
            </div>

            {/* Job Seeker Plan */}
            <div className="bg-white rounded-lg p-7 shadow-sm border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Job Seekers</h3>
                <div className="text-3xl font-bold text-blue-500 mb-4">Free<span className="text-lg text-gray-600"> forever</span></div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">AI profile optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Job matching alerts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Direct recruiter connections</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Resume insights</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handleNavigation('/register?plan=seeker')}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-shadow shadow-sm"
              >
                Create Free Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Column */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">MatchMind AI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                AI-powered semantic matching for intelligent recruitment.
              </p>
            </div>
            
            {/* Product Column */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-blue-400 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-gray-400 hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-blue-400 transition-all hover:translate-x-1 inline-block">Pricing</a></li>
              </ul>
            </div>
            
            {/* Support Column */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-blue-400 uppercase tracking-wider">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+267 783 081 398</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>contact@matchmind.ai</span>
                </div>
                <button onClick={() => alert('Privacy Policy page coming soon!')} className="text-gray-400 hover:text-blue-400 transition-all hover:translate-x-1 inline-block mt-2">Privacy Policy</button>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-gray-700/50 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2026 MatchMind AI. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">MatchMind AI Demo</h2>
                <button 
                  onClick={() => setShowDemo(false)}
                  className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Demo Content */}
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Experience AI-Powered Matching</h3>
                  <p className="text-blue-700 mb-4">
                    See how our AI understands skills beyond keywords to find perfect candidate-job matches.
                  </p>
                  
                  {/* Demo Steps */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Upload Job Description</h4>
                        <p className="text-gray-600 text-sm">Paste or upload your job requirements</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">AI Analysis</h4>
                        <p className="text-gray-600 text-sm">Our AI analyzes skills, context, and potential</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Get Matched Candidates</h4>
                        <p className="text-gray-600 text-sm">Receive ranked candidates with match scores</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Demo Interface */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Match Results</h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                          <p className="text-sm text-gray-600">Senior React Developer</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-500">94%</div>
                          <div className="text-xs text-gray-600">Match Score</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">Mike Chen</h4>
                          <p className="text-sm text-gray-600">Full Stack Engineer</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-500">87%</div>
                          <div className="text-xs text-gray-600">Match Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      setShowDemo(false);
                      handleNavigation('/register');
                    }}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    Start Free Trial
                  </button>
                  <button 
                    onClick={() => setShowDemo(false)}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Close Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
