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
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card card-hover p-6 cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge variant="primary" size="small">
          {workshop.category}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <ApperIcon name="Users" size={14} />
          <span>{workshop.enrollmentCount}</span>
        </div>
      </div>
      
      <h3 className="font-display font-bold text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors">
        {workshop.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {workshop.description}
      </p>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
          <ApperIcon name={getCategoryIcon(workshop.category)} size={16} className="text-white" />
        </div>
        <div>
          <p className="font-medium text-sm text-gray-900">{workshop.instructor}</p>
          <p className="text-xs text-gray-500">Instructor</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <ApperIcon name="Clock" size={14} />
            <span>{workshop.duration}</span>
          </div>
          <Badge variant={getDifficultyColor(workshop.difficulty)} size="small">
            {workshop.difficulty}
          </Badge>
        </div>
        
        {workshop.price && (
          <div className="text-right">
            <p className="font-bold text-lg gradient-text">${workshop.price}</p>
          </div>
        )}
      </div>
      
      <Button
        variant="primary"
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
      >
        View Details
      </Button>
      
      {workshop.nextSession && (
        <div className="mt-3 p-2 bg-accent/10 rounded-lg">
          <p className="text-xs text-accent font-medium text-center">
            Next session: {new Date(workshop.nextSession).toLocaleDateString()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default WorkshopCard;