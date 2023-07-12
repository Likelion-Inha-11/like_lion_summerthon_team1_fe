import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const [message, setMessage] = useState(""); // 사용자가 입력한 채팅 메시지를 저장하는 상태
  const [chatLog, setChatLog] = useState([]); // 채팅 로그를 저장하는 상태
  const [ws, setWs] = useState(null); // WebSocket 객체를 저장하는 상태

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/chat/");
    // 웹소켓 연결 설정

    ws.onopen = () => {
      console.log("connected to server"); // 서버에 연결되면 콘솔에 로그를 출력
    };

    ws.onmessage = (event) => {
      setChatLog((chatLog) => [...chatLog, event.data]); // 채팅 메시지가 도착하면 채팅 로그에 추가
    };

    ws.onclose = () => {
      console.log("disconnected from server"); // 연결이 종료되면 콘솔에 로그를 출력
    };

    setWs(ws); // WebSocket 객체를 상태에 저장
    return () => ws.close(); // 컴포넌트가 언마운트될 때 웹소켓 연결을 종료
  }, []);

  const handleChat = (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 막음
    if (ws) {
      ws.send(message); // WebSocket을 통해 채팅 메시지를 전송
      setChatLog((chatLog) => [...chatLog, message]); // 메시지를 chatLog에 추가
      setMessage(""); // 메시지 전송 후 입력 필드를 비움
    }
  };

  return (
    <>
      <ul>
        {chatLog.map((msg, idx) => (
          <li key={idx}>{msg}</li> // 채팅 로그를 화면에 출력
        ))}
      </ul>
      <form onSubmit={handleChat}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // 사용자 입력을 message 상태에 저장
        />
        <button type="submit">Send Message</button> // 버튼 클릭 시 handleChat
        함수 호출
      </form>
      <Link to="http://127.0.0.1:8000/chat/">Go Back</Link> // 이전 페이지로
      돌아가는 링크
    </>
  );
};

export default ChatPage;
