import React from 'react';
import Calendar from '../calendar/Calendar';
import EventModal from '../event/EventModal';

const MainContent = () => {
  return (
    <main className="flex-1 p-8 relative">
      <Calendar />
      <EventModal />
    </main>
  );
};

export default MainContent; 