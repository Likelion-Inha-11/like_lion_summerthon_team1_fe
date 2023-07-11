import React from "react";
import axios from "axios";

const ChatPage = (htmlTemplate) => {
  const handleChat = () => {
    axios
      .get("/chat/")
      .then((response) => {
        // 채팅 성공 처리
        console.log("성공!!");
        const htmlTemplate = response.data;
      })
      .catch((error) => {
        console.log("에러!!");
        // 오류 처리
      });
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlTemplate }} />;
      <button onClick={handleChat}>Start Chat</button>
    </>
  );
};

export default ChatPage;
