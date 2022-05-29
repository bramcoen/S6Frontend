import React, {useEffect, useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import Message from "./Message";
import axios from "axios";

export default function MessageOverview(username) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);
    FetchDataForUsername();
    function FetchDataForUsername(username){
        useEffect(() => {
            axios.get("message?username=test").then(i => {
                setData(i.data);
            }).catch(i => setError(i.error))
        }, []);
    }

    const { data: session } = useSession()
    console.log(session);
    return (<>
            {data.map((value,index) => {return (<Message key={value} message={value}/>)})}
        </>
    )
}


