import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignupTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 4rem 2rem;
`;

const SignupText = styled.p`
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
`;

const SignupText2 = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
`;

const InputBox = styled.div`
  display: flex;
`;

const NicknameBox = styled.div`
  width: 18rem;
`;

const NicknameText = styled.p`
  font-size: 1rem;
  color: gray;
`;

const NicknameInput = styled.input`
  width: 15rem;
`;

const IdBox = styled.div`
  width: 18rem;
`;

const IdText = styled.p`
  font-size: 1rem;
  color: gray;
`;

const PasswordBox = styled.div`
  width: 18rem;
`;

const PasswordText = styled.p`
  font-size: 1rem;
  color: gray;
`;

const SignupPage = (props) => {
  const [Id, setID] = useState(""); // ID 저장용 useState
  const [Password, setPassword] = useState(""); //Password 저장용 useState

  function insertId(e) {
    // 입력된 ID 받아오는 함수
    setID(e.target.value);
  }

  function insertPassword(e) {
    // 입력된 Password 받아오는 함수
    setPassword(e.target.value);
  }

  function BtnClick() {
    axios
      .post("http://54.180.85.255/signup/", {
        // 입력된 userID 와 password 정보를 post로 넘겨주는 코드
        userID: Id,
        password: Password,
      })
      .then(() => {
        console.log(Id); // 제대로 작동하는 정보 넘겨줬는지 확인하는 코드 (ID check)
        console.log(Password); // 제대로 작동하는 정보 넘겨줬는지 확인하는 코드 (Password check)
      })
      .catch((e) => {
        // axios error check하는 코드
        console.log(e);
      });
  }

  return (
    <>
      <SignupTextBox>
        <SignupText>회원가입</SignupText>
        <SignupText2>
          환영합니다! 회원이 되어 다양한 서비스를 누려보세요
        </SignupText2>
      </SignupTextBox>

      <InputBox>
        <NicknameBox>
          <NicknameText>닉네임 입력</NicknameText>
          <NicknameInput></NicknameInput>
        </NicknameBox>
        <IdBox></IdBox>
        <PasswordBox></PasswordBox>
      </InputBox>
    </>
  );
};

export default SignupPage;
