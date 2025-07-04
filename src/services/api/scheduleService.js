import scheduleData from '@/services/mockData/schedule.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getUserSchedule = async () => {
  await delay(300);
  return [...scheduleData];
};

export const addScheduleEvent = async (event) => {
  await delay(200);
  const newEvent = {
    Id: Math.max(...scheduleData.map(e => e.Id)) + 1,
    ...event
  };
  scheduleData.push(newEvent);
  return { ...newEvent };
};

export const updateScheduleEvent = async (id, eventData) => {
  await delay(250);
  const index = scheduleData.findIndex(e => e.Id === id);
  if (index === -1) {
    throw new Error('Event not found');
  }
  
  scheduleData[index] = { ...scheduleData[index], ...eventData };
  return { ...scheduleData[index] };
};

export const deleteScheduleEvent = async (id) => {
  await delay(200);
  const index = scheduleData.findIndex(e => e.Id === id);
  if (index === -1) {
    throw new Error('Event not found');
  }
  
  scheduleData.splice(index, 1);
  return { success: true };
};