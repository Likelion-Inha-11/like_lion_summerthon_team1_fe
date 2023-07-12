import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignupPage from "./SignupPage";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;
//true -> 쿠키 유지

const ServiceName = styled.p`
    font-size: 3rem;
    margin: 2rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
  `;

  const LoginContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
  `

  const LoginText = styled.div`
    font-size: 1.5rem;
    margin: 1rem;
    font-weight: bold;
    display: flex;
    padding-bottom: 1rem;
  `;

  const LinkDiv = styled.div`
    /* width: 15rem;
    height: 2rem; */
    display: flex;
    flex-direction: column;
  `;

  const SearchLink = styled.a`
    font-size: 1rem;
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  `;

  const SignupLink = styled.div`
    font-size: 1rem;
    display: flex;
    justify-content: flex-end;
  `;

  const LoginButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  `;

  const LoginButton = styled.button`
    background-color: skyblue;
    width: 17rem;
    height: 4rem;
    border-radius: 1rem;
    border: 0;
    box-shadow: 0rem 0.3rem 0.3rem gray;
  `;

  const LoginButtonText = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    margin: 0;
    justify-content: center;
  `;

  const SocialLoginText = styled.p`
    display: flex;
    justify-content: center;
  `;

  const SocialLogin = styled.div`
    display: flex;
    justify-content: center;
  `;

const LoginPage = (props) => {
  const [Id, setID] = useState(""); // ID 저장용 useState
  const [Password, setPassword] = useState(""); //Password 저장용 useState

  const navigate = useNavigate();

  function insertId(e) {
    // 입력된 ID 받아오는 함수
    setID(e.target.value);
  }

  function insertPassword(e) {
    // 입력된 Password 받아오는 함수
    setPassword(e.target.value);
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
      .post("https://soozzang.p-e.kr/login/", {
        // 입력된 userID 와 password 정보를 post로 넘겨주는 코드
        userID: Id,
        password: Password,
      })
      .then((res) => {
        console.log(Id); // 제대로 작동하는 정보 넘겨줬는지 확인하는 코드 (ID check)
        console.log(Password); // 제대로 작동하는 정보 넘겨줬는지 확인하는 코드 (Password check)
        console.log(res.data.id);
        navigate(`/main/${res.data.id}`);
      })
      .catch((e) => {
        // axios error check하는 코드
        console.log(e);

      });
  }

  return (
    <>
      <ServiceName>서비스 이름</ServiceName>

      <LoginContainer>
      <LoginText Link="">로그인</LoginText>
      {/* ID 입력칸 */}
      <input
        onChange={insertId}
        placeholder="ID 근데 파란색으로 어케 바꾸냐"
        value={Id}
      ></input>

      {/* Password 입력칸 */}
      <input type="password"
        onChange={insertPassword}
        placeholder="Password 근데 파란색으로 어케 바꾸냐"
        value={Password}
      ></input>
      <br></br>
      </LoginContainer>

      <LinkDiv>
        <SearchLink>아이디/비밀번호 찾기</SearchLink>
        <SignupLink><Link to={`/signup`}>회원가입</Link></SignupLink>
      </LinkDiv>

      <LoginButtonDiv>
        <LoginButton>
          <LoginButtonText onClick={BtnClick}>로그인</LoginButtonText>
        </LoginButton>
      </LoginButtonDiv>

      <SocialLoginText>기존 계정으로 로그인</SocialLoginText>
      <SocialLogin>
        {" "}
      </SocialLogin>
    </>
  );
};

export default LoginPage;