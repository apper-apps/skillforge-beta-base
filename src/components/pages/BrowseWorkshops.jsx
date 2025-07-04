import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WorkshopGrid from '@/components/organisms/WorkshopGrid';
import WorkshopFilters from '@/components/organisms/WorkshopFilters';
import ApperIcon from '@/components/ApperIcon';
import { getWorkshops } from '@/services/api/workshopService';

const BrowseWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All', 
    'Time Management', 
    'Soft Skills', 
    'Communication', 
    'Personal Finance', 
    'Verbal and Written'
  ];

  const loadWorkshops = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getWorkshops();
      setWorkshops(data);
      setFilteredWorkshops(data);
    } catch (err) {
      setError('Failed to load workshops. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  useEffect(() => {
    let filtered = workshops;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(workshop => workshop.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(workshop => workshop.difficulty === selectedDifficulty);
    }

    // Duration filter
    if (selectedDuration !== 'All') {
      filtered = filtered.filter(workshop => {
        const duration = workshop.duration.toLowerCase();
        switch (selectedDuration) {
          case 'Under 2 hours':
            return duration.includes('1 hour') || duration.includes('30 min');
          case '2-5 hours':
            return duration.includes('2 hours') || duration.includes('3 hours') || duration.includes('4 hours') || duration.includes('5 hours');
          case '5-10 hours':
            return duration.includes('6 hours') || duration.includes('7 hours') || duration.includes('8 hours') || duration.includes('9 hours') || duration.includes('10 hours');
          case '10+ hours':
            return duration.includes('12 hours') || duration.includes('15 hours') || duration.includes('20 hours');
          default:
            return true;
        }
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(workshop => 
        workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredWorkshops(filtered);
  }, [workshops, selectedCategory, selectedDifficulty, selectedDuration, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedDuration('All');
    setSearchQuery('');
  };

  const handleRetry = () => {
    loadWorkshops();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Master Essential Life Skills
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Build confidence with beginner-friendly workshops designed for real-world success
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="Users" size={16} />
                <span className="text-sm font-medium">1000+ Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="Star" size={16} />
                <span className="text-sm font-medium">Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="Clock" size={16} />
                <span className="text-sm font-medium">Self-Paced</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <WorkshopFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setSelectedDifficulty}
                selectedDuration={selectedDuration}
                onDurationChange={setSelectedDuration}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Workshop Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display font-bold text-2xl text-gray-900">
                    Available Workshops
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredWorkshops.length} workshop{filteredWorkshops.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ApperIcon name="Filter" size={16} />
                  <span>Sort by: Popular</span>
                </div>
              </div>

              <WorkshopGrid
                workshops={filteredWorkshops}
                loading={loading}
                error={error}
                onRetry={handleRetry}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrowseWorkshops;