import React from "react";
import axios from "axios";
import styled from "styled-components";

import BottomBar from "./component/SearchPageCom/bottomBar";
import SearchBar from "./component/SearchPageCom/searchBar";
import { useParams } from "react-router-dom";
import breeze from "./breeze.png";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
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

const SearchPage = () => {
  const { Id2 } = useParams();
  return (
    <>
      <SearchBar />
      <BottomBar IdOfUser={Id2} />

      <BreezeImgBox>
        <BreezeImg src={breeze}></BreezeImg>
      </BreezeImgBox>
    </>
  );
};

export default SearchPage;
