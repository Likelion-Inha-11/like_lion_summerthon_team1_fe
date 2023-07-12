import React from 'react';
import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const ChatPage = () => {
    return (
        <div>
            
        </div>
    );
};

export default ChatPage;