import { createBrowserRouter } from 'react-router-dom';
import { MeetingRoomPage } from '../pages/MeetingRoomPage';
import { BookingFormPage } from '../pages/BookingFormPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MeetingRoomPage />,
  },
  {
    path: '/create',
    element: <BookingFormPage />,
  },
]);