import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

library.add(faHome, faSearch, faUser);

const SearchContainer = styled.div`
  display : flex;
  align-items : center;
  width: 320px;
  height: 45px;
  position: relative;
  border: 0;
  margin-left : 30px;
  margin-top : 10px;
`
const SearchForm = styled.form`
  width : 100%;
  height : 60%;
`
const Search = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
`;

const AutoSearchContainer = styled.div`
  z-index: 3;
  height: 200px;
  width: 295px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  border: 2px solid;
  padding: 15px;
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

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // 검색어를 저장하기 위한 useState
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장하기 위한 useState
  const [suggestions, setSuggestions] = useState([]); // 자동완성 결과를 출력하기 위한 useState
  const [roomList, setRoomList] = useState([]); // 방 이름 목록을 저장하기 위한 useState

  const handleInputChange = (e) => { // 검색어를 저장하는 함수
    const {value} = e.target;
    setQuery(value);
    const suggestions  = getSuggestions(value);
    setSuggestions(suggestions);
  };

  const handleSelectSuggestion = (suggestion) => { // 중간 검색 과정에서의 키워드를 저장하는 함수
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleFormSubmit = (e) => { // 최종 검색 키워드를 저장하는 함수
    e.preventDefault(); // 폼의 기본동작인 새로고침 방지
    const results = searchData(query); // 검색 결과 리턴
    setSearchResults(results); // 검색 결과 업데이트
    if (typeof onSearch === "function") { // onSearch prop이 유효한 함수인지 확인
        onSearch(results);
    }
  };

  useEffect(()=>{
    axios
        .get(`https://soozzang.p-e.kr/room_list_create/`)
        .then((res)=>{
            setRoomList(res.data);
        })
        .catch((e)=>{
            console.log(e);
        })
},[suggestions]);

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
          <Search type="text" value={query} onChange={handleInputChange} placeholder="Search..."></Search>
          

          {query.length > 0 && suggestions && (
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


          <ul>
            {/* 검색 결과창 */}
          {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
          ))}

          </ul>

        </SearchForm>
      </SearchContainer>
    </>
  );
};

export default SearchBar;