import { format, parseISO, isValid, addDays, startOfWeek, endOfWeek } from 'date-fns';

export const formatDate = (date, formatString = 'PPP') => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, formatString) : 'Invalid date';
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export const formatTime = (date) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, 'h:mm a') : 'Invalid time';
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid time';
  }
};

export const getRelativeDate = (date) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    const now = new Date();
    const diffInDays = Math.floor((parsedDate - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays === -1) return 'Yesterday';
    if (diffInDays > 1) return `In ${diffInDays} days`;
    if (diffInDays < -1) return `${Math.abs(diffInDays)} days ago`;
    
    return formatDate(parsedDate);
  } catch (error) {
    console.error('Error getting relative date:', error);
    return 'Invalid date';
  }
};

export const getWeekRange = (date) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    const start = startOfWeek(parsedDate);
    const end = endOfWeek(parsedDate);
    
    return {
      start: formatDate(start, 'MMM d'),
      end: formatDate(end, 'MMM d, yyyy')
    };
  } catch (error) {
    console.error('Error getting week range:', error);
    return { start: 'Invalid', end: 'Invalid' };
  }
};

export const addBusinessDays = (date, days) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return addDays(parsedDate, days);
  } catch (error) {
    console.error('Error adding business days:', error);
    return date;
  }
};