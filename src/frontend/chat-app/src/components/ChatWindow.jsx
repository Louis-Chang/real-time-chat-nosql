import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ChatWindow = () => { 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentFriend = useSelector((state) => state.chat.currentFriend);

  useEffect(() => {
    if (currentFriend && currentFriend._id) {
      fetchMessages();
    }
  }, [currentFriend]);

  const fetchMessages = () => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/messages/${currentFriend._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setMessages(response.data.map(msg => ({
          id: msg._id,
          text: msg.content,
          sender: msg.sender === currentUser._id ? 'user' : 'friend'
        })));
      })
      .catch(error => {
        console.error('Failed to fetch messages:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      });
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (inputText.trim() && currentUser && currentFriend) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8080/messages', {
          content: inputText,
          receiver: currentFriend._id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const newMessage = {
          id: response.data._id,
          text: response.data.content,
          sender: 'user'
        };

        setMessages([...messages, newMessage]);
        setInputText('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (!currentFriend) {
    return <div>Select a friend to start chatting</div>;
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-primary text-white top-bar">
        <div className="d-flex align-items-center">
          <h5 className="mb-0">{currentFriend.username}</h5>
        </div>
      </div>
      <div className="p-3 bg-light" style={{ overflowY: 'auto', flexGrow: 1 }}>
        {messages.map(msg => (
          <div key={msg.id} className={`d-flex my-2 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className="bg-white rounded px-3 py-2 shadow-sm" style={{ maxWidth: '50%', wordWrap: 'break-word' }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto px-3 py-2">
        <form className="d-flex" onSubmit={handleSendMessage}>
          <input type="text" className="form-control me-2" placeholder="Type a message..." value={inputText} onChange={e => setInputText(e.target.value)} />
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
