import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message, onRetry, type = 'general' }) => {
  const getErrorConfig = () => {
    switch (type) {
      case 'workshop':
        return {
          icon: 'BookOpen',
          title: 'Workshop Not Found',
          description: 'The workshop you\'re looking for seems to have moved or been removed.',
        };
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Connection Problem',
          description: 'Please check your internet connection and try again.',
        };
      case 'enrollment':
        return {
          icon: 'UserX',
          title: 'Enrollment Failed',
          description: 'There was an issue with your enrollment. Please try again.',
        };
      default:
        return {
          icon: 'AlertTriangle',
          title: 'Something Went Wrong',
          description: 'We encountered an unexpected error. Please try again.',
        };
    }
  };

  const config = getErrorConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-full p-6 mb-6">
        <ApperIcon 
          name={config.icon} 
          size={48} 
          className="text-error"
        />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
        {config.title}
      </h3>
      
      <p className="text-gray-600 mb-2 max-w-md">
        {config.description}
      </p>
      
      {message && (
        <p className="text-sm text-gray-500 mb-6 bg-gray-50 px-4 py-2 rounded-lg">
          {message}
        </p>
      )}
      
      <div className="flex gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </button>
        )}
        
        <button
          onClick={() => window.history.back()}
          className="btn-secondary flex items-center gap-2"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          Go Back
        </button>
      </div>
    </motion.div>
  );
};

export default Error;