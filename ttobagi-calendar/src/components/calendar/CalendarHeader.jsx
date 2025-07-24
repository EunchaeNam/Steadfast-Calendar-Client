import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentMonth, onPrevMonth, onNextMonth, onGoToToday }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-t-box">
      <h2 className="text-2xl font-bold text-text-main">
        {currentMonth.format('YYYY년 M월')}
      </h2>
      <div className="flex items-center space-x-2">
        <button
          onClick={onGoToToday}
          className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-button hover:bg-gray-200 transition-colors"
        >
          오늘
        </button>
        <button onClick={onPrevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-500" />
        </button>
        <button onClick={onNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronRight className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader; 