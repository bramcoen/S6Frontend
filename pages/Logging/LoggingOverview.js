import React, {useEffect, useState} from 'react'
import axios from "axios";
import Message from "../Message/Message";

export default function LoggingOverview ({ ...props }){
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
            axios.get("logging/me").then(i => {
                var apidata =  i.data.sort((a, b) => b.created - a.created);
                setData(apidata);
            }).catch(i => setError(i.error))
    });

    return (<>
            {data.map((value,index) => {return (<>
                    <div className="border border-secondary">
                        <b key={value.id}>{value.details} on {value.created}</b>
                    </div>
            </>)})}
        </>
    )
}
