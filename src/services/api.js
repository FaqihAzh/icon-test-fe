const BASE_URL_1 = 'https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data';
const BASE_URL_2 = 'https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data';

export const api = {
  getMasterOffice: async () => {
    const response = await fetch(`${BASE_URL_1}/masterOffice`);
    return response.json();
  },
  
  getMasterMeetingRooms: async () => {
    const response = await fetch(`${BASE_URL_1}/masterMeetingRooms`);
    return response.json();
  },
  
  getMasterJenisKonsumsi: async () => {
    const response = await fetch(`${BASE_URL_2}/masterJenisKonsumsi`);
    const data = await response.json();

    return data.filter(k => ["1", "2", "3"].includes(k.id));
  },
  
  getSummaryBookings: async () => {
    const response = await fetch(`${BASE_URL_2}/summaryBookings`);
    return response.json();
  },
};