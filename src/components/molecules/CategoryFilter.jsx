import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const categoryIcons = {
    'All': 'Grid3x3',
    'Time Management': 'Clock',
    'Soft Skills': 'Users',
    'Communication': 'MessageSquare',
    'Personal Finance': 'DollarSign',
    'Verbal and Written': 'FileText'
  };

  const categoryColors = {
    'All': 'text-gray-600',
    'Time Management': 'text-blue-600',
    'Soft Skills': 'text-green-600',
    'Communication': 'text-purple-600',
    'Personal Finance': 'text-amber-600',
    'Verbal and Written': 'text-indigo-600'
  };

  return (
    <div className="space-y-2">
      <h3 className="font-display font-semibold text-gray-900 mb-4">Categories</h3>
      
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category)}
          className={`
            w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
            ${selectedCategory === category 
              ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-2 border-primary/20' 
              : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
            }
          `}
        >
          <div className={`p-2 rounded-lg ${selectedCategory === category ? 'bg-primary/20' : 'bg-gray-100'}`}>
            <ApperIcon
              name={categoryIcons[category] || 'Folder'}
              size={16}
              className={selectedCategory === category ? 'text-primary' : categoryColors[category] || 'text-gray-600'}
            />
          </div>
          
          <span className="font-medium text-left flex-1">{category}</span>
          
          {selectedCategory === category && (
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;