import { motion } from 'framer-motion';

const Loading = ({ type = 'workshops' }) => {
  const renderWorkshopCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-card p-6 animate-pulse">
          <div className="shimmer-loading h-4 w-16 rounded mb-2"></div>
          <div className="shimmer-loading h-6 w-full rounded mb-3"></div>
          <div className="shimmer-loading h-4 w-3/4 rounded mb-4"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="shimmer-loading h-8 w-8 rounded-full"></div>
            <div className="shimmer-loading h-4 w-24 rounded"></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="shimmer-loading h-4 w-16 rounded"></div>
            <div className="shimmer-loading h-4 w-20 rounded"></div>
          </div>
          <div className="shimmer-loading h-10 w-full rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  const renderWorkshopDetail = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-card p-8 mb-8 animate-pulse">
        <div className="shimmer-loading h-8 w-3/4 rounded mb-4"></div>
        <div className="shimmer-loading h-6 w-full rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="shimmer-loading h-20 rounded-lg"></div>
          <div className="shimmer-loading h-20 rounded-lg"></div>
          <div className="shimmer-loading h-20 rounded-lg"></div>
        </div>
        <div className="shimmer-loading h-12 w-40 rounded-lg"></div>
      </div>
      
      <div className="bg-white rounded-xl shadow-card p-8 animate-pulse">
        <div className="shimmer-loading h-6 w-48 rounded mb-6"></div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="shimmer-loading h-12 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLearningDashboard = () => (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-card p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="shimmer-loading h-6 w-1/3 rounded"></div>
            <div className="shimmer-loading h-16 w-16 rounded-full"></div>
          </div>
          <div className="shimmer-loading h-4 w-full rounded mb-2"></div>
          <div className="shimmer-loading h-2 w-full rounded"></div>
        </div>
      ))}
    </div>
  );

  const renderSchedule = () => (
    <div className="bg-white rounded-xl shadow-card p-8 animate-pulse">
      <div className="shimmer-loading h-8 w-48 rounded mb-6"></div>
      <div className="grid grid-cols-7 gap-4 mb-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="shimmer-loading h-8 rounded"></div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 35 }).map((_, index) => (
          <div key={index} className="shimmer-loading h-12 rounded"></div>
        ))}
      </div>
    </div>
  );

  const renderLesson = () => (
    <div className="flex h-screen">
      <div className="w-80 bg-white shadow-card p-6 animate-pulse">
        <div className="shimmer-loading h-6 w-full rounded mb-6"></div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="shimmer-loading h-8 rounded"></div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-8 animate-pulse">
        <div className="shimmer-loading h-8 w-2/3 rounded mb-6"></div>
        <div className="shimmer-loading h-64 w-full rounded-lg mb-6"></div>
        <div className="space-y-4">
          <div className="shimmer-loading h-4 w-full rounded"></div>
          <div className="shimmer-loading h-4 w-5/6 rounded"></div>
          <div className="shimmer-loading h-4 w-4/5 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {type === 'workshops' && renderWorkshopCards()}
      {type === 'workshop-detail' && renderWorkshopDetail()}
      {type === 'learning-dashboard' && renderLearningDashboard()}
      {type === 'schedule' && renderSchedule()}
      {type === 'lesson' && renderLesson()}
    </motion.div>
  );
};

export default Loading;