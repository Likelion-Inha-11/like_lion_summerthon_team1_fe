import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const MyHeaderDiv = styled.div`
    display: flex;
    margin: 1.5rem 0 0 1.5rem;
`;

const UserImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
`;

const UserDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`;

const UserName = styled.h3`
    margin: 0;
    font-size: 1.75rem;
    margin-bottom: 0.3rem;
`;

const LogoutButton = styled.button`
    background-color: white;
    border: none;
    padding: 0;
    text-align: left;
`;

const MyHeader = (props) => {
    console.log(props.UserInfo);

    const navigate = useNavigate();

    function buttonLogout(){
        axios
            .get(`${process.env.REACT_APP_API}/logout/`)
            .then((res)=>{
                console.log(res);
                navigate(`/login`)
            })
            .catch((e)=>{
                console.log(e);
            });
    }

    return (
        <MyHeaderDiv>
            <UserImage src={props.UserImage}></UserImage>
            <UserDiv>
                <UserName>{props.UserInfo.userID} 님</UserName>
                <LogoutButton onClick={buttonLogout}>logout</LogoutButton>
            </UserDiv>
        </MyHeaderDiv>
    );
};

export default MyHeader;