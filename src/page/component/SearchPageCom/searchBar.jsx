import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

library.add(faHome, faSearch, faUser);

const SearchContainer = styled.div`
  display : flex;
  align-items : center;
  width: 19rem;
  height: 4rem;
  position: relative;
  border: 0;
  margin-left : 30px;
  margin-top : 20px;
`
const SearchForm = styled.form`
  width : 100%;
  height : 60%;
`

const Search = styled.input`
  border: 0;
  padding-left: 23px;
  background-color: #eaeaea;
  width: 100%;
  height: 3rem;
  outline: none;
  border-radius: 1rem;
  z-index: 3;
  position: absolute;
`;

const AutoSearchContainer = styled.div`
  z-index: 2;
  height: 200px;
  width: 315px;
  background-color: #eaeaea;
  position: absolute;
  top: 20px;
  /* border: 2px solid; */
  padding: 15px;
  border-radius: 1rem;
`;

const AutoSearchWrap = styled.ul`

`;

const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
`;

const SearchResultContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 20.4rem;
  max-height: 200px;
  overflow-y: auto;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;
`;

const SearchResultItem = styled.li`
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // 검색어를 저장하기 위한 useState
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장하기 위한 useState
  const [suggestions, setSuggestions] = useState([]); // 자동완성 결과를 출력하기 위한 useState
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [roomList, setRoomList] = useState([]); // 방 이름 목록을 저장하기 위한 useState

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    const suggestions = getSuggestions(value);
    setSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (suggestion) => { // 중간 검색 과정에서의 키워드를 저장하는 함수
    setQuery(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const results = searchData(query);
    setSearchResults(results);
    setSuggestions([]); // 자동완성 결과 초기화
    setShowSuggestions(false);
    if (typeof onSearch === "function") {
      onSearch(results);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  const handleInputBlur = () => {
    setShowSuggestions(false);
  };

  useEffect(()=>{
    axios
        .get(`${process.env.REACT_APP_API}/room_list_create/`)
        .then((res)=>{
            setRoomList(res.data);
        })
        .catch((e)=>{
            console.log(e);
        })
},[]);

  const getSuggestions = (value) => {
    // 검색어 자동 완성 결과를 가져오는 로직을 구현합니다.
    // 예시: 데이터는 배열 형태로 가정하고, 배열 요소 중에 입력된 검색어를 포함하는 항목들을 추출하여 반환합니다.

    const filteredSuggestions = roomList.filter((item) => // filter로 true인 요소들만 results에 저장
      item.name.includes(value) // item.name이 query의 내용을 포함하고 있는지 true/false로 리턴
    );
    return filteredSuggestions;
  };

  const searchData = (query) => { // query에 담긴 용어 기준으로 검색한 결과 리턴

    const results = roomList.filter((item) => // filter로 true인 요소들만 results에 저장
      item.name.includes(query) // item.name이 query의 내용을 포함하고 있는지 true/false로 리턴
    );

    return results;
  };

  return (
    <>
      <SearchContainer>
        <SearchForm onSubmit={handleFormSubmit}>
          <Search type="text" value={query} onChange={handleInputChange} onBlur={handleInputBlur} onKeyPress={handleKeyPress} placeholder="Search..."></Search>
          

          {query.length > 0 && showSuggestions && (
            <AutoSearchContainer>
              <AutoSearchWrap>
                {suggestions.map((suggestion) => (
                  <AutoSearchData key={suggestion.id} 
                  onClick={() => handleSelectSuggestion(suggestion)}
                  >
                  {suggestion.name}
                </AutoSearchData>
                ))}
              </AutoSearchWrap>
            </AutoSearchContainer>
          )}

          <br/>
          <br/>

            {searchResults.length > 0 && (
              <SearchResultContainer>
                <ul>
                  {searchResults.map((result) => (
                  <SearchResultItem key={result.id}>{result.name}</SearchResultItem>
                  ))}
                </ul>
              </SearchResultContainer>
            )}

        </SearchForm>
      </SearchContainer>
    </>
  );
};

export default SearchBar;