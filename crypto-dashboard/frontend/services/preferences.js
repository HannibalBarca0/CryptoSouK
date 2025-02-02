import axios from 'axios';

export const savePreferences = async (preferences) => {
  const response = await axios.post('/api/preferences', preferences);
  return response.data;
};

export const getPreferences = async (userId) => {
  const response = await axios.get(`/api/preferences/${userId}`);
  return response.data;
};