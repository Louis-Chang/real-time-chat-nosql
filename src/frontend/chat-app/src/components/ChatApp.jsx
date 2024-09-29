import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ChatWindow from './ChatWindow';
import FriendList from './FriendList';
import { setCurrentFriend } from '../features/chatSlice';
import '../App.css'; 

const ChatApp = () => {
  const [friends, setFriends] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentFriend = useSelector((state) => state.chat.currentFriend);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setFriends(response.data);
        })
        .catch(error => console.error('Failed to fetch users:', error));
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to use the chat app.</div>;
  }

  return (
    <div className="chat-app">
      <div className="friend-list-container">
        <FriendList friends={friends} />
      </div>
      <div className="chat-window-container">
        {currentFriend ? (
          <ChatWindow />
        ) : (
          <div>Select a friend to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
