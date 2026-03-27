'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate' as 'recruiter' | 'candidate',
    company: ''
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      company: formData.role === 'recruiter' ? formData.company : undefined
    });
    
    if (!success) {
      setError('Registration failed. Please try again.');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#0A66C2]">
            Join MatchMind AI
          </CardTitle>
          <p className="text-center text-[#64748B]">
            Start your journey to perfect matches
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
            
            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            
            <Input
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
            
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#64748B]">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={formData.role === 'candidate' ? 'primary' : 'secondary'}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'candidate' }))}
                  className="w-full"
                >
                  Candidate
                </Button>
                <Button
                  type="button"
                  variant={formData.role === 'recruiter' ? 'primary' : 'secondary'}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'recruiter' }))}
                  className="w-full"
                >
                  Recruiter
                </Button>
              </div>
            </div>
            
            {formData.role === 'recruiter' && (
              <Input
                name="company"
                label="Company Name"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter your company name"
                required
              />
            )}
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[#64748B]">
              Already have an account?{' '}
              <button 
                className="text-[#0A66C2] font-medium hover:underline"
                onClick={() => router.push('/login')}
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
