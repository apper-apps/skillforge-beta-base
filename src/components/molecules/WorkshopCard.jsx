import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const WorkshopCard = ({ workshop }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Time Management': return 'Clock';
      case 'Soft Skills': return 'Users';
      case 'Communication': return 'MessageSquare';
      case 'Personal Finance': return 'DollarSign';
      case 'Verbal and Written': return 'FileText';
      default: return 'BookOpen';
    }
  };

  const handleCardClick = () => {
    navigate(`/workshop/${workshop.Id}`);
  };

return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="card card-hover cursor-pointer group overflow-hidden bg-white rounded-2xl shadow-card hover:shadow-floating transition-all duration-300"
      onClick={handleCardClick}
    >
      {/* Modern Thumbnail Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <ApperIcon name={getCategoryIcon(workshop.category)} size={32} className="text-white" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <Badge variant="primary" size="small" className="backdrop-blur-sm bg-white/90 shadow-sm">
            {workshop.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
          <ApperIcon name="Users" size={12} className="text-white" />
          <span className="text-xs text-white font-medium">{workshop.enrollmentCount}</span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
<h3 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
          {workshop.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {workshop.description}
        </p>
        
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={16} className="text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">{workshop.instructor}</p>
            <p className="text-xs text-gray-500">Expert Instructor</p>
          </div>
        </div>
<div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-1.5">
              <ApperIcon name="Clock" size={14} />
              <span className="font-medium">{workshop.duration}</span>
            </div>
            <Badge variant={getDifficultyColor(workshop.difficulty)} size="small" className="shadow-sm">
              {workshop.difficulty}
            </Badge>
          </div>
          
          {workshop.price && (
            <div className="text-right">
              <p className="font-bold text-xl gradient-text">${workshop.price}</p>
              <p className="text-xs text-gray-500">One-time fee</p>
            </div>
          )}
        </div>
<Button
          variant="primary"
          size="medium"
          className="w-full shadow-sm hover:shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          icon="ArrowRight"
          iconPosition="right"
        >
          View Details
        </Button>
        
        {workshop.nextSession && (
          <div className="mt-4 p-3 bg-gradient-to-r from-accent/10 to-yellow-500/10 rounded-xl border border-accent/20">
            <p className="text-sm text-accent font-semibold text-center flex items-center justify-center gap-1.5">
              <ApperIcon name="Calendar" size={14} />
              Next session: {new Date(workshop.nextSession).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkshopCard;