import React, {useState} from 'react'
import { useSession} from "next-auth/react"
import axios from "axios";

export default function Chat() {
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession();

    function closeError()
    {
        setError(null);
    }

    function buttonClicked(e) {
        e.preventDefault();
        axios.post("message/send", {text: msg}, {
            'Content-Type': 'application/json'
        }).catch(i => setError(i.error))
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
                <input type="text" value={msg} onChange={handleInputChanged} className="form-control" placeholder="Enter message"/>
            </div>
            <button disabled={msg.length < 1} onClick={buttonClicked} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
}
