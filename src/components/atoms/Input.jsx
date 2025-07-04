import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary/20
    ${error 
      ? 'border-error focus:border-error' 
      : 'border-gray-200 focus:border-primary'
    }
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
    ${icon && iconPosition === 'left' ? 'pl-12' : ''}
    ${icon && iconPosition === 'right' ? 'pr-12' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <ApperIcon
              name={icon}
              size={16}
              className={`${isFocused ? 'text-primary' : 'text-gray-400'} transition-colors`}
            />
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <ApperIcon
              name={icon}
              size={16}
              className={`${isFocused ? 'text-primary' : 'text-gray-400'} transition-colors`}
            />
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-error flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={12} />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;