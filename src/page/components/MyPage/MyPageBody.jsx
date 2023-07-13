import React from 'react';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ChatCardDiv= styled.div`
    display: flex;
    margin : 1.875rem 1.875rem 0;
    padding-bottom: 1rem;
    gap: 1rem;
    overflow: scroll visible;
    width: calc(100%);
`;

const ChatCard = styled.div`
    width: 11rem;
    height: 13rem;
    border: 1px solid;
    border-color: #80808078;
    border-radius: 20px;
    position: relative;
`;

const ChatTitle = styled.p`
    font-size: 2rem;
    color: gray;
    position: absolute;
    bottom: 0.75rem;
    left: 1rem;
`;

const ChatListTitle = styled.h3`
    margin-left: 2rem;
    margin-top: 2rem;
`;

const ChatUserCount = styled.p`
    color: gray;
    position: absolute;
    bottom: 0.5rem;
    left: 1rem;
`;

const ChatImage = styled.div`
    background-color: rgba(165, 215, 244, 0.39);
    width: 11rem;
    height: 7rem;
    border-radius: 20px 20px 0 0;
`;

const NoChat = styled.p`
    color: gray;
    margin: 0px;
`;

const MyPageBody = () => {

    const navigate = useNavigate();

    const {Id3}=useParams();

    const [roomList, setRoomList]=useState([]);
    const [myRoomList, setMyRoom]=useState([]);

    useEffect(()=>{
        axios
            .get(`https://soozzang.p-e.kr/room_list_create/`)
            .then((res)=>{
                console.log(res);
                const roomArray = res.data.filter(data => data.user.includes(Id3));
                setRoomList(roomArray);
                // console.log('room list');
                console.log(roomArray);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[]);

    useEffect(()=>{
        axios
            .get(`https://soozzang.p-e.kr/user_info/${Id3}/`)
            .then((res)=>{
                setMyRoom(res.data.rooms);
            })
            .catch((error)=>{
                console.log(error);
            })
    },[]);

    console.log(roomList);

    function ChatCardClick(roomId){
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
    }

    return (
        <div>
            <ChatListTitle>참여한 채팅방 목록</ChatListTitle>
            <ChatCardDiv>
                {
                roomList.length===0?<NoChat>현재 참여한 비공개 채팅방이 없습니다.</NoChat>:
                roomList.map((eachRoom)=>(
                    <ChatCard onClick={()=>ChatCardClick(eachRoom.id)}>
                        <ChatImage></ChatImage>
                        <ChatTitle>{eachRoom.name}</ChatTitle>
                        <ChatUserCount>user : {eachRoom.user_count}</ChatUserCount>
                    </ChatCard>
                ))
                }
            </ChatCardDiv>
            <ChatListTitle>나의 채팅방 목록</ChatListTitle>
            <ChatCardDiv>
                {
                myRoomList.length===0?<NoChat>현재 참여한 비공개 채팅방이 없습니다.</NoChat>:
                myRoomList.map((eachRoom)=>(
                    <ChatCard>
                        <ChatImage></ChatImage>
                        <ChatTitle>{eachRoom}</ChatTitle>
                    </ChatCard>
                ))
                }
            </ChatCardDiv>
        </div>
    );
};

export default MyPageBody;