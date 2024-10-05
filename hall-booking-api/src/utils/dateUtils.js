// Convert a date string to a Date object
const parseDate = (dateString) => {
    return new Date(dateString);
  };
  
  // Format a Date object to ISO string (YYYY-MM-DD)
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Check if two time ranges overlap
  const isTimeOverlap = (start1, end1, start2, end2) => {
    return (start1 < end2 && end1 > start2);
  };
  
  // Convert time string (HH:MM) to minutes since midnight
  const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  // Calculate duration between two time strings in hours
  const calculateDuration = (startTime, endTime) => {
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    return (end - start) / 60;
  };
  
  module.exports = {
    parseDate,
    formatDate,
    isTimeOverlap,
    timeToMinutes,
    calculateDuration
  };
  