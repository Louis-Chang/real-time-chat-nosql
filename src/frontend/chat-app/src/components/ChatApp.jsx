import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import FriendList from './FriendList';
import ChatComponent from './ChatComponent';
import '../App.css'; 

const ChatApp = () => {
  const [currentFriendId, setCurrentFriendId] = useState(null);
  const friends = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" }
  ];

  const handleSelectFriend = (id) => {
    setCurrentFriendId(id);
  };

  return (
    <div className="chat-app">
      <div className="friend-list-container">
        <FriendList friends={friends} onSelectFriend={handleSelectFriend} />
      </div>
      <div className="chat-window-container">
        {currentFriendId ? <ChatComponent friendId={currentFriendId} /> : <ChatWindow />}
      </div>
    </div>
  );
};

export default ChatApp;
