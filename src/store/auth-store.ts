import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData } from '@/src/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock API functions (replace with real API calls)
const mockLogin = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (credentials.email === 'recruiter@test.com' && credentials.password === 'password') {
    return {
      user: {
        id: '1',
        email: 'recruiter@test.com',
        name: 'John Recruiter',
        role: 'recruiter',
        company: 'Tech Corp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      token: 'mock-token-recruiter'
    };
  }
  
  if (credentials.email === 'candidate@test.com' && credentials.password === 'password') {
    return {
      user: {
        id: '2',
        email: 'candidate@test.com',
        name: 'Jane Candidate',
        role: 'candidate',
        skills: ['React', 'TypeScript', 'Node.js'],
        experience: '3 years',
        education: 'Bachelor of Science in Computer Science',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      token: 'mock-token-candidate'
    };
  }
  
  throw new Error('Invalid credentials');
};

const mockRegister = async (data: RegisterData): Promise<{ user: User; token: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    user: {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      company: data.company,
      skills: data.role === 'candidate' ? [] : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    token: `mock-token-${data.role}-${Date.now()}`
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const { user, token } = await mockLogin(credentials);
          set({ user, token, isLoading: false });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        
        try {
          const { user, token } = await mockRegister(data);
          set({ user, token, isLoading: false });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false 
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
        // Redirect to login page after logout
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });
        
        try {
          const currentUser = get().user;
          if (!currentUser) {
            throw new Error('No user logged in');
          }
          
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const updatedUser = { ...currentUser, ...data, updatedAt: new Date().toISOString() };
          set({ user: updatedUser, isLoading: false });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Profile update failed',
            isLoading: false 
          });
          return false;
        }
      },

      clearError: () => set({ error: null }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token
      })
    }
  )
);

// Hook for easier usage
export const useAuth = () => {
  const store = useAuthStore();
  
  return {
    ...store,
    isAuthenticated: !!store.user && !!store.token,
    isRecruiter: store.user?.role === 'recruiter',
    isCandidate: store.user?.role === 'candidate'
  };
};
