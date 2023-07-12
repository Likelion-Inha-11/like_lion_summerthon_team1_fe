import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/chat/");
    ws.onopen = () => {
      console.log("connected to server");
    };

    ws.onmessage = (event) => {
      setChatLog((chatLog) => [...chatLog, event.data]);
    };

    ws.onclose = () => {
      console.log("disconnected from server");
    };

    setWs(ws);
    return () => ws.close();
  }, []);

  const handleChat = (event) => {
    event.preventDefault();
    if (ws) {
      ws.send(message);
      setMessage("");
    }
  };

  return (
    <>
      <ul>
        {chatLog.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleChat}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
      <Link to="http://127.0.0.1:8000/chat/">Go Back</Link>
    </>
  );
};

export default ChatPage;
