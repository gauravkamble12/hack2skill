const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:5000';
  }

  return window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : `https://${window.location.hostname.replace('frontend', 'backend')}`;
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