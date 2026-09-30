const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = {
  name: (value) => (value.trim().length < 2 ? 'Enter your name (2+ characters)' : ''),
  email: (value) => (EMAIL_PATTERN.test(value.trim()) ? '' : 'Enter a valid email address'),
  password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : ''),
};

// Returns an object like { email: 'message' } containing only the fields that failed
export function validate(values, fields) {
  const errors = {};
  fields.forEach((field) => {
    const message = rules[field](values[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

export const hasErrors = (errors) => Object.keys(errors).length > 0;
