import React, { useMemo } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import useCalendarStore from '../../store/useCalendarStore';
import CalendarHeader from './CalendarHeader';
import DayCell from './DayCell';
import dayjs from 'dayjs';

const Calendar = () => {
  const {
    currentMonth,
    calendarGrid,
    daysOfWeek,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
  } = useCalendar();

  const { events, filter } = useCalendarStore();

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = dayjs(event.date);
      const isSameMonth = eventDate.isSame(currentMonth, 'month');
      
      if (!isSameMonth) return false;
      if (filter === 'all') return true;
      return event.type === filter;
    });
  }, [events, filter, currentMonth]);

  const eventsByDate = useMemo(() => {
    return filteredEvents.reduce((acc, event) => {
      const dateKey = dayjs(event.date).format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [filteredEvents]);

  return (
    <div className="bg-white rounded-box shadow-soft overflow-hidden">
      <CalendarHeader
        currentMonth={currentMonth}
        onNextMonth={goToNextMonth}
        onPrevMonth={goToPrevMonth}
        onGoToToday={goToToday}
      />
      <div className="grid grid-cols-7 border-t border-gray-200">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 text-center font-semibold text-text-main bg-gray-50 border-b border-r border-gray-200">
            {day}
          </div>
        ))}
        {calendarGrid.map((week, i) =>
          week.map((dayInfo, j) => {
            const dateKey = dayInfo.date.format('YYYY-MM-DD');
            const dayEvents = eventsByDate[dateKey] || [];
            return <DayCell key={`${i}-${j}`} dayInfo={dayInfo} events={dayEvents} />;
          })
        )}
      </div>
    </div>
  );
};

export default Calendar; 