'use client';

import { useAuth } from '@/src/store/auth-store';

// Re-export the useAuth hook from the store for backward compatibility
export { useAuth };

// Export the store directly if needed
export { useAuthStore } from '@/src/store/auth-store';
