import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatComponent({ friendId }) {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket(`ws://localhost:8080/friends/${friendId}`);
        setWs(websocket);

        websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, message]);
        };

        return () => {
            websocket.close();
        };
    }, [friendId]);

    useEffect(() => {
        axios.get(`http://localhost:8080/messages/${friendId}`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => console.error('Error fetching messages:', error));
    }, [friendId]);

    return (
        <div>
            {messages.map(msg => (
                <div key={msg.timestamp}>{msg.sender}: {msg.content}</div>
            ))}
        </div>
    );
}

export default ChatComponent;
