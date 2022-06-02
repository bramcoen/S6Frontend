import axios from "axios";
import { useState } from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";


export default function Register() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession()
    const router = useRouter();
    if (session) {
        axios.defaults.headers.get['token'] = session.access_token;
        axios.defaults.headers.post['token'] = session.access_token;
        axios.defaults.headers.put['token'] = session.access_token;
        axios.defaults.headers.delete['token'] = session.access_token;
    }
    function handleInputChanged(e){
        setUsername(e.target.value);
    }
   function buttonClicked(e){
        e.preventDefault();
        axios.put("user/username", {name: username },).then(i => location.reload()).catch(i => {if (i.response.status === 500){
        setError("Username already exists, please choose another username")}
        else{
            setError("Unexpected error occured, please try again later")
        }
        });
    }

    function ChangeConfirmed()
    {
        session.username = username;
        router.replace('/')
    }
if (session === null){
    return <h1>Please log in to use this feature.</h1>
}
        return <>
            {success && error && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>{error}</strong>
                <button onClick={ChangeConfirmed} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> }
            {!success && error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{error}</strong>
                <button onClick={ChangeConfirmed} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> }
                <form>
                    {session != null && session.username == null &&
                        <label>To use the application please enter a username.</label>}
                    {session != null &&
                    <label>Change your username here.</label>}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" value={username} onChange={handleInputChanged} className="form-control" placeholder="Enter Username"/>
                    </div>
                    <button onClick={buttonClicked} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
}
