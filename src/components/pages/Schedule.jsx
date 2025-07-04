import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { getUserSchedule } from '@/services/api/scheduleService';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const loadSchedule = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUserSchedule();
      setSchedule(data);
    } catch (err) {
      setError('Failed to load schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  const handleRetry = () => {
    loadSchedule();
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return schedule.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) {
    return <Loading type="schedule" />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={handleRetry}
        type="network"
      />
    );
  }

  const days = getDaysInMonth(selectedDate);
  const upcomingEvents = schedule.filter(event => new Date(event.date) >= new Date()).slice(0, 5);

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
              Your Schedule
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Stay organized with your upcoming workshop sessions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="Calendar" size={16} />
                <span className="text-sm font-medium">Upcoming Sessions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="Bell" size={16} />
                <span className="text-sm font-medium">Reminders</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <ApperIcon name="Clock" size={16} />
                <span className="text-sm font-medium">Flexible Timing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-2xl text-gray-900">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ApperIcon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ApperIcon name="ChevronRight" size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-4">
                  {dayNames.map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    const events = day ? getEventsForDate(day) : [];
                    const isToday = day && day.toDateString() === new Date().toDateString();
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-[80px] p-2 border rounded-lg ${
                          day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                        } ${isToday ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                      >
                        {day && (
                          <>
                            <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : 'text-gray-900'}`}>
                              {day.getDate()}
                            </div>
                            <div className="space-y-1">
                              {events.slice(0, 2).map((event, eventIndex) => (
                                <div
                                  key={eventIndex}
                                  className="px-2 py-1 bg-primary/10 text-primary rounded text-xs truncate"
                                >
                                  {event.title}
                                </div>
                              ))}
                              {events.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{events.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Upcoming Events */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-card p-6 sticky top-24"
              >
                <h3 className="font-display font-bold text-lg text-gray-900 mb-4">
                  Upcoming Sessions
                </h3>
                
                {upcomingEvents.length === 0 ? (
                  <Empty type="schedule" />
                ) : (
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{event.workshop}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <ApperIcon name="Calendar" size={12} />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <ApperIcon name="Clock" size={12} />
                          <span>{event.time}</span>
                        </div>
                        <div className="mt-2">
                          <Badge
                            variant={event.type === 'live' ? 'error' : 'primary'}
                            size="small"
                          >
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;