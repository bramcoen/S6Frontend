import React, {Component, useState} from 'react'
import { useSession} from "next-auth/react"
import {useRouter} from "next/router";
import axios from "axios";

export default function Chat(profile) {
    const [msg, setMsg] = useState("test");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession();

    function closeError()
    {
        setError(null);
    }

    function buttonClicked(e) {
        e.preventDefault();
        axios.put("message/send", {text: msg},).catch(i => setError(i.error))
    }

    function handleInputChanged(e){
        setMsg(e.target.value);
    }

    return <>
        {error && <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{error}</strong>
            <button onClick={closeError} type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div> }
        <form>
            <label>Send a message</label>
            <div className="form-group">
                <input type="text" value={msg} onChange={handleInputChanged} className="form-control" placeholder="Enter Username"/>
            </div>
            <button disabled={msg.length < 1} onClick={buttonClicked} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
}
