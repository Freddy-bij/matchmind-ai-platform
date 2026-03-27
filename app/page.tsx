'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    // Redirect to login page
    router.push('login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A66C2] mx-auto mb-4"></div>
        <p className="text-[#64748B]">Redirecting to login...</p>
      </div>
    </div>
  );
}
