import React from "react";
import axios from "axios";

const ChatPage = () => {
  const handleChat = () => {
    axios
      .get("/chat/")
      .then((response) => {
        // 채팅 성공 처리
      })
      .catch((error) => {
        // 오류 처리
      });
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <button onClick={handleChat}>Start Chat</button>
    </div>
  );
};

export default ChatPage;
