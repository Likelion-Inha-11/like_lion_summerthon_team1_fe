import React from "react";
import axios from "axios";
import { styled, css } from "styled-components";
import { useState } from "react";
import BottomBar from "./component/SearchPageCom/bottomBar";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import MyHeader from "./components/MyPage/MyHeader";
import UserTestImage from "./components/MyPage/UserTestImage.jpg";
import { UserImage } from "./components/MyPage/MyHeader";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const hashDivrap = css`
  margin-top: 24px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border-bottom: 1.6px solid gray;
  padding: 2px 2px 8px 2px;

  .HashWrapOuter {
    display: flex;
    flex-wrap: wrap;
  }

  .HashWrapInner {
    margin-top: 5px;
    background: #ffeee7;
    border-radius: 56px;
    padding: 8px 12px;
    color: #ff6e35;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 8px;
    line-height: 20px;
    margin-right: 5px;
    cursor: pointer;
  }

  .HashInput {
    width: 3rem;
    margin: 10px;
    display: inline-flex;
    outline: none;
    cursor: text;
    line-height: 2rem;
    margin-bottom: 0.75rem;
    min-width: 8rem;
    border: none;
  }
`;

const HashTagWrapper = styled.div`
  ${hashDivrap}
`;

const HashWrapOuter = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HashWrapInner = styled.div`
  margin-top: 5px;
  background: #ededed;
  border-radius: 56px;
  padding: 8px;
  color: #89baff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 8px;
  line-height: 10px;
  margin-right: 5px;
  cursor: pointer;
`;

const HashInput = styled.input`
  width: auto;
  margin: 10px;
  display: inline-flex;
  outline: none;
  cursor: text;
  line-height: 2rem;
  margin-bottom: 0.75rem;
  min-width: 8rem;
  border: none;
`;

const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30rem;
  justify-content: space-evenly;
`;

const TitleBox = styled.div`
  display: flex;
  margin: 2rem 0 0 2rem;
`;

const Title = styled.h2`
  font-weight: bolder;
`;

const RoomTitle = styled.input`
  width: 15rem;
  height: 2.5rem;
  border: none;
  background-color: #a5d7f4;
  margin: 1rem 0 0 rem;
  border-radius: 5px;
`;

const CreateButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border-style: none;
  border-radius: 0.3rem;
  background-color: #d2ebf9;
  box-shadow: 0rem 0.2rem 0.3rem gray;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 15rem;
  justify-content: space-around;
`;

const CancleButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border-style: none;
  border-radius: 0.3rem;
  background-color: #d2ebf9;
  box-shadow: 0rem 0.2rem 0.3rem gray;
`;

const CreateRoom = () => {
  // onChange로 관리할 문자열
  //const [hashtag, setHashtag] = useState('');
  const navigate = useNavigate();
  const { Id4 } = useParams();

  const [newChatTitle, setTitle] = useState("");
  const [RoomId, setRoomId] = useState();

  const [hashArr, setHashArr] = useState([]);

  const handleEnter = (e) => {
    if (e.keyCode === 13 && e.target.value.trim() !== "") {
      const newHash = "#" + e.target.value;
      setHashArr((prevHashArr) => [...prevHashArr, newHash]);
      e.target.value = "";
    }
  };

  const handleRemoveHash = (index) => {
    setHashArr((prevHashArr) => prevHashArr.filter((_, i) => i !== index));
  };

  function insertTitle(e) {
    setTitle(e.target.value);
    console.log(newChatTitle);
  }

  function RoomEnter() {
    axios
      .post(`${process.env.REACT_APP_API}/${RoomId}/enter/`)
      .then(() => {
        console.log("Room enter!");
      })
      .catch((e) => {
        console.log("Cannot Enter!");
        console.log(RoomId);
        console.log(e);
      });
  }

  function buttonClick() {
    const token = "token"; // replace with your actual token
    axios
      .post(
        `${process.env.REACT_APP_API}/room_list_create/`,
        {
          name: newChatTitle,
          user: [Id4],
          category: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setRoomId(res.data.room_id);
        alert("개설이 완료되었습니다.");
      })
      .catch((e) => {
        console.log(e);
        console.log(newChatTitle);
        console.log(Id4);
      });
  }

  function buttonDelete() {
    axios
      .delete(`${process.env.REACT_APP_API}/room/2/`)
      .then(() => {
        console.log("삭제완료!");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function CheckInfo() {
    axios
      .get(`${process.env.REACT_APP_API}/my_info/`)
      .then((res) => {
        console.log("사용자 정보");
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function movetoBack() {
    navigate(-1);
  }
  return (
    <>
      <TitleBox>
        <Title>채팅방 개설</Title>
      </TitleBox>
      <BodyBox>
        <UserImage src={UserTestImage}></UserImage>

        <RoomTitle
          placeholder="채팅방 이름 작성.."
          onChange={insertTitle}
          value={newChatTitle}
        ></RoomTitle>

        {/* <HashTagWrapper>
          <HashInput type="text" onKeyUp={handleEnter} />
          <HashWrapOuter>
            {hashArr.map((hash, index) => (
              <HashWrapInner
                key={index}
                onClick={() => handleRemoveHash(index)}
              >
                {hash}
              </HashWrapInner>
            ))}
          </HashWrapOuter>
        </HashTagWrapper> */}

        <ButtonBox>
          <CreateButton onClick={buttonClick}>
            <b> 개설 완료</b>
          </CreateButton>
          {/* <button onClick={buttonDelete}>임시 삭제버튼</button>
          <button onClick={CheckInfo}>사용자 확인</button> */}
          <CancleButton onClick={movetoBack}>
            <b>개설 취소</b>
          </CancleButton>
        </ButtonBox>
      </BodyBox>
      <BottomBar IdOfUser={Id4}></BottomBar>
    </>
  );
};

export default CreateRoom;