import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LearningProgress from '@/components/organisms/LearningProgress';
import ApperIcon from '@/components/ApperIcon';
import { getUserEnrollments } from '@/services/api/enrollmentService';
import { getWorkshops } from '@/services/api/workshopService';

const MyLearning = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadLearningData = async () => {
    setLoading(true);
    setError('');
    try {
      const [enrollmentData, workshopData] = await Promise.all([
        getUserEnrollments(),
        getWorkshops()
      ]);
      setEnrollments(enrollmentData);
      setWorkshops(workshopData);
    } catch (err) {
      setError('Failed to load learning data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLearningData();
  }, []);

  const handleRetry = () => {
    loadLearningData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Your Learning Journey
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Track your progress and continue building essential skills
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="TrendingUp" size={16} />
                <span className="text-sm font-medium">Progress Tracking</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="Award" size={16} />
                <span className="text-sm font-medium">Certificates</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="Calendar" size={16} />
                <span className="text-sm font-medium">Flexible Schedule</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Progress */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <LearningProgress
            enrollments={enrollments}
            workshops={workshops}
            loading={loading}
            error={error}
            onRetry={handleRetry}
          />
        </div>
      </section>

      {/* Achievement Section */}
      {enrollments.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-8">
                Your Achievements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Trophy" size={32} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                    First Steps
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enrolled in your first workshop
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Target" size={32} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                    Focused Learner
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Completed 50% of a workshop
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Star" size={32} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                    Rising Star
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Maintain learning streak
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MyLearning;