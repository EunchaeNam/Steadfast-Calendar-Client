import React from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import EventTag from './EventTag';
import useCalendarStore from '../../store/useCalendarStore';

dayjs.extend(isToday);

const DayCell = ({ dayInfo, events }) => {
  const { date, isCurrentMonth } = dayInfo;
  const openModal = useCalendarStore((state) => state.openModal);

  // 셀의 스타일을 동적으로 결정
  const getCellClasses = () => {
    let classes = 'relative flex flex-col h-32 p-2 border-b border-r border-gray-200 transition-colors duration-200 cursor-pointer';
    if (!isCurrentMonth) {
      classes += ' bg-gray-50';
    } else if (date.isToday()) {
      classes += ' bg-primary/20'; // 오늘 날짜 배경 강조
    } else {
      classes += ' bg-white hover:bg-gray-50';
    }
    return classes;
  };

  // 날짜 숫자의 스타일을 동적으로 결정
  const getDateClasses = () => {
    let classes = 'font-semibold flex items-center justify-center mb-1';
    if (date.isToday()) {
      classes += ' bg-pink-500 text-white rounded-full w-7 h-7'; // 오늘 날짜 원으로 강조
    } else if (!isCurrentMonth) {
      classes += ' text-gray-400';
    } else {
      classes += ' text-text-main';
    }
    return classes;
  };

  return (
    <div className={getCellClasses()} onClick={() => openModal(date.format('YYYY-MM-DD'))}>
      <span className={getDateClasses()}>{date.format('D')}</span>
      <div className="flex-1 space-y-1 overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} onClick={(e) => { e.stopPropagation(); openModal(date.format('YYYY-MM-DD'), event); }}>
            <EventTag event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCell; 