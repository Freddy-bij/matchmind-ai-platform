// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'recruiter' | 'candidate';
  company?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
  role: 'recruiter' | 'candidate';
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'recruiter' | 'candidate';
  company?: string;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  postedDate: string;
  status: 'active' | 'closed' | 'filled';
  recruiterId: string;
  matchScore?: number;
  aiAnalysis?: {
    keySkills: string[];
    experienceLevel: string;
    estimatedSalary?: string;
  };
}

export interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  location: string;
}

// Resume Types
export interface Resume {
  id: string;
  candidateId: string;
  fileName: string;
  fileUrl: string;
  parsedData: {
    name: string;
    email: string;
    skills: string[];
    experience: string;
    education: string;
  };
  uploadedAt: string;
}

// Application Types
export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  appliedDate: string;
  matchScore: number;
  aiExplanation?: string;
  skillGap?: string[];
}

// Matching Types
export interface MatchResult {
  candidateId: string;
  jobId: string;
  matchScore: number;
  aiExplanation: string;
  skillGap: string[];
  strengths: string[];
}

export interface CandidateMatch {
  candidate: User;
  matchScore: number;
  aiExplanation: string;
  skillGap: string[];
  appliedJobs: string[];
}

export interface JobMatch {
  job: Job;
  matchScore: number;
  aiExplanation: string;
  skillGap: string[];
  status: 'applied' | 'saved' | 'new';
}

// Chat Types
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file';
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: string;
}

// Dashboard Types
export interface DashboardStats {
  totalJobs: number;
  totalApplications: number;
  avgMatchScore: number;
  interviewsScheduled: number;
  activeCandidates: number;
  newMatches: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
