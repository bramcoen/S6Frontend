import {useSession} from "next-auth/react"
import axios from "axios";
import Header from "../header/header";
import MessageOverview from "../Message/MessageOverview";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import Chat from "../Message/Chat";

export function Profile(req, res) {
    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) {
            return;
        }
        const query = router.query;
    }, [router.isReady, router.query]);

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

    return <>
        <Header/>
            <main>
                {router.query.username !== undefined && <h1>Profile page of {router.query.username}</h1>}
                {router.query.username !== undefined && session && session.username && session.username === router.query.username && <Chat></Chat>}
                {router.query.username !== undefined && <text>Previous messages</text> && <MessageOverview username={router.query.username}></MessageOverview>}
            </main>
    </>
}
export default Profile;
