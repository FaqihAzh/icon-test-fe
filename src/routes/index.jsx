import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { MeetingRoomPage } from '../pages/MeetingRoomPage';
import { BookingFormPage } from '../pages/BookingFormPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { DashboardNoLayoutPage } from '../pages/DashboardNoLayoutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardNoLayoutPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/ruang-meeting',
    element: <MeetingRoomPage />,
  },
  {
    path: '/ruang-meeting/pesan-ruangan',
    element: <BookingFormPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);