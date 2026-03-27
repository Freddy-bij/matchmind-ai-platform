'use client';

import React from 'react';
import { useAuth } from '@/src/hooks/useAuth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      window.location.href = '/auth/login';
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {children}
    </div>
  );
}
