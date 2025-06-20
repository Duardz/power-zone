// src/lib/utils/validation.ts
// Simple validation utilities without external dependencies

// Email validation with security checks
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  
  // Length check
  if (email.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }
  
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  // Security pattern checks
  const suspiciousPatterns = [
    /(.)\1{4,}/,        // Repeated characters
    /<script/i,         // Script tags
    /javascript:/i,     // JavaScript protocol
    /on\w+=/i,          // Event handlers
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(email)) {
      return { valid: false, error: 'Invalid email format' };
    }
  }
  
  return { valid: true };
}

// Sanitize text input (simple version without DOMPurify)
export function sanitizeText(
  input: string, 
  maxLength: number
): string {
  if (!input || typeof input !== 'string') return '';
  
  // First, trim and limit length
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remove all HTML tags
  sanitized = sanitized.replace(/<[^>]*>?/gm, '');
  
  // Basic XSS prevention - escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  return sanitized;
}

// Phone number validation
export function validatePhone(phone: string): { valid: boolean; sanitized: string } {
  if (!phone) return { valid: true, sanitized: '' }; // Phone is optional
  
  // Remove all non-numeric characters except + and spaces
  const sanitized = phone.replace(/[^0-9+\s-]/g, '').slice(0, 20);
  
  // Basic validation
  const phoneRegex = /^[\d\s+-]{7,20}$/;
  const valid = phoneRegex.test(sanitized);
  
  return { valid, sanitized };
}

// URL validation for image URLs
export function validateImageUrl(url: string): { valid: boolean; error?: string } {
  if (!url) return { valid: true }; // URL is optional
  
  try {
    const parsed = new URL(url);
    
    // Only allow HTTPS
    if (parsed.protocol !== 'https:') {
      return { valid: false, error: 'Only HTTPS URLs are allowed' };
    }
    
    // Check for suspicious patterns
    const suspicious = [
      'javascript:',
      'data:',
      'vbscript:',
      'file:',
      'about:'
    ];
    
    for (const pattern of suspicious) {
      if (url.toLowerCase().includes(pattern)) {
        return { valid: false, error: 'Invalid URL format' };
      }
    }
    
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

// Simple rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  // Clean up old entries
  for (const [k, v] of rateLimitStore.entries()) {
    if (v.resetTime < now) {
      rateLimitStore.delete(k);
    }
  }
  
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }
  
  if (entry.count >= limit) {
    return false;
  }
  
  entry.count++;
  return true;
}

// XSS detection
export function detectXSS(input: string): boolean {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<img[^>]*onerror\s*=/gi,
    /<svg[^>]*onload\s*=/gi
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}