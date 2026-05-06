const getApiBaseUrl = (): string => {
  // 1. Prioritize environment variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 2. Local development fallback
  if (typeof window === 'undefined') {
    return 'http://localhost:5000';
  }

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // 3. Vercel production fallback: Replace frontend subdomain with backend subdomain
  // Example: matdata-mitra-frontend.vercel.app -> matdata-mitra-backend.vercel.app
  if (window.location.hostname.includes('vercel.app')) {
    if (window.location.hostname.includes('frontend')) {
      return `https://${window.location.hostname.replace('frontend', 'backend')}`;
    }
    // Hardcoded fallback for this specific project if env var is missing
    return 'https://backend-zeta-gilt-i7moh0tq0f.vercel.app';
  }

  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

export const endpoints = {
  chat: `${API_BASE_URL}/api/chat`,
  elections: `${API_BASE_URL}/api/elections`,
  candidates: `${API_BASE_URL}/api/candidates`,
  eligibility: `${API_BASE_URL}/api/eligibility`,
  external: `${API_BASE_URL}/api/external`,
  live: `${API_BASE_URL}/api/live`,
  notifications: `${API_BASE_URL}/api/notifications`,
};

export const sanitizeInput = (input: string, maxLength: number = 500): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .trim()
    .slice(0, maxLength);
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/\D/g, '').slice(0, 10);
};

export const validatePhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone);
};