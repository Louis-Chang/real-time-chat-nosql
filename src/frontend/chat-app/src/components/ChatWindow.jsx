import React, { useState } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "user" },
    { id: 2, text: "Hi there!", sender: "other" },
    { id: 3, text: "How are you doing?", sender: "user" },
    { id: 4, text: "I'm doing great, thanks for asking!", sender: "other" },
    { id: 5, text: "That's wonderful to hear!", sender: "user" },
    { id: 6, text: "What have you been up to lately?", sender: "other" },
    { id: 7, text: "Just working on some coding projects. How about you?", sender: "user" },
    { id: 8, text: "That sounds interesting! I've been reading a lot.", sender: "other" },
    { id: 9, text: "Reading is always good. Any book recommendations?", sender: "user" },
    { id: 10, text: "Yes, I'd recommend 'The Pragmatic Programmer'. It's great for developers!", sender: "other" }
  ]);
  const [inputText, setInputText] = useState('');

  // Dummy data for the user being chatted with
  const chatPartner = {
    name: "John Doe",
    profilePicture: "https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputText.trim()) {
      const newMessage = { id: messages.length + 1, text: inputText, sender: "user" };
      setMessages([...messages, newMessage]);
      setInputText(''); // Clear input after sending
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-primary text-white top-bar">
        <div className="d-flex align-items-center">
          <img src={chatPartner.profilePicture} alt={chatPartner.name} className="rounded-circle me-2" width="40" height="40" />
          <h5 className="mb-0">{chatPartner.name}</h5>
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
