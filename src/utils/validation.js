export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    errors: {
      minLength: password.length < minLength,
      hasUpperCase: !hasUpperCase,
      hasLowerCase: !hasLowerCase,
      hasNumbers: !hasNumbers,
      hasSpecialChar: !hasSpecialChar,
    }
  };
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength;
};

export const validateNumber = (value) => {
  return !isNaN(value) && isFinite(value);
};

export const validatePositiveNumber = (value) => {
  return validateNumber(value) && parseFloat(value) > 0;
};

export const validateRange = (value, min, max) => {
  const num = parseFloat(value);
  return validateNumber(num) && num >= min && num <= max;
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateDate = (date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const validateFutureDate = (date) => {
  return validateDate(date) && date > new Date();
};

export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const rules = validationRules[field];
    const value = formData[field];
    
    if (rules.required && !validateRequired(value)) {
      errors[field] = 'This field is required';
      return;
    }
    
    if (rules.email && value && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address';
      return;
    }
    
    if (rules.phone && value && !validatePhone(value)) {
      errors[field] = 'Please enter a valid phone number';
      return;
    }
    
    if (rules.minLength && value && !validateMinLength(value, rules.minLength)) {
      errors[field] = `Must be at least ${rules.minLength} characters`;
      return;
    }
    
    if (rules.maxLength && value && !validateMaxLength(value, rules.maxLength)) {
      errors[field] = `Must be no more than ${rules.maxLength} characters`;
      return;
    }
    
    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors[field] = rules.patternMessage || 'Invalid format';
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};