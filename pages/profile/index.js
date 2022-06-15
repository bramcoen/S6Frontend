import React from 'react'
import {useSession} from "next-auth/react";
import axios from "axios";
import Register from "../account/register";
import Header from "../header/header";
import LoggingOverview from "../Logging/LoggingOverview";

const Profile = () => {
    const { data: session } = useSession();
    if (session && session.access_token) {
        axios.defaults.headers.get['token'] = session.access_token;
        axios.defaults.headers.post['token'] = session.access_token;
        axios.defaults.headers.put['token'] = session.access_token;
        axios.defaults.headers.delete['token'] = session.access_token;
    }
    axios.defaults.headers.post['content-type'] = 'text/json';
    axios.defaults.headers.get['content-type'] = 'text/json';
    axios.defaults.headers.delete['content-type'] = 'text/json';
    axios.defaults.headers.put['content-type'] = 'text/json';

    if (session === undefined){
return <>
    <Header></Header>
Please log in first.
</>
    }
    else{
        return <>
            <Header></Header>
        <h1>Profile page</h1>
            <Register></Register>
            <h1>History</h1>
            <LoggingOverview></LoggingOverview>
        </>
    }
};


export default Profile;
