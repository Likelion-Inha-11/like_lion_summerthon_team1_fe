import React from 'react';
import { styled } from 'styled-components';
import CardList from './CardList';

const ChatList1Container = styled.div`
    border-radius: 20px;
    border: none;
    background: rgba(165, 215, 244, 0.39);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin:  0 2rem 2rem 2rem;
`;

const ChatListName = styled.h3`
    margin: 0px;
    padding: 1rem 0 1rem 1rem;
    font-size: 1.5rem;
`;

const ChatList1 = (props) => {
    return (
        <ChatList1Container>
            <ChatListName>인기 채팅방</ChatListName>
            <CardList IdOfUser={props.IdOfUser} SortOption="MostPopular" DataOption={props.TestData}></CardList>
        </ChatList1Container>
    );
};

export default ChatList1;