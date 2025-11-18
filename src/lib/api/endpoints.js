import { API_BASE_URLS } from "../../config/constants";

export const endpoints = {
  masterOffice: `${API_BASE_URLS.PRIMARY}/masterOffice`,
  masterMeetingRooms: `${API_BASE_URLS.PRIMARY}/masterMeetingRooms`,
  masterJenisKonsumsi: `${API_BASE_URLS.SECONDARY}/masterJenisKonsumsi`,
  summaryBookings: `${API_BASE_URLS.SECONDARY}/summaryBookings`,
};