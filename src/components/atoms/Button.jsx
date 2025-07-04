import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 focus:ring-primary',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary',
    accent: 'bg-gradient-to-r from-accent to-yellow-500 text-white hover:shadow-lg hover:scale-105 focus:ring-accent',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg hover:scale-105 focus:ring-error',
    success: 'bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg hover:scale-105 focus:ring-success',
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const renderIcon = () => {
    if (loading) {
      return <ApperIcon name="Loader2" size={16} className="animate-spin" />;
    }
    if (icon) {
      return <ApperIcon name={icon} size={16} />;
    }
    return null;
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${buttonClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {iconPosition === 'left' && renderIcon() && (
        <span className={children ? 'mr-2' : ''}>{renderIcon()}</span>
      )}
      {children}
      {iconPosition === 'right' && renderIcon() && (
        <span className={children ? 'ml-2' : ''}>{renderIcon()}</span>
      )}
    </motion.button>
  );
};

export default Button;