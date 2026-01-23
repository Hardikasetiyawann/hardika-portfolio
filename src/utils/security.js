import DOMPurify from 'dompurify';

/**
 * Validate email format using RFC 5322 simplified regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validate form input - check length and content
 * @param {string} input - Input to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @returns {boolean} - True if valid
 */
export const isValidInput = (input, minLength = 1, maxLength = 5000) => {
  if (typeof input !== 'string') return false;
  const trimmed = input.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
};

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  // Remove any HTML tags and scripts
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  }).trim();
};

/**
 * Validate and sanitize form data
 * @param {object} formData - Form data object {name, email, message}
 * @returns {object} - Validation result {isValid: boolean, errors: object, sanitized: object}
 */
export const validateFormData = (formData) => {
  const errors = {};
  const sanitized = {};

  if (!isValidInput(formData.name, 2, 100)) {
    errors.name = 'Nama harus 2-100 karakter';
  } else {
    sanitized.name = sanitizeInput(formData.name);
  }

  if (!isValidInput(formData.email, 5, 254)) {
    errors.email = 'Email tidak valid';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Format email tidak valid';
  } else {
    sanitized.email = sanitizeInput(formData.email);
  }

  if (!isValidInput(formData.message, 10, 5000)) {
    errors.message = 'Pesan harus 10-5000 karakter';
  } else {
    sanitized.message = sanitizeInput(formData.message);
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized
  };
};

/**
 * Rate limiting - check if action is allowed based on time window
 * @param {string} key - Unique key for rate limiting (e.g., 'contact-form')
 * @param {number} maxAttempts - Max attempts allowed
 * @param {number} timeWindowMs - Time window in milliseconds
 * @returns {object} - {allowed: boolean, remaining: number, resetTime: number}
 */
export const checkRateLimit = (key, maxAttempts = 3, timeWindowMs = 60000) => {
  const storageKey = `ratelimit_${key}`;
  const now = Date.now();

  const stored = localStorage.getItem(storageKey);
  let attempts = [];

  if (stored) {
    try {
      attempts = JSON.parse(stored).filter(timestamp => now - timestamp < timeWindowMs);
    } catch (e) {
      attempts = [];
    }
  }

  const allowed = attempts.length < maxAttempts;
  const remaining = Math.max(0, maxAttempts - attempts.length);
  const resetTime = attempts.length > 0 ? attempts[0] + timeWindowMs : 0;

  if (allowed) {
    attempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(attempts));
  }

  return {
    allowed,
    remaining,
    resetTime,
    resetInSeconds: resetTime > 0 ? Math.ceil((resetTime - now) / 1000) : 0
  };
};

/**
 * Generate CSRF token (for future use with backend)
 * @returns {string} - CSRF token
 */
export const generateCSRFToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

/**
 * Get stored CSRF token or create new one
 * @returns {string} - CSRF token
 */
export const getCSRFToken = () => {
  let token = sessionStorage.getItem('csrf_token');
  if (!token) {
    token = generateCSRFToken();
    sessionStorage.setItem('csrf_token', token);
  }
  return token;
};
