import React from 'react';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//css추가 필요

const EveryChatBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const EachChatBox = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 1.5rem;
`;

const EachChatLink = styled.img`
    width: 8rem;
    height: 5.5rem;
    border-radius: 1.25rem;
`;

const EachChatRank = styled.p`
    margin: 0px;
    color: #FFF;
    /* text-align: center; */
    text-shadow: 2px 1px 1px gray;
    font-size: 4.5rem;
    font-style: normal;
    font-weight: 600;
    /*
    position 속성을 통해 문서 상에 요소를 배치하는 방법을 지정한다.
    top, right, bottom, left 속성을 통해 요소의 최종 위치를 결정한다.
    */
    position: absolute;
    /* z-index: 1; */
    top: -2.5rem;
    left: -0.7rem;
`;

const CardList = (props) => {//cardList -> 각 채팅방 카드 sorting/ map으로 띄우기

    const navigate = useNavigate();
    const [RoomList, setRoomList]=useState([]);
    //RoomList에 axios get으로 생성된 채팅방 객체 배열 저장할 것

    let rankCount = 0;
    //순위 표시 위한 변수 선언

    //처음 화면 렌더링 될 때 
    useEffect(()=>{
        axios
            .get(`https://soozzang.p-e.kr/room_list_create/`)
            .then((res)=>{
                console.log('room list get 성공!');
                setRoomList(res.data);
                RoomListSort();
            })
            .catch((e)=>{
                console.log(e);
            })
    },[]);

    function RoomListSort(){
        if(RoomList===undefined){//undefined 예외처리
            console.log('Data===undefined!');
        }
        else{
            RoomList.sort((a, b)=>{
                if(props.SortOption==="MostPopular"){
                    return a.entry_count-b.entry_count;
                }
                else if(props.SortOption==="MostJoin"){
                    return a.user_count-b.user_count;
                }
            return 0;
            });
        }
    };

    // useEffect(()=>{
    //     if(RoomList===undefined){//undefined 예외처리
    //         console.log('Data===undefined!');
    //     }
    //     else{
    //         RoomList.sort((a, b)=>{
    //             if(props.SortOption==="MostPopular"){
    //                 return a.entry_count-b.entry_count;
    //             }
    //             else if(props.SortOption==="MostJoin"){
    //                 return a.user_count-b.user_count;
    //             }
    //         return 0;
    //     });
    // }
    // },[props.SortOption])//Sort 기준이 바뀔 때마다 실행

    console.log(RoomList);

    function eachChatClick(roomId){
        axios
            .post(`https://soozzang.p-e.kr/room/${roomId}/enter/`)
            .then(()=>{
                console.log('Room enter!');
                // navigate(`/chat`); 각 채팅방으로 이동
            })
            .catch((e)=>{
                console.log('Cannot Enter!');
                console.log(roomId);
                console.log(e);
            });
    };

    return (
        <EveryChatBox>
            {RoomList===undefined?<p></p>:
                RoomList.map((eachData)=>(//map으로 정렬된 데이터 정렬
                //div에 onClink={()=>navigate(route 링크)}로 각 채팅방에 들어갈 수 있도록 수정 필요
                    <EachChatBox onClick={()=>eachChatClick(eachData.id)}>
                        <EachChatRank>{++rankCount}</EachChatRank>
                        <EachChatLink alt={eachData.name}></EachChatLink>
                    </EachChatBox>
                ))
            }
        </EveryChatBox>
    );
};

export default CardList;