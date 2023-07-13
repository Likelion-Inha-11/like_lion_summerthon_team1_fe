import React from "react";
import axios from "axios";
import BottomBar from "./component/SearchPageCom/bottomBar";
import SearchBar from "./component/SearchPageCom/searchBar";
import { useParams } from "react-router-dom";

axios.defaults.xsrfHeaderName = "HTTP_X_CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const SearchPage = () => {
  const {Id2} = useParams();
  return (
    <>
        <SearchBar/>
        <BottomBar IdOfUser={Id2}/>
    </>
  );
};

export default SearchPage;