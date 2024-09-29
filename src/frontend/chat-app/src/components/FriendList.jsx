import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentFriend } from '../features/chatSlice';
import { clearUser } from '../features/userSlice'; 

const FriendList = ({ friends }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectFriend = (friend) => {
    dispatch(setCurrentFriend(friend));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <div className="bg-primary text-white top-bar">
        <h5 className="mb-0">Friends</h5>
      </div>
      <div className="p-3 overflow-auto flex-grow-1">
        {friends.map(friend => (
          <button
            key={friend._id}
            className="btn btn-light w-100 text-start p-2 mb-2 rounded shadow-sm"
            onClick={() => handleSelectFriend(friend)}
          >
            {friend.username}
          </button>
        ))}
      </div>
      <div className="mt-auto p-3">
        <button 
          className="btn btn-danger w-100" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default FriendList;
