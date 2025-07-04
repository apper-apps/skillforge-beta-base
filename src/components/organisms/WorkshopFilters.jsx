import { motion } from 'framer-motion';
import CategoryFilter from '@/components/molecules/CategoryFilter';
import ApperIcon from '@/components/ApperIcon';

const WorkshopFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedDuration,
  onDurationChange,
  onClearFilters 
}) => {
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const durations = ['All', 'Under 2 hours', '2-5 hours', '5-10 hours', '10+ hours'];

  const hasActiveFilters = selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedDuration !== 'All';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-card p-6 h-fit sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-lg text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-secondary transition-colors flex items-center gap-1"
          >
            <ApperIcon name="X" size={14} />
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="font-display font-semibold text-gray-900 mb-4">Difficulty</h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <label key={difficulty} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="difficulty"
                value={difficulty}
                checked={selectedDifficulty === difficulty}
                onChange={(e) => onDifficultyChange(e.target.value)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
              />
              <span className="text-sm font-medium text-gray-700">{difficulty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h3 className="font-display font-semibold text-gray-900 mb-4">Duration</h3>
        <div className="space-y-2">
          {durations.map((duration) => (
            <label key={duration} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value={duration}
                checked={selectedDuration === duration}
                onChange={(e) => onDurationChange(e.target.value)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
              />
              <span className="text-sm font-medium text-gray-700">{duration}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="font-display font-semibold text-gray-900 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['Beginner Friendly', 'Quick Start', 'Practical', 'Interactive', 'Certification'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-primary hover:text-white transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkshopFilters;