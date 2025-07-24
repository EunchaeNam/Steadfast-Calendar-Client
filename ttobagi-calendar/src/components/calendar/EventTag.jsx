import React from 'react';

const EventTag = ({ event }) => {
  const typeClasses = {
    couple: 'bg-event-couple text-white',
    me: 'bg-event-me text-gray-700',
    you: 'bg-event-you text-gray-700',
  };

  return (
    <div
      className={`px-2 py-1 text-xs rounded-button truncate cursor-pointer hover:opacity-80 transition-opacity ${
        typeClasses[event.type] || 'bg-gray-200 text-gray-600'
      }`}
    >
      <span className="mr-1">{event.emoji}</span>
      {event.title}
    </div>
  );
};

export default EventTag; 