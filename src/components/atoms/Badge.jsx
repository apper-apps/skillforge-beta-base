import ApperIcon from '@/components/ApperIcon';

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary',
    secondary: 'bg-gradient-to-r from-secondary/10 to-purple-200 text-secondary',
    accent: 'bg-gradient-to-r from-accent/10 to-yellow-200 text-accent',
    success: 'bg-gradient-to-r from-success/10 to-green-200 text-success',
    warning: 'bg-gradient-to-r from-warning/10 to-yellow-200 text-warning',
    error: 'bg-gradient-to-r from-error/10 to-red-200 text-error',
    info: 'bg-gradient-to-r from-info/10 to-blue-200 text-info',
  };

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const renderIcon = () => {
    if (icon) {
      return <ApperIcon name={icon} size={size === 'small' ? 12 : size === 'large' ? 16 : 14} />;
    }
    return null;
  };

  return (
    <span className={badgeClasses} {...props}>
      {iconPosition === 'left' && renderIcon() && (
        <span className={children ? 'mr-1' : ''}>{renderIcon()}</span>
      )}
      {children}
      {iconPosition === 'right' && renderIcon() && (
        <span className={children ? 'ml-1' : ''}>{renderIcon()}</span>
      )}
    </span>
  );
};

export default Badge;