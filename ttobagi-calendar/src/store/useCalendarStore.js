import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const customStorage = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return { state: JSON.parse(str) };
  },
  setItem: (name, newValue) => {
    localStorage.setItem(name, JSON.stringify(newValue.state));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

const useCalendarStore = create(
  persist(
    (set) => ({
      settings: {
        anniversaryDate: '2024-01-01',
        users: [
          { id: 'me', name: '나', avatarUrl: 'https://i.pravatar.cc/40?u=me' },
          { id: 'you', name: '너', avatarUrl: 'https://i.pravatar.cc/40?u=you' },
        ],
        theme: 'pastelPink',
      },
      events: [
        {
          id: 'evt_1721644800000',
          title: '1주년 기념일 ❤️',
          date: '2025-01-01',
          type: 'couple',
          emoji: '🎉',
        },
      ],
      filter: 'all',

      // --- Modal State ---
      isModalOpen: false,
      selectedDate: null,
      editingEvent: null,

      // === ACTIONS (액션) ===
      // --- Modal Actions ---
      openModal: (date, event = null) => set({ isModalOpen: true, selectedDate: date, editingEvent: event }),
      closeModal: () => set({ isModalOpen: false, selectedDate: null, editingEvent: null }),

      // --- Settings Actions ---
      setAnniversaryDate: (date) =>
        set((state) => ({
          settings: { ...state.settings, anniversaryDate: date },
        })),

      updateUser: (userId, updatedInfo) =>
        set((state) => ({
          settings: {
            ...state.settings,
            users: state.settings.users.map(user =>
              user.id === userId ? { ...user, ...updatedInfo } : user
            ),
          },
        })),

      // --- Event Actions ---
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: `evt_${new Date().getTime()}` }],
        })),
      updateEvent: (eventId, updatedEvent) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId ? { ...e, ...updatedEvent } : e
          ),
        })),
      deleteEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== eventId),
        })),
      setFilter: (filterType) => set({ filter: filterType }),
    }),
    {
      name: 'ttobagiCalendarData',
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        settings: state.settings,
        events: state.events,
      }),
    }
  )
);

export default useCalendarStore; 