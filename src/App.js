import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from "./page/SignupPage";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import SearchPage from "./page/SearchPage";
import MyPage from "./page/MyPage";
import CreateRoom from "./page/CreateRoom";
import ChatPage from "./page/ChatPage";

function App() {
  return (
    <>
      <BrowserRouter> 
      <Routes>
      <Route path="/signup" element={<SignupPage />} /> 
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/main/:Id1" element={<MainPage />} /> 
      <Route path="/search/:Id2" element={<SearchPage />} />
      <Route path="/mypage/:Id3" element={<MyPage />} />
      <Route path="/create/:Id4" element={<CreateRoom />} />
      <Route path="/chat/:roomId" element={<ChatPage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;