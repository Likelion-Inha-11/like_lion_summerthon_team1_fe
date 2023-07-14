import React, { useEffect, useState } from "react";
import BottomBar from "./component/SearchPageCom/bottomBar";
import MyHeader from "./components/MyPage/MyHeader";
import MyPageBody from "./components/MyPage/MyPageBody";
import axios from "axios";
import breeze from "./breeze.png";
import styled from "styled-components";

import UserTestImage from "./components/MyPage/UserTestImage.jpg";
import { useParams } from "react-router-dom";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const BreezeImgBox = styled.div`
  width: auto;
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
`;

const BreezeImg = styled.img`
  width: 20rem;
  height: auto;
`;

const MyPage = () => {
  const { Id3 } = useParams();
  const [UserInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/my_info/`)
      .then((res) => {
        console.log(res);
        setUserInfo(res.data);
        // console.log(UserInfo);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [Id3]);

  return (
    <div>
      <MyHeader UserInfo={UserInfo} UserImage={UserTestImage}></MyHeader>
      <MyPageBody UserInfo={UserInfo}></MyPageBody>
      <BottomBar IdOfUser={Id3}></BottomBar>
      <BreezeImgBox>
        <BreezeImg src={breeze}></BreezeImg>
      </BreezeImgBox>
    </div>
  );

};

export default MyPage;
