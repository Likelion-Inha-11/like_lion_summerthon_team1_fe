import React from 'react';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//css추가 필요

const EveryChatBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
`;

const EachChatBox = styled.div`
    display: flex;
    /* position: relative; */
    margin-bottom: 1.5rem;
    margin-left: 1.25rem;
    position: relative;
`;

const EachChatLink = styled.img`
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 1.25rem;
`;

const EachChatName = styled.p`
    margin: 0;
    font-weight: 700;
    color: gray;
    font-size: 1.5rem;
    position: absolute;
    left: 7rem;
    top: 1px;
`;

const EachChatButton = styled.button`
    border: none;
    color: gray;
    background-color: rgba(165, 215, 244 ,0);
    height: 2rem;
    position: absolute;
    top: 2rem;
    left: 6.5rem;
`;

// const EachChatRank = styled.p`
//     margin: 0px;
//     color: #FFF;
//     /* text-align: center; */
//     text-shadow: 2px 1px 1px gray;
//     font-size: 4.5rem;
//     font-style: normal;
//     font-weight: 600;
//     /*
//     position 속성을 통해 문서 상에 요소를 배치하는 방법을 지정한다.
//     top, right, bottom, left 속성을 통해 요소의 최종 위치를 결정한다.
//     */
//     position: absolute;
//     /* z-index: 1; */
//     top: -2.5rem;
//     left: -0.7rem;
// `;

const CardList = (props) => {//cardList -> 각 채팅방 카드 sorting/ map으로 띄우기

    // 각 채팅방을 클릭했을 때 각 채팅방으로 이동할 수 있도록 useNavigate 사용
    // const navigate = useNavigate();

    const [roomList, setRoomList]=useState([]);
    //RoomList에 axios get으로 받은 채팅방 객체 배열 저장할 것

    const [sortedRoomList, setSortedList]=useState([]);
    //sortedRoomList에 roomList를 정렬한 배열 저장

    // let rankCount = 0;
    //순위 표시 위한 변수

    //처음 화면 렌더링 될 때 
    useEffect(()=>{
        axios
            .get(`https://soozzang.p-e.kr/room_list_create/`)
            .then((res)=>{
                console.log('room list get 성공!');
                setRoomList(res.data);
            })
            .catch((e)=>{
                console.log(e);
            })
    },[]);

    useEffect(()=>{
        if(roomList===undefined){//undefined 예외처리
            console.log('Data===undefined!');
        }
        else{
            roomList.sort((a, b)=>{
                if(props.SortOption==="MostPopular"){
                    return b.entry_count-a.entry_count;
                }
                else if(props.SortOption==="MostJoin"){
                    return b.user_count-a.user_count;
                }
            return 0;
        });
        console.log('정렬 이후 RoomList');
        console.log(roomList);
        setSortedList(roomList);
    }
    },[roomList, props.SortOption])//Sort 기준이 바뀔 때마다 실행

    function eachChatClick(roomId){ //각 채팅방 클릭했을 때 enter+채팅방으로 이동
        axios
            .post(`https://soozzang.p-e.kr/room/${roomId}/enter/`)
            .then(()=>{
                console.log('Room enter!');
                // navigate(`/chat/${roomId}`); 각 채팅방으로 이동
            })
            .catch((e)=>{
                console.log('Cannot Enter!');
                console.log(roomId);
                console.log(e);
            });
    };

    return (
        <EveryChatBox>
            {(sortedRoomList.length===0)?<p></p>:
                roomList.map((eachData)=>(//map으로 정렬된 데이터 정렬
                //div에 onClink={()=>navigate(route 링크)}로 각 채팅방에 들어갈 수 있도록 수정 필요
                    <EachChatBox key={eachData.id}>
                        {/* <EachChatRank>{++rankCount}</EachChatRank> */}
                        <EachChatLink src={eachData.image} alt={eachData.name}></EachChatLink>
                        <EachChatName>{eachData.name}</EachChatName>
                        <EachChatButton onClick={()=>eachChatClick(eachData.id)}>채팅방 입장하기</EachChatButton>
                    </EachChatBox>
                ))
            }
        </EveryChatBox>
    );
};

export default CardList;