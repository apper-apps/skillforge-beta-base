import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import ProgressRing from '@/components/atoms/ProgressRing';
import Button from '@/components/atoms/Button';

const ProgressCard = ({ enrollment, workshop }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'not-started': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'PlayCircle';
      case 'not-started': return 'Circle';
      default: return 'Circle';
    }
  };

  const handleContinue = () => {
    if (enrollment.status === 'completed') {
      navigate(`/workshop/${workshop.Id}`);
    } else {
      // Navigate to first incomplete lesson
      const firstIncompleteModule = workshop.modules?.find(module => 
        !enrollment.completedModules?.includes(module.Id)
      );
      if (firstIncompleteModule) {
        navigate(`/lesson/${workshop.Id}/${firstIncompleteModule.Id}/1`);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-display font-bold text-lg text-gray-900 mb-1">
            {workshop.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{workshop.instructor}</p>
          <div className="flex items-center gap-2">
            <ApperIcon 
              name={getStatusIcon(enrollment.status)} 
              size={16} 
              className={getStatusColor(enrollment.status)}
            />
            <span className={`text-sm font-medium ${getStatusColor(enrollment.status)}`}>
              {enrollment.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
        </div>
        
        <ProgressRing 
          progress={enrollment.progress} 
          size={64}
          strokeWidth={4}
        />
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{enrollment.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${enrollment.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{enrollment.completedModules?.length || 0}</span>
          {' of '}
          <span className="font-medium">{workshop.modules?.length || 0}</span>
          {' modules completed'}
        </div>
        
        <div className="text-sm text-gray-600">
          Enrolled {new Date(enrollment.enrolledDate).toLocaleDateString()}
        </div>
      </div>
      
      <Button
        variant={enrollment.status === 'completed' ? 'success' : 'primary'}
        className="w-full"
        onClick={handleContinue}
        icon={enrollment.status === 'completed' ? 'CheckCircle' : 'PlayCircle'}
      >
        {enrollment.status === 'completed' ? 'Review' : 'Continue Learning'}
      </Button>
    </motion.div>
  );
};

export default ProgressCard;