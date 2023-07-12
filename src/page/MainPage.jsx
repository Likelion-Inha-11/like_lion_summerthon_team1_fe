import React from 'react';
import { useParams } from 'react-router-dom';
import ChatSort1 from './components/MainPage/ChatSort1';
import ChatSort2 from './components/MainPage/ChatSort2';
import MainHeader from './components/MainPage/MainHeader';
//import testImage from './components/MainPage/testImage.jpg';
import BottomBar from './component/SearchPageCom/bottomBar';

const MainPage = () => {
    const {Id1} = useParams();

    return (
        <>
            <MainHeader IdOfUser={Id1}></MainHeader>
            <ChatSort1 IdOfUser={Id1}></ChatSort1>
            <ChatSort2 ></ChatSort2>
            <br/>
            <br/>
            <br/>
            <BottomBar IdOfUser={Id1}></BottomBar>
        </>
    );
};

export default MainPage;