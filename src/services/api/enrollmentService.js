import enrollmentsData from '@/services/mockData/enrollments.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getUserEnrollments = async () => {
  await delay(400);
  return [...enrollmentsData];
};

export const enrollInWorkshop = async (workshopId) => {
  await delay(500);
  const newEnrollment = {
    Id: Math.max(...enrollmentsData.map(e => e.Id)) + 1,
    workshopId: workshopId,
    enrolledDate: new Date().toISOString(),
    progress: 0,
    completedModules: [],
    status: 'not-started'
  };
  enrollmentsData.push(newEnrollment);
  return { ...newEnrollment };
};

export const updateProgress = async (workshopId, moduleId) => {
  await delay(300);
  const enrollment = enrollmentsData.find(e => e.workshopId === workshopId);
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }
  
  if (!enrollment.completedModules.includes(moduleId)) {
    enrollment.completedModules.push(moduleId);
    enrollment.progress = Math.min(100, enrollment.progress + 25);
    if (enrollment.progress === 100) {
      enrollment.status = 'completed';
    } else if (enrollment.progress > 0) {
      enrollment.status = 'in-progress';
    }
  }
  
  return { ...enrollment };
};