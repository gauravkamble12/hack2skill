import { sanitizeInput, sanitizePhone, validatePhone, API_BASE_URL, endpoints } from '../lib/api';

describe('API Configuration', () => {
  test('API_BASE_URL should be defined', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
  });

  test('endpoints should have all required routes', () => {
    expect(endpoints).toHaveProperty('chat');
    expect(endpoints).toHaveProperty('elections');
    expect(endpoints).toHaveProperty('candidates');
    expect(endpoints).toHaveProperty('eligibility');
    expect(endpoints).toHaveProperty('notifications');
  });

  test('endpoints should be valid URLs', () => {
    expect(endpoints.chat).toMatch(/^https?:\/\//);
  });
});

describe('Input Sanitization', () => {
  describe('sanitizeInput', () => {
    test('should remove HTML tags', () => {
      const result = sanitizeInput('<script>alert(1)</script>hello');
      expect(result).not.toContain('<script>');
    });

    test('should remove angle brackets', () => {
      const result = sanitizeInput('<test>message');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    test('should trim whitespace', () => {
      const result = sanitizeInput('  hello  ');
      expect(result).toBe('hello');
    });

    test('should respect maxLength', () => {
      const longInput = 'a'.repeat(600);
      const result = sanitizeInput(longInput, 500);
      expect(result.length).toBe(500);
    });

    test('should handle empty input', () => {
      const result = sanitizeInput('');
      expect(result).toBe('');
    });
  });

  describe('sanitizePhone', () => {
    test('should remove non-digit characters', () => {
      const result = sanitizePhone('98765-43210');
      expect(result).toBe('9876543210');
    });

    test('should limit to 10 digits', () => {
      const result = sanitizePhone('9876543210123');
      expect(result).toBe('9876543210');
    });

    test('should handle empty input', () => {
      const result = sanitizePhone('');
      expect(result).toBe('');
    });
  });

  describe('validatePhone', () => {
    test('should return true for valid 10-digit number', () => {
      expect(validatePhone('9876543210')).toBe(true);
    });

    test('should return false for less than 10 digits', () => {
      expect(validatePhone('987654321')).toBe(false);
    });

    test('should return false for more than 10 digits', () => {
      expect(validatePhone('98765432101')).toBe(false);
    });

    test('should return false for non-digit characters', () => {
      expect(validatePhone('98765-3210')).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(validatePhone('')).toBe(false);
    });
  });
});