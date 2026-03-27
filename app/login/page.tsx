'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login({ email, password, role });
    if (!success) {
      setError('Invalid credentials. Try recruiter@test.com / candidate@test.com with password "password"');
    } else {
      router.push('/recruiter');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#0A66C2]">
            MatchMind AI
          </CardTitle>
          <p className="text-center text-[#64748B]">
            Match talent with opportunity, not keywords
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#64748B]">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={role === 'candidate' ? 'primary' : 'secondary'}
                  onClick={() => setRole('candidate')}
                  className="w-full"
                >
                  Candidate
                </Button>
                <Button
                  type="button"
                  variant={role === 'recruiter' ? 'primary' : 'secondary'}
                  onClick={() => setRole('recruiter')}
                  className="w-full"
                >
                  Recruiter
                </Button>
              </div>
            </div>
            
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
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[#64748B]">
              Don't have an account?{' '}
              <button 
                className="text-[#0A66C2] font-medium hover:underline"
                onClick={() => router.push('/register')}
              >
                Sign up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
