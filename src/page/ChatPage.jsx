import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const [htmlTemplate, setHtmlTemplate] = useState(""); // 상태 변수로 선언

  const handleChat = () => {
    axios
      .get("/chat/")
      .then((response) => {
        // 채팅 성공 처리
        console.log("성공!!");
        setHtmlTemplate(response.data); // 상태 업데이트
      })
      .catch((error) => {
        console.log("에러!!");
        // 오류 처리
      });
  };

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlTemplate }} />
      <button onClick={handleChat}>Start Chat</button>
      {/* 원하는 방식으로 화면을 구성 */}
      {htmlTemplate}
      <Link to="http://127.0.0.1:8000/chat/">채팅</Link>
    </>
  );
};

export default ChatPage;
