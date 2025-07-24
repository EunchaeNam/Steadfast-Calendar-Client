import React, { useState } from 'react';
import useCalendarStore from '../../store/useCalendarStore';
import { Edit, Check } from 'lucide-react';

// 개별 프로필을 관리하는 컴포넌트
const UserProfile = ({ user }) => {
  const updateUser = useCalendarStore((state) => state.updateUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  const handleSave = () => {
    updateUser(user.id, { name, avatarUrl });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center space-y-2 relative group">
      {isEditing ? (
        <>
          <img src={avatarUrl} alt={name} className="w-16 h-16 rounded-full shadow-soft" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-24 text-center border-b-2"
          />
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-24 text-center text-xs border-b-2"
            placeholder="이미지 URL"
          />
          <button onClick={handleSave} className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
            <Check size={14} />
          </button>
        </>
      ) : (
        <>
          <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full shadow-soft" />
          <span className="text-text-main font-semibold">{user.name}</span>
          <button 
            onClick={() => setIsEditing(true)} 
            className="absolute -top-2 -right-2 bg-white text-gray-600 p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit size={14} />
          </button>
        </>
      )}
    </div>
  );
};


const Profile = () => {
  const users = useCalendarStore((state) => state.settings.users);

  return (
    <div className="flex items-start justify-around p-4">
      {users.map((user) => (
        <UserProfile key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Profile; 