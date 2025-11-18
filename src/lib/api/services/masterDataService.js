import { apiClient } from '../client';

export const masterDataService = {
  async getOffices() {
    const data = await apiClient.primary.get('/masterOffice');
    return data.filter(item => ['1', '2', '3', '4', '5'].includes(item.id));
  },

  async getMeetingRooms() {
    return await apiClient.primary.get('/masterMeetingRooms');
  },

  async getConsumptionTypes() {
    const data = await apiClient.secondary.get('/masterJenisKonsumsi');
    return data.filter(item => ['1', '2', '3'].includes(item.id));
  },
};