import { motion } from 'framer-motion';
import WorkshopCard from '@/components/molecules/WorkshopCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const WorkshopGrid = ({ workshops, loading, error, onRetry }) => {
  if (loading) {
    return <Loading type="workshops" />;
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

  if (!workshops || workshops.length === 0) {
    return <Empty type="workshops" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {workshops.map((workshop, index) => (
        <motion.div
          key={workshop.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <WorkshopCard workshop={workshop} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WorkshopGrid;