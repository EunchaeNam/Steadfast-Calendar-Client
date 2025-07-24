import React from 'react';
import Profile from './Profile';
import DDayBanner from './DDayBanner';
import EventFilter from '../event/EventFilter';

const Sidebar = () => {
  return (
    <aside className="w-80 bg-white p-6 flex flex-col space-y-8 shadow-lg">
      <Profile />
      <DDayBanner />
      <EventFilter />
    </aside>
  );
};

export default Sidebar; 