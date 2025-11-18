import { apiClient } from '../client';

export const bookingService = {
  async getSummary() {
    return await apiClient.secondary.get('/summaryBookings');
  },
};