import React from 'react';
import useCalendarStore from '../../store/useCalendarStore';

const EventFilter = () => {
  const filter = useCalendarStore((state) => state.filter);
  const setFilter = useCalendarStore((state) => state.setFilter);

  const filters = [
    { id: 'all', label: '전체', color: 'bg-gray-500' },
    { id: 'couple', label: '함께', color: 'bg-event-couple' },
    { id: 'me', label: '나만', color: 'bg-event-me' },
    { id: 'you', label: '너만', color: 'bg-event-you' },
  ];
  
  const getButtonClass = (filterType, color) => {
    const baseClass = "w-full p-3 rounded-button text-left font-bold text-white transition-all duration-200 ease-in-out transform hover:scale-105";
    if (filter === filterType) {
      return `${baseClass} ${color} shadow-soft`;
    }
    return `${baseClass} bg-gray-200 text-text-main hover:bg-gray-300`;
  };

  return (
    <div className="p-4 bg-background rounded-box">
      <h3 className="font-bold mb-4 text-lg">일정 보기</h3>
      <div className="space-y-3">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={getButtonClass(f.id, f.color)}
          >
            <span className={`inline-block w-3 h-3 rounded-full mr-3 ${filter === f.id ? 'bg-white' : f.color}`}></span>
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFilter; 