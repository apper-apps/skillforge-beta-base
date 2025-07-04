import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { getWorkshopById } from '@/services/api/workshopService';
import { enrollInWorkshop } from '@/services/api/enrollmentService';

const WorkshopDetail = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const loadWorkshop = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getWorkshopById(parseInt(id));
      setWorkshop(data);
      // Check if user is already enrolled (mock check)
      setIsEnrolled(Math.random() > 0.7); // Random enrollment status for demo
    } catch (err) {
      setError('Workshop not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshop();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollInWorkshop(parseInt(id));
      setIsEnrolled(true);
      toast.success('Successfully enrolled in workshop!');
    } catch (err) {
      toast.error('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleRetry = () => {
    loadWorkshop();
  };

  if (loading) {
    return <Loading type="workshop-detail" />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={handleRetry}
        type="workshop"
      />
    );
  }

  if (!workshop) {
    return (
      <Error
        message="Workshop not found"
        type="workshop"
      />
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="accent" size="medium">
                {workshop.category}
              </Badge>
              <Badge variant={getDifficultyColor(workshop.difficulty)} size="medium">
                {workshop.difficulty}
              </Badge>
              {isEnrolled && (
                <Badge variant="success" size="medium" icon="CheckCircle">
                  Enrolled
                </Badge>
              )}
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              {workshop.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {workshop.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <ApperIcon name={getCategoryIcon(workshop.category)} size={24} />
                </div>
                <div>
                  <p className="font-semibold">{workshop.instructor}</p>
                  <p className="text-white/80 text-sm">Expert Instructor</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <ApperIcon name="Clock" size={16} />
                <span className="font-medium">{workshop.duration}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <ApperIcon name="Users" size={16} />
                <span className="font-medium">{workshop.enrollmentCount} enrolled</span>
              </div>
              
              {workshop.nextSession && (
                <div className="flex items-center gap-1">
                  <ApperIcon name="Calendar" size={16} />
                  <span className="font-medium">
                    Next: {new Date(workshop.nextSession).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant={isEnrolled ? "success" : "accent"}
                size="large"
                onClick={handleEnroll}
                disabled={isEnrolled}
                loading={enrolling}
                icon={isEnrolled ? "CheckCircle" : "PlayCircle"}
                className="sm:w-auto"
              >
                {isEnrolled ? 'Already Enrolled' : `Enroll Now - $${workshop.price}`}
              </Button>
              
              <Button
                variant="secondary"
                size="large"
                icon="BookmarkPlus"
                className="sm:w-auto"
              >
                Save for Later
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* What You'll Learn */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-card p-8 mb-8"
                >
                  <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
                    What You'll Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workshop.learningOutcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ApperIcon name="Check" size={12} className="text-success" />
                        </div>
                        <p className="text-gray-700">{outcome}</p>
                      </div>
                    )) || (
                      // Default learning outcomes if not provided
                      ['Master fundamental concepts', 'Apply practical techniques', 'Build confidence', 'Develop real-world skills'].map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ApperIcon name="Check" size={12} className="text-success" />
                          </div>
                          <p className="text-gray-700">{outcome}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>

                {/* Course Curriculum */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-xl shadow-card p-8"
                >
                  <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
                    Course Curriculum
                  </h2>
                  <div className="space-y-4">
                    {workshop.modules?.map((module, index) => (
                      <div key={module.Id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            Module {index + 1}: {module.title}
                          </h3>
                          <span className="text-sm text-gray-600">{module.duration}</span>
                        </div>
                        <div className="space-y-2">
                          {module.lessons?.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center gap-3 py-2 pl-4">
                              <ApperIcon name="PlayCircle" size={16} className="text-gray-400" />
                              <span className="text-gray-700">{lesson.title}</span>
                              <span className="text-sm text-gray-500 ml-auto">{lesson.duration}</span>
                            </div>
                          )) || (
                            <div className="flex items-center gap-3 py-2 pl-4">
                              <ApperIcon name="PlayCircle" size={16} className="text-gray-400" />
                              <span className="text-gray-700">Module content overview</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )) || (
                      // Default modules if not provided
                      Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                              Module {index + 1}: Foundation Concepts
                            </h3>
                            <span className="text-sm text-gray-600">45 min</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 py-2 pl-4">
                              <ApperIcon name="PlayCircle" size={16} className="text-gray-400" />
                              <span className="text-gray-700">Introduction to key concepts</span>
                              <span className="text-sm text-gray-500 ml-auto">15 min</span>
                            </div>
                            <div className="flex items-center gap-3 py-2 pl-4">
                              <ApperIcon name="PlayCircle" size={16} className="text-gray-400" />
                              <span className="text-gray-700">Practical exercises</span>
                              <span className="text-sm text-gray-500 ml-auto">30 min</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-xl shadow-card p-6 sticky top-24"
                >
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold gradient-text mb-2">
                      ${workshop.price}
                    </p>
                    <p className="text-gray-600">One-time payment</p>
                  </div>
                  
                  <Button
                    variant={isEnrolled ? "success" : "primary"}
                    size="large"
                    onClick={handleEnroll}
                    disabled={isEnrolled}
                    loading={enrolling}
                    icon={isEnrolled ? "CheckCircle" : "PlayCircle"}
                    className="w-full mb-4"
                  >
                    {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
                  </Button>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Infinity" size={16} className="text-primary" />
                      <span className="text-gray-700">Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Smartphone" size={16} className="text-primary" />
                      <span className="text-gray-700">Mobile friendly</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Award" size={16} className="text-primary" />
                      <span className="text-gray-700">Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Users" size={16} className="text-primary" />
                      <span className="text-gray-700">Community access</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Share this workshop:</p>
                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <ApperIcon name="Share2" size={16} />
                      </button>
                      <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <ApperIcon name="Copy" size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopDetail;