import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const SignupTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 3rem 1rem 0rem 1rem;
`;

const SignupContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
  `

const SignupText = styled.p`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0;
`;

const SignupText2 = styled.p`
  font-weight: bold;
  font-size: 0.6rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items : center;
  padding: 1rem;
`;

const IdBox = styled.div`
  width: 18rem;
  padding-bottom: 1rem;
`;

const IdText = styled.p`
  font-size: 0.8rem;
  color: gray;
  font-weight: bold;
`;

const IdInput = styled.input`
  width: 12rem;
  border-radius: 2rem;
  background-color: #a5d7f4;
  opacity: 0.5;
  padding-left : 1rem;
  border-style: none;
  height: 2rem;
  box-shadow: 0rem 0.3rem 0.3rem gray;
`;

const PasswordBox = styled.div`
  width: 18rem;
`;

const PasswordText = styled.p`
  font-size: 0.8rem;
  color: gray;
  font-weight: bold;
`;

const PasswordInput = styled.input`
  width: 12rem;
  border-radius: 2rem;
  background-color: #a5d7f4;
  opacity: 0.5;
  border-style: none;
  height: 2rem;
  padding-left : 1rem;
  box-shadow: 0rem 0.3rem 0.3rem gray;
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
  const navigate = useNavigate();

  function insertId(e) {
    // 입력된 ID 받아오는 함수
    setID(e.target.value);
    console.log(e.target.value);
  }

  function insertPassword(e) {
    // 입력된 Password 받아오는 함수
    setPassword(e.target.value);
    console.log(e.target.value);
  }

  function BtnClick() {
    if (Id === "") {
      alert("아이디를 입력하세요.");
      return;
    }

    if (Password === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }

    axios
      .post("https://soozzang.p-e.kr/signup/", {
        // 입력된 userID 와 password 정보를 post로 넘겨주는 코드
        userID: Id,
        password: Password,
      })
      .then((res) => {
        console.log(Id); // 제대로 작동하는 정보 넘겨줬는지 확인하는 코드 (ID check)
        console.log(Password); // 제대로 작동하는 정보 넘겨줬는지 확인하는 코드 (Password check)
        console.log(res);
        alert("회원가입이 완료되었습니다.");
        navigate(-1)
      })
      .catch((e) => {
        // axios error check하는 코드
        console.log(e);
        alert("아이디 중복입니다.")
      });
  }

  function BtnClick2(){
    setPassword("");
    setID("");
    alert("회원가입이 취소되었습니다.");
    navigate(`/login`);
  }

  return (
    <>
      <SignupContainer>

        <SignupTextBox>
          <SignupText>회원가입</SignupText>
          <SignupText2>
            환영합니다! 회원이 되어 다양한 서비스를 누려보세요
          </SignupText2>
        </SignupTextBox>

        <InputBox>
          <IdBox>
            <IdText>아이디 입력</IdText>
            <IdInput placeholder="ID" onChange={insertId} value={Id}></IdInput>
          </IdBox>
          <PasswordBox>
            <PasswordText>비밀번호 입력</PasswordText>
            <PasswordInput placeholder="Password" type="password" onChange={insertPassword} value={Password}></PasswordInput>
          </PasswordBox>
        </InputBox>

        <ButtonBox>
          <CompleteButton>
            <CompleteButtonText onClick={BtnClick}>가입 완료</CompleteButtonText>
          </CompleteButton>
          <CancelButton>
            <CancelButtonText onClick={BtnClick2}>가입 취소</CancelButtonText>
          </CancelButton>
        </ButtonBox>
        
        </SignupContainer>
    </>
  );
};

export default SignupPage;
