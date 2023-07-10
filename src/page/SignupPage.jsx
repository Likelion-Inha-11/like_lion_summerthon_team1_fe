import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FullBox = styled.div`
  margin: 3rem 2rem 2rem 2rem;
  height: 20rem;
`;

const SignupTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
`;

const SignupText = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
`;

const SignupText2 = styled.p`
  font-weight: bold;
  font-size: 0.5rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const NicknameBox = styled.div`
  width: 18rem;
  padding-bottom: 1rem;
`;

const NicknameText = styled.p`
  font-size: 0.7rem;
  margin: 0.2rem;
  color: gray;
`;

const NicknameInput = styled.input`
  width: 10rem;
  height: 1.5rem;
  background-color: #d2ebf9;
  border-radius: 2rem;
  border-style: none;
  box-shadow: 0rem 0.2rem 0.3rem gray;
`;

const IdBox = styled.div`
  width: 18rem;
  padding-bottom: 1rem;
`;

const IdText = styled.p`
  font-size: 0.7rem;

  margin: 0.2rem;

  color: gray;
`;

const IdInput = styled.input`
  width: 10rem;
  height: 1.5rem;
  background-color: #d2ebf9;
  border-radius: 2rem;
  border-style: none;
  box-shadow: 0rem 0.2rem 0.3rem gray;
`;

const PasswordBox = styled.div`
  width: 18rem;
  padding-bottom: 1rem;
`;

const PasswordText = styled.p`
  font-size: 0.7rem;
  margin: 0.2rem;
  color: gray;
`;

const PasswordInput = styled.input`
  width: 10rem;
  height: 1.5rem;
  background-color: #d2ebf9;
  border-radius: 2rem;
  border-style: none;
  box-shadow: 0rem 0.2rem 0.3rem gray;
`;

const ButtonBox = styled.div`
  display: flex;
  margin-top: 3rem;
  width: 14rem;
  height: 3rem;
  /* background-color: coral; */
  justify-content: space-evenly;
`;

const CompleteButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border-style: none;
  border-radius: 0.3rem;
  background-color: #d2ebf9;
  box-shadow: 0rem 0.2rem 0.3rem gray;
`;

const CompleteButtonText = styled.p`
  margin: 0;
  font-weight: bold;
`;

const CancelButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border-style: none;
  border-radius: 0.3rem;
  background-color: #d2ebf9;
  box-shadow: 0rem 0.2rem 0.3rem gray;
`;

const CancelButtonText = styled.p`
  margin: 0;
  font-weight: bold;
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
      <FullBox>
        <SignupTextBox>
          <SignupText>회원가입</SignupText>
          <SignupText2>
            환영합니다 회원이 되어 다양한 서비스를 누려보세요
          </SignupText2>
        </SignupTextBox>

        <InputBox>
          <NicknameBox>
            <NicknameText>닉네임 입력</NicknameText>
            <NicknameInput></NicknameInput>
          </NicknameBox>
          <IdBox>
            <IdText>아이디 입력</IdText>
            <IdInput></IdInput>
          </IdBox>
          <PasswordBox>
            <PasswordText>비밀번호 입력</PasswordText>
            <PasswordInput></PasswordInput>
          </PasswordBox>
        </InputBox>
        <ButtonBox>
          <CompleteButton>
            <CompleteButtonText>가입 완료</CompleteButtonText>
          </CompleteButton>
          <CancelButton>
            <CancelButtonText>가입 취소</CancelButtonText>
          </CancelButton>
        </ButtonBox>
      </FullBox>
    </>
  );
};

export default SignupPage;
