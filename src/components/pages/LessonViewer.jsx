import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import ProgressRing from '@/components/atoms/ProgressRing';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { getWorkshopById } from '@/services/api/workshopService';
import { updateProgress } from '@/services/api/enrollmentService';

const LessonViewer = () => {
  const { workshopId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const loadWorkshop = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getWorkshopById(parseInt(workshopId));
      setWorkshop(data);
      
      const module = data.modules?.find(m => m.Id === parseInt(moduleId));
      setCurrentModule(module);
      
      const lesson = module?.lessons?.find(l => l.Id === parseInt(lessonId)) || {
        Id: parseInt(lessonId),
        title: 'Introduction to the Module',
        content: 'Welcome to this learning module. Here you will discover key concepts and practical applications.',
        duration: '15 min',
        type: 'video'
      };
      setCurrentLesson(lesson);
      
      // Mock progress calculation
      const totalModules = data.modules?.length || 4;
      const currentModuleIndex = data.modules?.findIndex(m => m.Id === parseInt(moduleId)) || 0;
      const moduleProgress = (currentModuleIndex + 1) / totalModules * 100;
      setProgress(moduleProgress);
      
    } catch (err) {
      setError('Failed to load lesson content.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshop();
  }, [workshopId, moduleId, lessonId]);

  const handleComplete = async () => {
    try {
      await updateProgress(parseInt(workshopId), parseInt(moduleId));
      setCompleted(true);
      toast.success('Lesson completed!');
    } catch (err) {
      toast.error('Failed to update progress.');
    }
  };

  const handleNext = () => {
    // Navigate to next lesson logic would go here
    toast.info('Next lesson functionality would be implemented here');
  };

  const handleRetry = () => {
    loadWorkshop();
  };

  if (loading) {
    return <Loading type="lesson" />;
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

  if (!workshop || !currentModule || !currentLesson) {
    return (
      <Error
        message="Lesson content not found"
        type="workshop"
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-80 bg-white shadow-elevated flex flex-col"
      >
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => navigate('/my-learning')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            Back to Learning
          </button>
          
          <h2 className="font-display font-bold text-lg text-gray-900 mb-2">
            {workshop.title}
          </h2>
          
          <div className="flex items-center gap-3 mb-4">
            <ProgressRing progress={progress} size={48} strokeWidth={3} />
            <div>
              <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="font-semibold text-gray-900">{Math.round(progress)}% Complete</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="font-display font-semibold text-gray-900 mb-4">Course Content</h3>
          
          <div className="space-y-4">
            {workshop.modules?.map((module, moduleIndex) => (
              <div key={module.Id} className="border border-gray-200 rounded-lg">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900">
                    Module {moduleIndex + 1}: {module.title}
                  </h4>
                  <p className="text-sm text-gray-600">{module.duration}</p>
                </div>
                
                <div className="p-2">
                  {module.lessons?.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.Id}
                      onClick={() => navigate(`/lesson/${workshopId}/${module.Id}/${lesson.Id}`)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        lesson.Id === currentLesson.Id 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ApperIcon 
                          name={lesson.type === 'video' ? 'Play' : 'FileText'} 
                          size={16} 
                          className={lesson.Id === currentLesson.Id ? 'text-primary' : 'text-gray-400'}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{lesson.title}</p>
                          <p className="text-xs text-gray-500">{lesson.duration}</p>
                        </div>
                        {completed && lesson.Id === currentLesson.Id && (
                          <ApperIcon name="CheckCircle" size={16} className="text-success" />
                        )}
                      </div>
                    </button>
                  )) || (
                    <button
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentLesson.Id === parseInt(lessonId)
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ApperIcon name="Play" size={16} className="text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{currentLesson.title}</p>
                          <p className="text-xs text-gray-500">{currentLesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )) || (
              <div className="border border-gray-200 rounded-lg">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900">
                    {currentModule.title}
                  </h4>
                  <p className="text-sm text-gray-600">{currentModule.duration}</p>
                </div>
                
                <div className="p-2">
                  <button className="w-full text-left p-3 rounded-lg bg-primary/10 text-primary">
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Play" size={16} className="text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{currentLesson.title}</p>
                        <p className="text-xs text-gray-500">{currentLesson.duration}</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl text-gray-900 mb-1">
                {currentLesson.title}
              </h1>
              <p className="text-gray-600">
                {currentModule.title} • {currentLesson.duration}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ApperIcon name="Clock" size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">{currentLesson.duration}</span>
              </div>
              
              <Button
                variant={completed ? "success" : "primary"}
                onClick={handleComplete}
                disabled={completed}
                icon={completed ? "CheckCircle" : "Check"}
              >
                {completed ? "Completed" : "Mark Complete"}
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Video/Content Placeholder */}
            <div className="bg-gray-900 rounded-xl aspect-video mb-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Play" size={32} className="text-white" />
                </div>
                <p className="text-white text-lg">Video Content</p>
                <p className="text-white/80 text-sm">Click to play lesson video</p>
              </div>
            </div>

            {/* Lesson Content */}
            <div className="bg-white rounded-xl shadow-card p-8">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-6">
                Lesson Overview
              </h2>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {currentLesson.content || "In this lesson, you'll learn fundamental concepts and practical applications that will help you build essential skills. The content is designed to be engaging and easy to follow, with real-world examples and actionable insights."}
                </p>
                
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Key Learning Points
                </h3>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ApperIcon name="Check" size={12} className="text-success" />
                    </div>
                    <span className="text-gray-700">Understand core concepts and terminology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ApperIcon name="Check" size={12} className="text-success" />
                    </div>
                    <span className="text-gray-700">Apply practical techniques in real scenarios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ApperIcon name="Check" size={12} className="text-success" />
                    </div>
                    <span className="text-gray-700">Build confidence through hands-on practice</span>
                  </li>
                </ul>
                
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 mb-6">
                  <h4 className="font-display font-semibold text-gray-900 mb-2">
                    Practice Exercise
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Apply what you've learned by completing this practical exercise. This will help reinforce the concepts and build your confidence.
                  </p>
                  <Button variant="primary" icon="ExternalLink">
                    Start Exercise
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <Button
              variant="ghost"
              icon="ArrowLeft"
              onClick={() => navigate('/my-learning')}
            >
              Back to Learning
            </Button>
            
            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => toast.info('Previous lesson functionality would be implemented here')}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                icon="ArrowRight"
                iconPosition="right"
              >
                Next Lesson
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;