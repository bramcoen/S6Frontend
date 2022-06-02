import React, {useEffect, useState} from 'react'
import Message from "./Message";
import axios from "axios";

export default function MessageOverview ({ ...props }){
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
          setInterval(() => {
               axios.get("message?username="+props.username).then(i => {
                   var apidata =  i.data.sort((a, b) => b.creationDate - a.creationDate);
                   setData(apidata);
               }).catch(i => setError(i.error))
           }, 1000);
        }, [props.username]);

    return (<>
            {data.map((value,index) => {return (<Message key={value.id} message={value}/>)})}
        </>
    )
}
