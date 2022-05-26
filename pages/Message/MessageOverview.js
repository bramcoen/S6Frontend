import React, {useEffect, useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import Message from "./Message";
import axios from "axios";

export default function MessageOverview(username) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    FetchDataForUsername();
    function FetchDataForUsername(username){
        useEffect(() => {
            axios.get("message/get/", {name: username},).then(i => data = i).catch(i => setError(i.error))
        }, []);
    }

    const { data: session } = useSession()
    let data = ["user1","user2","user3"];
    console.log(session);
    return (<>
            {data.map((value,index) => {return (<Message key={value} message={value}/>)})}
        </>
    )
}


