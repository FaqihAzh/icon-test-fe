import { useState } from 'react';
import { BookingFormPage } from './pages/BookingFormPage';
import { MeetingRoomPage } from './pages/MeetingRoomPage';

function App() {
  const [currentPage, setCurrentPage] = useState('list');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === 'list' && <MeetingRoomPage onNavigate={handleNavigate} />}
      {currentPage === 'create' && <BookingFormPage onNavigate={handleNavigate} />}
    </>
  );
}

export default App;