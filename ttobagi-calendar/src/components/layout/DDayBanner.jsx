import React, { useState } from 'react';
import dayjs from 'dayjs';
import useCalendarStore from '../../store/useCalendarStore';
import { Edit } from 'lucide-react';

const DDayBanner = () => {
  const anniversaryDate = useCalendarStore((state) => state.settings.anniversaryDate);
  const setAnniversaryDate = useCalendarStore((state) => state.setAnniversaryDate);
  
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(anniversaryDate);

  const calculateDDay = () => {
    const today = dayjs().startOf('day');
    const anniversary = dayjs(anniversaryDate).startOf('day');
    const daysPassed = today.diff(anniversary, 'day') + 1;
    return daysPassed;
  };

  const handleSave = () => {
    setAnniversaryDate(newDate);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-primary text-center rounded-box shadow-soft relative">
      <div className="absolute top-2 right-2">
        <button onClick={() => setIsEditing(!isEditing)} className="p-1.5 hover:bg-white/50 rounded-full transition-colors">
          <Edit size={16} className="text-pink-600" />
        </button>
      </div>

      {isEditing ? (
        <div className="flex flex-col items-center space-y-2 py-4">
          <input 
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="p-2 border rounded-button"
          />
          <button onClick={handleSave} className="px-4 py-1 bg-secondary text-white font-semibold rounded-button">
            저장
          </button>
        </div>
      ) : (
        <>
          <p className="text-lg font-bold text-gray-700">우리 함께한 지</p>
          <p className="text-4xl font-extrabold text-pink-500">{calculateDDay()}일</p>
        </>
      )}
    </div>
  );
};

export default DDayBanner; 