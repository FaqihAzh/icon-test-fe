import { createBrowserRouter } from 'react-router-dom';
import { MeetingRoomPage } from '../pages/MeetingRoomPage';
import { BookingFormPage } from '../pages/BookingFormPage';

export const router = createBrowserRouter([
  {
    path: '/ruang-meeting',
    element: <MeetingRoomPage />,
  },
  {
    path: '/ruang-meeting/pengajuan-perangkat',
    element: <BookingFormPage />,
  },
]);