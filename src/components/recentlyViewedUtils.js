// recentlyViewedUtils.js

import axios from 'axios';

export const addToRecentlyViewed = async (product) => {
  try {
    await axios.post('/api/recently-viewed', { productId: product.id });
  } catch (error) {
    console.error('Error adding to recently viewed:', error);
  }
};

export const getRecentlyViewed = async () => {
  try {
    const response = await axios.get('/api/recently-viewed');
    return response.data;
  } catch (error) {
    console.error('Error getting recently viewed:', error);
    return [];
  }
};