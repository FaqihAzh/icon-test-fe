export const API_BASE_URLS = {
  PRIMARY: import.meta.env.VITE_BASE_URL_PRIMARY,
  SECONDARY: import.meta.env.VITE_BASE_URL_SECONDARY,
};

export const APP_CONFIG = {
  PAGE_SIZE: 6,
  APP_NAME: 'iMeeting',
};

export const TIME_BOUNDARIES = {
  MORNING_SNACK: 11 * 60,
  LUNCH_START: 11 * 60,
  LUNCH_END: 14 * 60,
};