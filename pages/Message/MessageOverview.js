import React, {useEffect, useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import Message from "./Message";
import axios from "axios";

export default function MessageOverview ({ ...props }){
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);

       useEffect(() => {
            axios.get("message?username="+props.username).then(i => {
              var apidata =  i.data.sort((a, b) => a.creationDate - b.creationDate);
                setData(apidata);
            }).catch(i => setError(i.error))
        }, [props.username]);

    return (<>
            {data.map((value,index) => {return (<Message key={value.id} message={value}/>)})}
        </>
    )
}


