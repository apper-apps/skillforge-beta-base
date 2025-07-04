import { motion } from 'framer-motion';
import ProgressCard from '@/components/molecules/ProgressCard';
import ProgressRing from '@/components/atoms/ProgressRing';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const LearningProgress = ({ enrollments, workshops, loading, error, onRetry }) => {
  if (loading) {
    return <Loading type="learning-dashboard" />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={onRetry}
        type="network"
      />
    );
  }

  if (!enrollments || enrollments.length === 0) {
    return <Empty type="learning" />;
  }

  const totalProgress = enrollments.reduce((sum, enrollment) => sum + enrollment.progress, 0) / enrollments.length;
  const completedWorkshops = enrollments.filter(e => e.status === 'completed').length;
  const inProgressWorkshops = enrollments.filter(e => e.status === 'in-progress').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="flex justify-center mb-4">
            <ProgressRing progress={totalProgress} size={80} strokeWidth={6} />
          </div>
          <h3 className="font-display font-bold text-lg text-gray-900 mb-1">Overall Progress</h3>
          <p className="text-sm text-gray-600">Across all enrolled workshops</p>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-success to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="CheckCircle" size={32} className="text-white" />
          </div>
          <h3 className="font-display font-bold text-2xl text-gray-900 mb-1">{completedWorkshops}</h3>
          <p className="text-sm text-gray-600">Completed Workshops</p>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-warning to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="PlayCircle" size={32} className="text-white" />
          </div>
          <h3 className="font-display font-bold text-2xl text-gray-900 mb-1">{inProgressWorkshops}</h3>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
      </div>

      {/* Enrolled Workshops */}
      <div>
        <h2 className="font-display font-bold text-xl text-gray-900 mb-6">Your Workshops</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrollments.map((enrollment, index) => {
            const workshop = workshops.find(w => w.Id === enrollment.workshopId);
            if (!workshop) return null;

            return (
              <motion.div
                key={enrollment.workshopId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProgressCard enrollment={enrollment} workshop={workshop} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default LearningProgress;