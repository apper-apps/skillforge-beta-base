import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { getWorkshopById } from "@/services/api/workshopService";
import { enrollInWorkshop } from "@/services/api/enrollmentService";

const WorkshopDetail = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});

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

const handleEnroll = () => {
    setShowEnrollForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) errors.phone = 'Invalid phone number format';
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the form errors');
      return;
    }

    setEnrolling(true);
    try {
      const enrollmentData = await enrollInWorkshop(parseInt(id), formData);
      
      // Redirect to payment gateway
      const paymentUrl = `https://payment-gateway.com/checkout?workshop=${id}&price=${workshop.price}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}&enrollmentId=${enrollmentData.Id}`;
      
      toast.success('Redirecting to payment gateway...');
      setTimeout(() => {
        window.location.href = paymentUrl;
      }, 1500);
      
    } catch (err) {
      toast.error('Failed to process enrollment. Please try again.');
      setEnrolling(false);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCloseForm = () => {
    setShowEnrollForm(false);
    setFormData({ name: '', email: '', phone: '' });
    setFormErrors({});
    setEnrolling(false);
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

  const getCategoryGradient = (category) => {
    switch (category) {
      case 'Time Management': 
        return 'from-blue-600 via-cyan-500 to-blue-400';
      case 'Soft Skills': 
        return 'from-purple-600 via-pink-500 to-purple-400';
      case 'Communication': 
        return 'from-green-600 via-emerald-500 to-green-400';
      case 'Personal Finance': 
        return 'from-amber-600 via-orange-500 to-amber-400';
      case 'Verbal and Written': 
        return 'from-indigo-600 via-violet-500 to-indigo-400';
      default: 
        return 'from-primary via-secondary to-accent';
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
      <section className={`relative bg-gradient-to-br ${getCategoryGradient(workshop.category)} text-white py-20 overflow-hidden transition-all duration-700 ease-out`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Feature Thumbnail */}
            <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
              <div className="w-full lg:w-80 h-64 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                  <ApperIcon name={getCategoryIcon(workshop.category)} size={48} className="text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
<div className="flex flex-wrap items-center gap-3 mb-6 justify-center lg:justify-start">
                  <Badge variant="accent" size="medium" className="backdrop-blur-sm bg-white/20 border border-white/30">
                    {workshop.category}
                  </Badge>
                  <Badge variant={getDifficultyColor(workshop.difficulty)} size="medium" className="backdrop-blur-sm bg-white/20 border border-white/30">
                    {workshop.difficulty}
                  </Badge>
                  {isEnrolled && (
                    <Badge variant="success" size="medium" icon="CheckCircle" className="backdrop-blur-sm bg-success/20 border border-success/30">
                      Enrolled
                    </Badge>
                  )}
                </div>
<h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
                  {workshop.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  {workshop.description}
                </p>
              </div>
            </div>
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
                variant={isEnrolled ? "success" : "success"}
                size="large"
                onClick={handleEnroll}
                disabled={isEnrolled}
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
                  <div className="text-center mb-6 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-primary uppercase tracking-wide">Special Offer</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="text-5xl font-bold text-gray-900">${workshop.price}</span>
                      <div className="flex flex-col items-start">
                        <span className="text-xl text-gray-500 line-through">${Math.round(workshop.price * 1.8)}</span>
                        <span className="text-sm text-success font-semibold">Save ${Math.round(workshop.price * 0.8)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-success font-semibold flex items-center justify-center gap-1">
                        <ApperIcon name="CheckCircle" size={16} />
                        One-time payment
                      </p>
                      <p className="text-sm text-gray-600">No recurring fees • Lifetime access</p>
                      <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        <ApperIcon name="Clock" size={14} />
                        Limited time offer
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="success"
                    size="large"
                    onClick={handleEnroll}
                    disabled={isEnrolled}
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

      {/* Enrollment Form Modal */}
      {showEnrollForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-floating max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-gray-900">
                Enroll in Workshop
              </h3>
              <button
                onClick={handleCloseForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={enrolling}
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">{workshop.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-lg text-primary">${workshop.price}</span>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                error={formErrors.name}
                required
                icon="User"
                disabled={enrolling}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                error={formErrors.email}
                required
                icon="Mail"
                disabled={enrolling}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                error={formErrors.phone}
                required
                icon="Phone"
                disabled={enrolling}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCloseForm}
                  disabled={enrolling}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  loading={enrolling}
                  icon="CreditCard"
                  className="flex-1"
                >
                  {enrolling ? 'Processing...' : 'Proceed to Payment'}
                </Button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              You will be redirected to our secure payment gateway to complete your enrollment.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WorkshopDetail;