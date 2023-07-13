import React from 'react';
import { styled } from 'styled-components';
import CardList from './CardList';

const ChatList2Container = styled.div`
    border-radius: 20px;
    border: none;
    background: rgba(165, 215, 244, 0.39);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin:  0 2rem 0 2rem;
`;

const ChatListName = styled.h3`
    margin: 0px;
    padding: 1.25rem 0 1.25rem 1rem;
    font-size: 1.5rem;
`;


const ChatList2 = (props) => {
    return (
        <ChatList2Container>
            <ChatListName>이용자가 많은 채팅방</ChatListName>
            <div>
                <CardList IdOfUser={props.IdOfUser} SortOption="MostJoin"></CardList>
            </div>
        </ChatList2Container>
    );
};

export default ChatList2;