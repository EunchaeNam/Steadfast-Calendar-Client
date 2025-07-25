import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import useCalendarStore from '../../store/useCalendarStore';

const EventModal = () => {
  const {
    isModalOpen,
    closeModal,
    selectedDate,
    editingEvent,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useCalendarStore();

  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('🎉');
  const [type, setType] = useState('couple');

  // 모달이 열리거나 수정할 이벤트가 바뀔 때마다 폼 상태를 업데이트
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setEmoji(editingEvent.emoji || '🎉');
      setType(editingEvent.type || 'couple');
    } else {
      // 새 이벤트를 위해 폼 초기화
      setTitle('');
      setEmoji('🎉');
      setType('couple');
    }
  }, [editingEvent, isModalOpen]);

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { title, emoji, type, date: selectedDate };
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    closeModal();
  };
  
  const handleDelete = () => {
    if (editingEvent && window.confirm('이 일정을 정말 삭제하시겠습니까?')) {
      deleteEvent(editingEvent.id);
      closeModal();
    }
  };

  const isSaveDisabled = title.trim() === '';

  const eventTypes = [
    { id: 'couple', label: '함께', color: 'bg-event-couple' },
    { id: 'me', label: '나만', color: 'bg-event-me' },
    { id: 'you', label: '너만', color: 'bg-event-you' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal} // 배경 클릭 시 닫기
    >
      <div 
        className="bg-white rounded-box shadow-soft p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 닫히지 않도록
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-main">
            {editingEvent ? '일정 수정' : '새 일정'}
          </h2>
          <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... 이모지 및 제목 입력 ... */}
          <div className="flex items-center space-x-4">
            <div className="text-4xl cursor-pointer">
              {/* 간단한 이모지 선택기, 실제 구현 시에는 라이브러리 사용 고려 */}
              {emoji}
            </div>
            <input
              type="text"
              placeholder="일정 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-button focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* ... 일정 종류 선택 ... */}
          <div>
            <p className="font-semibold mb-2 text-text-main">종류</p>
            <div className="flex space-x-2">
              {eventTypes.map((eventType) => (
                <button
                  key={eventType.id}
                  type="button"
                  onClick={() => setType(eventType.id)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    type === eventType.id
                      ? `${eventType.color} text-white shadow-md`
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {eventType.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* ... 저장 및 삭제 버튼 ... */}
          <div className="flex justify-end space-x-4 pt-4">
            {editingEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white font-bold rounded-button hover:bg-red-600 transition-colors"
              >
                <Trash2 size={18} />
                <span>삭제</span>
              </button>
            )}
            <button
              type="submit"
              disabled={isSaveDisabled}
              className={`px-8 py-3 font-bold rounded-button transition-colors ${
                isSaveDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-secondary text-white hover:bg-green-500'
              }`}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal; 