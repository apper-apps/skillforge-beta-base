import workshopsData from '@/services/mockData/workshops.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getWorkshops = async () => {
  await delay(300);
  return [...workshopsData];
};

export const getWorkshopById = async (id) => {
  await delay(200);
  const workshop = workshopsData.find(w => w.Id === id);
  if (!workshop) {
    throw new Error('Workshop not found');
  }
  return { ...workshop };
};

export const getWorkshopsByCategory = async (category) => {
  await delay(250);
  if (category === 'All') {
    return [...workshopsData];
  }
  return workshopsData.filter(w => w.category === category);
};

export const searchWorkshops = async (query) => {
  await delay(200);
  const searchTerm = query.toLowerCase();
  return workshopsData.filter(w => 
    w.title.toLowerCase().includes(searchTerm) ||
    w.description.toLowerCase().includes(searchTerm) ||
    w.category.toLowerCase().includes(searchTerm) ||
    w.instructor.toLowerCase().includes(searchTerm)
  );
};