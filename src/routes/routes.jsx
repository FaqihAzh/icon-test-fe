import { createBrowserRouter } from 'react-router-dom';
import { MeetingRoomPage } from '../pages/MeetingRoomPage';
import { BookingFormPage } from '../pages/BookingFormPage';
import { DashboardPage } from '../pages/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/ruang-meeting',
    element: <MeetingRoomPage />,
  },
  {
    path: '/',
    element: <DashboardPage  />,
  },
  {
    path: '/ruang-meeting/pengajuan-perangkat',
    element: <BookingFormPage />,
  },
]);