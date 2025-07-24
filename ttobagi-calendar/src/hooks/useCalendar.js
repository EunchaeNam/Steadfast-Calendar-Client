import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const calendarGrid = useMemo(() => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const startDay = startOfMonth.day();
    const daysInMonth = currentMonth.daysInMonth();

    const grid = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          const prevMonthDay = startOfMonth.subtract(startDay - j, 'day');
          week.push({ date: prevMonthDay, isCurrentMonth: false });
        } else if (day > daysInMonth) {
          const nextMonthDay = endOfMonth.add(day - daysInMonth, 'day');
          week.push({ date: nextMonthDay, isCurrentMonth: false });
          day++;
        } else {
          const currentDate = startOfMonth.date(day);
          week.push({ date: currentDate, isCurrentMonth: true });
          day++;
        }
      }
      grid.push(week);
      if (day > daysInMonth && grid.length >= 5) break;
    }
    
    const lastWeek = grid[grid.length - 1];
    if (lastWeek.every(day => !day.isCurrentMonth)) {
      grid.pop();
    }

    return grid;
  }, [currentMonth]);

  const goToNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const goToPrevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const goToToday = () => setCurrentMonth(dayjs());

  return {
    currentMonth,
    daysOfWeek,
    calendarGrid,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
  };
}; 