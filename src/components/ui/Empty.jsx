import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ type = 'workshops', title, description, actionText, actionPath }) => {
  const navigate = useNavigate();

  const getEmptyConfig = () => {
    switch (type) {
      case 'workshops':
        return {
          icon: 'BookOpen',
          title: 'No Workshops Found',
          description: 'We couldn\'t find any workshops matching your criteria. Try adjusting your filters or explore all available courses.',
          actionText: 'Browse All Workshops',
          actionPath: '/',
        };
      case 'learning':
        return {
          icon: 'GraduationCap',
          title: 'Start Your Learning Journey',
          description: 'You haven\'t enrolled in any workshops yet. Discover amazing courses that will help you build essential life skills.',
          actionText: 'Explore Workshops',
          actionPath: '/',
        };
      case 'schedule':
        return {
          icon: 'Calendar',
          title: 'No Scheduled Sessions',
          description: 'You don\'t have any upcoming workshop sessions. Enroll in a workshop to start learning!',
          actionText: 'Find Workshops',
          actionPath: '/',
        };
      case 'search':
        return {
          icon: 'Search',
          title: 'No Results Found',
          description: 'Try different keywords or browse our popular categories to find the perfect workshop for you.',
          actionText: 'Clear Search',
          actionPath: null,
        };
      default:
        return {
          icon: 'FileText',
          title: title || 'Nothing Here Yet',
          description: description || 'This section is empty. Check back later for updates.',
          actionText: actionText || 'Go Back',
          actionPath: actionPath || '/',
        };
    }
  };

  const config = getEmptyConfig();

  const handleAction = () => {
    if (config.actionPath) {
      navigate(config.actionPath);
    } else if (type === 'search') {
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-6 mb-6">
        <ApperIcon 
          name={config.icon} 
          size={48} 
          className="text-gray-400"
        />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
        {config.title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {config.description}
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAction}
        className="btn-primary flex items-center gap-2"
      >
        <ApperIcon name="ArrowRight" size={16} />
        {config.actionText}
      </motion.button>
      
      {type === 'workshops' && (
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
          <h4 className="font-display font-semibold text-gray-900 mb-2">
            Popular Categories
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Time Management', 'Communication', 'Personal Finance', 'Soft Skills'].map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200 hover:border-primary hover:text-primary cursor-pointer transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Empty;