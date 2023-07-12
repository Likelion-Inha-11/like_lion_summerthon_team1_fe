import React from 'react';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatKategorie = styled.p`
    
`;

const ChatCard = styled.div`

`;

const ChatTitle = styled.p`
    
`;

const ChatListTitle = styled.h3`
    margin-left: 2rem;
    margin-top: 2rem;
`;


const MyPageBody = (props) => {

    const {Id3}=useParams();
    // console.log('id?');
    // console.log(Id3);

    const [roomList, setRoomList]=useState([]);//
    const [roomNameList, setNameList]=useState(props.UserInfo.rooms);
    console.log(props);

    useEffect(()=>{
        axios
            .get(`https://soozzang.p-e.kr/room_list_create/`)
            .then((res)=>{
                console.log(res.data);
                // const newArray = res.data.filter((obj) => {obj.user.includes(Id3)});
                // console.log(newArray);
                setRoomList(res.data);

            })
            .catch((error)=>{
                console.log(error);
            });
    },[]);

    console.log(roomList);

    return (
        <div>
            <ChatKategorie></ChatKategorie>
            <ChatListTitle>참여한 채팅방 목록</ChatListTitle>
            {
                roomList.map((eachRoom)=>(
                    <ChatCard>
                        <ChatTitle>{eachRoom.name}</ChatTitle>
                    </ChatCard>
                ))
            }
            <ChatListTitle>나의 채팅방 목록</ChatListTitle>
            {
                roomList.map((eachRoom)=>(
                    eachRoom.is_public!==true?
                        <ChatCard>
                            <ChatTitle>{eachRoom.name}</ChatTitle>
                        </ChatCard>
                    :<p>참여한 비공개 채팅방이 없습니다.</p>
                ))
            }
        </div>
    );
};

export default MyPageBody;